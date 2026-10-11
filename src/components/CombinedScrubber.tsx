"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import { Play, Pause, RotateCcw, ChevronDown } from "lucide-react";

interface CombinedScrubberProps {
  totalFrames?: number;
  folderPath?: string;
}

export default function CombinedScrubber({
  totalFrames = 900,
  folderPath = "/videos/combined_frames",
}: CombinedScrubberProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const imagesRef = useRef<Map<number, HTMLImageElement>>(new Map());
  const [currentFrame, setCurrentFrame] = useState<number>(1);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const playIntervalRef = useRef<NodeJS.Timeout | null>(null);

  const getFrameUrl = useCallback(
    (index: number) => {
      const padded = String(index).padStart(4, "0");
      return `${folderPath}/frame_${padded}.webp`;
    },
    [folderPath]
  );

  const renderFrame = useCallback((frameIndex: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let img = imagesRef.current.get(frameIndex);
    if (!img || !img.complete || img.naturalWidth === 0) {
      let closest = 1;
      let minDiff = Infinity;
      imagesRef.current.forEach((image, idx) => {
        if (image.complete && image.naturalWidth > 0) {
          const diff = Math.abs(idx - frameIndex);
          if (diff < minDiff) {
            minDiff = diff;
            closest = idx;
          }
        }
      });
      img = imagesRef.current.get(closest);
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
    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    renderFrame(currentFrame);
  }, [currentFrame, renderFrame]);

  // Preload initial batch, then background load rest in chunks
  useEffect(() => {
    let isCancelled = false;

    // Load first 60 frames immediately
    const initialBatch = Math.min(60, totalFrames);
    for (let i = 1; i <= initialBatch; i++) {
      const img = new Image();
      img.src = getFrameUrl(i);
      img.onload = () => {
        if (isCancelled) return;
        imagesRef.current.set(i, img);
        if (i === 1) renderFrame(1);
      };
    }

    // Load remaining frames in batches of 40 to ensure butter-smooth network & memory
    let currentIndex = initialBatch + 1;
    const interval = setInterval(() => {
      if (isCancelled || currentIndex > totalFrames) {
        clearInterval(interval);
        return;
      }
      const batchEnd = Math.min(currentIndex + 40, totalFrames + 1);
      for (let i = currentIndex; i < batchEnd; i++) {
        const img = new Image();
        img.src = getFrameUrl(i);
        img.onload = () => {
          if (!isCancelled) imagesRef.current.set(i, img);
        };
      }
      currentIndex = batchEnd;
    }, 150);

    return () => {
      isCancelled = true;
      clearInterval(interval);
    };
  }, [totalFrames, getFrameUrl, renderFrame]);

  useEffect(() => {
    updateCanvasDimensions();
    window.addEventListener("resize", updateCanvasDimensions);
    return () => window.removeEventListener("resize", updateCanvasDimensions);
  }, [updateCanvasDimensions]);

  // Scroll scrub listener
  useEffect(() => {
    if (isPlaying) return;

    let animationFrameId: number;

    const handleScroll = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const containerHeight = containerRef.current.offsetHeight;
      const windowHeight = window.innerHeight;

      const totalScrollable = containerHeight - windowHeight;
      if (totalScrollable <= 0) return;

      const scrolled = -rect.top;
      const progress = Math.min(1, Math.max(0, scrolled / totalScrollable));
      const targetFrame = Math.min(
        totalFrames,
        Math.max(1, Math.round(progress * (totalFrames - 1)) + 1)
      );

      animationFrameId = requestAnimationFrame(() => {
        setCurrentFrame(targetFrame);
        renderFrame(targetFrame);
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      cancelAnimationFrame(animationFrameId);
    };
  }, [totalFrames, isPlaying, renderFrame]);

  // Auto-play at 30 FPS
  useEffect(() => {
    if (isPlaying) {
      playIntervalRef.current = setInterval(() => {
        setCurrentFrame((prev) => {
          const next = prev >= totalFrames ? 1 : prev + 1;
          renderFrame(next);
          return next;
        });
      }, 1000 / 30);
    } else if (playIntervalRef.current) {
      clearInterval(playIntervalRef.current);
    }

    return () => {
      if (playIntervalRef.current) clearInterval(playIntervalRef.current);
    };
  }, [isPlaying, totalFrames, renderFrame]);

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseInt(e.target.value, 10);
    setCurrentFrame(val);
    renderFrame(val);
  };

  return (
    <div
      ref={containerRef}
      className="relative w-full h-[650vh] bg-slate-950"
    >
      {/* Sticky fullscreen viewport */}
      <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center bg-slate-950">
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full object-cover block cursor-grab active:cursor-grabbing"
        />

        {/* Minimal Subtle Floating Video Controls (Bottom Right) */}
        <div className="absolute bottom-8 right-6 z-30 flex items-center gap-3 bg-slate-950/75 backdrop-blur-md border border-white/10 px-4 py-2 rounded-full shadow-2xl">
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
              setCurrentFrame(1);
              renderFrame(1);
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
              value={currentFrame}
              onChange={handleSliderChange}
              className="w-28 accent-cyan-400 cursor-pointer h-1 bg-slate-800 rounded-lg"
            />
          </div>

          <span className="font-mono text-[10px] text-cyan-300/80 pl-1">
            {currentFrame} / {totalFrames}
          </span>
        </div>

        {/* Minimal Scroll down cue at bottom center (fades out as scrolled) */}
        {currentFrame < 45 && (
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-1 text-slate-400/80 text-[11px] font-mono tracking-widest uppercase animate-bounce pointer-events-none">
            <span>Scroll</span>
            <ChevronDown className="w-3.5 h-3.5 text-cyan-400" />
          </div>
        )}
      </div>
    </div>
  );
}
