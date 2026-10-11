"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import { Play, Pause, RotateCcw, ChevronDown, Sliders } from "lucide-react";

interface CombinedScrubberProps {
  totalFrames?: number;
  folderPath?: string;
}

export default function CombinedScrubber({
  totalFrames = 2500,
  folderPath = "/videos/combined_frames",
}: CombinedScrubberProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const imagesRef = useRef<Map<number, HTMLImageElement>>(new Map());
  const requestedRef = useRef<Set<number>>(new Set());

  // Current target frame from scroll
  const targetFrameRef = useRef<number>(1);
  // Current rendered frame (with lerp easing)
  const currentFrameRef = useRef<number>(1);

  const [displayFrame, setDisplayFrame] = useState<number>(1);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const playIntervalRef = useRef<NodeJS.Timeout | null>(null);

  const getFrameUrl = useCallback(
    (index: number) => {
      const padded = String(index).padStart(4, "0");
      return `${folderPath}/frame_${padded}.webp`;
    },
    [folderPath]
  );

  // Helper to load a specific frame into map
  const requestFrame = useCallback(
    (index: number) => {
      if (index < 1 || index > totalFrames) return;
      if (requestedRef.current.has(index)) return;
      requestedRef.current.add(index);

      const img = new Image();
      img.src = getFrameUrl(index);
      img.onload = () => {
        imagesRef.current.set(index, img);
      };
    },
    [totalFrames, getFrameUrl]
  );

  // Draw nearest available loaded frame
  const renderFrame = useCallback((frameIndex: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let img = imagesRef.current.get(frameIndex);
    if (!img || !img.complete || img.naturalWidth === 0) {
      // Find nearest loaded frame within +/- 50 frames
      let closest = -1;
      let minDiff = Infinity;
      imagesRef.current.forEach((cachedImg, idx) => {
        if (cachedImg.complete && cachedImg.naturalWidth > 0) {
          const diff = Math.abs(idx - frameIndex);
          if (diff < minDiff) {
            minDiff = diff;
            closest = idx;
          }
        }
      });
      if (closest !== -1) {
        img = imagesRef.current.get(closest);
      }
    }

    if (!img || !img.complete || img.naturalWidth === 0) return;

    const width = canvas.width;
    const height = canvas.height;
    const imgRatio = img.naturalWidth / img.naturalHeight;
    const canvasRatio = width / height;

    let drawWidth: number;
    let drawHeight: number;
    let offsetX: number;
    let offsetY: number;

    if (canvasRatio > imgRatio) {
      drawWidth = width;
      drawHeight = width / imgRatio;
      offsetX = 0;
      offsetY = (height - drawHeight) / 2;
    } else {
      drawWidth = height * imgRatio;
      drawHeight = height;
      offsetX = (width - drawWidth) / 2;
      offsetY = 0;
    }

    ctx.clearRect(0, 0, width, height);
    ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
  }, []);

  const updateCanvasDimensions = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    renderFrame(Math.round(currentFrameRef.current));
  }, [renderFrame]);

  // PHASE 1 PRELOAD: Keyframe Skeleton (1 frame every 25 frames = 100 frames total across entire timeline)
  // This guarantees ANY scroll position instantly has a crisp frame nearby (< 1 sec initial load)
  useEffect(() => {
    // 1. Initial 15 frames immediately for instant first view
    for (let i = 1; i <= 20; i++) {
      requestFrame(i);
    }

    // 2. Sample keyframes every 25 frames
    for (let i = 25; i <= totalFrames; i += 25) {
      requestFrame(i);
    }
  }, [totalFrames, requestFrame]);

  // Window resize listener
  useEffect(() => {
    updateCanvasDimensions();
    window.addEventListener("resize", updateCanvasDimensions);
    return () => window.removeEventListener("resize", updateCanvasDimensions);
  }, [updateCanvasDimensions]);

  // High-performance RAF Render Loop with Lerp Smoothing
  useEffect(() => {
    let animId: number;

    const tick = () => {
      if (!isPlaying) {
        const target = targetFrameRef.current;
        const current = currentFrameRef.current;

        // Smooth Lerp step towards target
        const diff = target - current;
        if (Math.abs(diff) > 0.1) {
          const next = current + diff * 0.18; // smooth 18% interpolation factor
          currentFrameRef.current = next;
          const rounded = Math.round(next);
          renderFrame(rounded);
          setDisplayFrame(rounded);

          // Proactively prioritize loading frames around current window
          for (let offset = -10; offset <= 25; offset++) {
            requestFrame(rounded + offset);
          }
        }
      }

      animId = requestAnimationFrame(tick);
    };

    animId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(animId);
  }, [isPlaying, renderFrame, requestFrame]);

  // Scroll listener
  useEffect(() => {
    if (isPlaying) return;

    const handleScroll = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const containerHeight = containerRef.current.offsetHeight;
      const windowHeight = window.innerHeight;

      const totalScrollable = containerHeight - windowHeight;
      if (totalScrollable <= 0) return;

      const scrolled = -rect.top;
      const progress = Math.min(1, Math.max(0, scrolled / totalScrollable));
      const target = Math.min(
        totalFrames,
        Math.max(1, Math.round(progress * (totalFrames - 1)) + 1)
      );

      targetFrameRef.current = target;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, [totalFrames, isPlaying]);

  // Auto-play at 60 FPS
  useEffect(() => {
    if (isPlaying) {
      playIntervalRef.current = setInterval(() => {
        const next =
          currentFrameRef.current >= totalFrames
            ? 1
            : currentFrameRef.current + 1;
        currentFrameRef.current = next;
        targetFrameRef.current = next;
        renderFrame(next);
        setDisplayFrame(next);

        // Preload next frames
        for (let offset = 1; offset <= 20; offset++) {
          requestFrame(next + offset);
        }
      }, 1000 / 60); // 60 FPS
    } else if (playIntervalRef.current) {
      clearInterval(playIntervalRef.current);
    }

    return () => {
      if (playIntervalRef.current) clearInterval(playIntervalRef.current);
    };
  }, [isPlaying, totalFrames, renderFrame, requestFrame]);

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseInt(e.target.value, 10);
    targetFrameRef.current = val;
    currentFrameRef.current = val;
    renderFrame(val);
    setDisplayFrame(val);
    for (let offset = -10; offset <= 25; offset++) {
      requestFrame(val + offset);
    }
  };

  return (
    <div
      ref={containerRef}
      className="relative w-full h-[1200vh] bg-slate-950"
    >
      {/* Sticky fullscreen viewport */}
      <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center bg-slate-950">
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full object-cover block cursor-grab active:cursor-grabbing"
        />

        {/* Minimal Subtle Floating Video Controls (Bottom Right) */}
        <div className="absolute bottom-8 right-6 z-30 flex items-center gap-3 bg-slate-950/80 backdrop-blur-md border border-white/10 px-4 py-2 rounded-full shadow-2xl text-white">
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="flex items-center gap-1.5 text-xs text-slate-200 hover:text-cyan-400 transition-colors cursor-pointer"
            title={isPlaying ? "Pause auto-playback" : "Play auto-playback"}
          >
            {isPlaying ? (
              <Pause className="w-3.5 h-3.5 text-cyan-400" />
            ) : (
              <Play className="w-3.5 h-3.5 text-cyan-400" />
            )}
            <span className="font-mono text-[11px]">
              {isPlaying ? "Pause" : "Play"}
            </span>
          </button>

          <button
            onClick={() => {
              targetFrameRef.current = 1;
              currentFrameRef.current = 1;
              renderFrame(1);
              setDisplayFrame(1);
            }}
            className="text-slate-400 hover:text-white transition-colors cursor-pointer"
            title="Reset to beginning"
          >
            <RotateCcw className="w-3 h-3" />
          </button>

          <div className="hidden sm:flex items-center gap-2 pl-2 border-l border-white/10">
            <input
              type="range"
              min={1}
              max={totalFrames}
              value={displayFrame}
              onChange={handleSliderChange}
              className="w-32 accent-cyan-400 cursor-pointer h-1.5 bg-slate-800 rounded-lg"
            />
          </div>

          <span className="font-mono text-[10px] text-cyan-300/80 pl-1">
            {displayFrame} / {totalFrames}
          </span>
        </div>

        {/* Minimal Scroll down cue at bottom center (fades out as scrolled) */}
        {displayFrame < 80 && (
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-1 text-slate-400/80 text-[11px] font-mono tracking-widest uppercase animate-bounce pointer-events-none">
            <span>Scroll Down to Scrub (2500 Frames)</span>
            <ChevronDown className="w-3.5 h-3.5 text-cyan-400" />
          </div>
        )}
      </div>
    </div>
  );
}
