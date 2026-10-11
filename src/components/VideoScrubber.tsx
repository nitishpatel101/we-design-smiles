"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import VideoOverlay from "./VideoOverlay";
import { Play, Pause, RotateCcw, Eye, Film } from "lucide-react";

interface VideoScrubberProps {
  id: string;
  folderPath: string; // e.g. "/videos/video_1_frames"
  totalFrames: number;
  badge?: string;
  stepNumber?: string;
  title: string;
  description: string;
}

export default function VideoScrubber({
  id,
  folderPath,
  totalFrames,
  badge = "Cinematic Experience",
  stepNumber = "Phase 1",
  title,
  description,
}: VideoScrubberProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Cached image elements
  const imagesRef = useRef<Map<number, HTMLImageElement>>(new Map());
  const [currentFrame, setCurrentFrame] = useState<number>(1);
  const [loadedCount, setLoadedCount] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const playIntervalRef = useRef<NodeJS.Timeout | null>(null);

  // Helper to format frame path: frame_0001.webp
  const getFrameUrl = useCallback(
    (index: number) => {
      const padded = String(index).padStart(4, "0");
      return `${folderPath}/frame_${padded}.webp`;
    },
    [folderPath]
  );

  // Draw a specific frame onto the canvas
  const renderFrame = useCallback((frameIndex: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Find requested image or closest available loaded frame
    let img = imagesRef.current.get(frameIndex);
    if (!img || !img.complete || img.naturalWidth === 0) {
      // Find nearest loaded frame as fallback
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

    // Canvas dimensions matching device pixel ratio
    const width = canvas.width;
    const height = canvas.height;

    // Calculate object-fit: cover
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

  // Set up canvas resolution
  const updateCanvasDimensions = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    renderFrame(currentFrame);
  }, [currentFrame, renderFrame]);

  // Preload frames incrementally
  useEffect(() => {
    let isCancelled = false;
    let count = 0;

    // Load initial batch first (first 30 frames)
    const initialBatch = Math.min(30, totalFrames);
    for (let i = 1; i <= initialBatch; i++) {
      const img = new Image();
      img.src = getFrameUrl(i);
      img.onload = () => {
        if (isCancelled) return;
        imagesRef.current.set(i, img);
        count++;
        setLoadedCount(count);
        if (i === 1) renderFrame(1);
      };
    }

    // Load remainder in background idle/interval
    const timeout = setTimeout(() => {
      for (let i = initialBatch + 1; i <= totalFrames; i++) {
        if (isCancelled) break;
        const img = new Image();
        img.src = getFrameUrl(i);
        img.onload = () => {
          if (isCancelled) return;
          imagesRef.current.set(i, img);
          count++;
          setLoadedCount(count);
        };
      }
    }, 400);

    return () => {
      isCancelled = true;
      clearTimeout(timeout);
    };
  }, [totalFrames, getFrameUrl, renderFrame]);

  // Window resize handler
  useEffect(() => {
    updateCanvasDimensions();
    window.addEventListener("resize", updateCanvasDimensions);
    return () => window.removeEventListener("resize", updateCanvasDimensions);
  }, [updateCanvasDimensions]);

  // Track scroll inside the sticky section
  useEffect(() => {
    if (isPlaying) return; // scroll scrubbing paused during auto-play

    let animationFrameId: number;

    const handleScroll = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const containerHeight = containerRef.current.offsetHeight;
      const windowHeight = window.innerHeight;

      // Distance from top of container to top of viewport
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

  // Auto-play preview feature
  useEffect(() => {
    if (isPlaying) {
      playIntervalRef.current = setInterval(() => {
        setCurrentFrame((prev) => {
          const next = prev >= totalFrames ? 1 : prev + 1;
          renderFrame(next);
          return next;
        });
      }, 1000 / 24); // 24 FPS
    } else if (playIntervalRef.current) {
      clearInterval(playIntervalRef.current);
    }

    return () => {
      if (playIntervalRef.current) clearInterval(playIntervalRef.current);
    };
  }, [isPlaying, totalFrames, renderFrame]);

  // Manual scrubber change
  const handleScrubberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseInt(e.target.value, 10);
    setCurrentFrame(val);
    renderFrame(val);
  };

  return (
    <section
      id={id}
      ref={containerRef}
      className="relative w-full h-[220vh] bg-slate-950"
    >
      {/* Sticky viewport */}
      <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center bg-slate-950">
        {/* Cinematic Canvas */}
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full object-cover block cursor-grab active:cursor-grabbing"
        />

        {/* Ambient Top vignette / subtle shadow */}
        <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-slate-950/80 to-transparent pointer-events-none z-10" />

        {/* Floating Mini Controls (Top Right) */}
        <div className="absolute top-24 right-6 z-30 flex items-center gap-2 bg-slate-900/80 backdrop-blur-md border border-white/10 px-3 py-1.5 rounded-full text-xs text-slate-300 shadow-xl">
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="flex items-center gap-1.5 hover:text-cyan-400 transition-colors cursor-pointer pr-2 border-r border-white/10"
            title={isPlaying ? "Pause auto-scrub" : "Auto play sequence"}
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
            className="hover:text-cyan-400 transition-colors cursor-pointer p-1"
            title="Reset to first frame"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>

          <div className="flex items-center gap-1.5 pl-1.5 font-mono text-[11px] text-cyan-300">
            <Film className="w-3 h-3 text-cyan-400" />
            <span>
              {String(currentFrame).padStart(3, "0")} / {totalFrames}
            </span>
          </div>
        </div>

        {/* Floating Manual Scrub Slider on bottom desktop for fine control */}
        <div className="absolute bottom-28 right-6 z-30 hidden lg:flex items-center gap-3 bg-slate-900/70 backdrop-blur-md border border-white/10 px-4 py-2 rounded-xl text-xs text-slate-300 shadow-2xl">
          <span className="text-[11px] font-mono text-cyan-300">Scrub</span>
          <input
            type="range"
            min={1}
            max={totalFrames}
            value={currentFrame}
            onChange={handleScrubberChange}
            className="w-36 accent-cyan-400 cursor-pointer h-1.5 bg-slate-700 rounded-lg"
          />
        </div>

        {/* Overlay Content */}
        <VideoOverlay
          badge={badge}
          stepNumber={stepNumber}
          title={title}
          description={description}
        />
      </div>
    </section>
  );
}
