"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import { Play, Pause, RotateCcw, ChevronDown, Sparkles, Shield, Star, MapPin } from "lucide-react";

interface WalkthroughStageProps {
  totalFrames?: number;
  folderPath?: string;
  onOpenBooking: () => void;
}

export default function WalkthroughStage({
  totalFrames = 361,
  folderPath = "/videos/combined_frames",
  onOpenBooking,
}: WalkthroughStageProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const imagesRef = useRef<Map<number, HTMLImageElement>>(new Map());
  const [currentFrame, setCurrentFrame] = useState<number>(1);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const playIntervalRef = useRef<NodeJS.Timeout | null>(null);

  // Chapter definition based on frame intervals
  const getChapterInfo = (frame: number) => {
    if (frame <= 90) {
      return {
        step: "01 / 04",
        name: "Welcome & Reception Lounge",
        desc: "Tranquil ambience designed to melt dental anxiety before your treatment begins.",
      };
    } else if (frame <= 180) {
      return {
        step: "02 / 04",
        name: "Ergonomic Treatment Suite",
        desc: "State-of-the-art dental chairs with overhead surgical lighting and computerized painless anesthesia.",
      };
    } else if (frame <= 270) {
      return {
        step: "03 / 04",
        name: "Patient Transformation Gallery",
        desc: "Real documented outcomes: custom porcelain veneers, teeth whitening, and smile restorations.",
      };
    } else {
      return {
        step: "04 / 04",
        name: "Sterilization & Clinical Continuity",
        desc: "Hospital-grade Class-B autoclaves ensuring 100% sterile and infection-free patient safety.",
      };
    }
  };

  const chapter = getChapterInfo(currentFrame);

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

  // Preload frames
  useEffect(() => {
    let isCancelled = false;
    const initialBatch = Math.min(40, totalFrames);
    for (let i = 1; i <= initialBatch; i++) {
      const img = new Image();
      img.src = getFrameUrl(i);
      img.onload = () => {
        if (isCancelled) return;
        imagesRef.current.set(i, img);
        if (i === 1) renderFrame(1);
      };
    }

    const timeout = setTimeout(() => {
      for (let i = initialBatch + 1; i <= totalFrames; i++) {
        if (isCancelled) break;
        const img = new Image();
        img.src = getFrameUrl(i);
        img.onload = () => {
          if (isCancelled) return;
          imagesRef.current.set(i, img);
        };
      }
    }, 200);

    return () => {
      isCancelled = true;
      clearTimeout(timeout);
    };
  }, [totalFrames, getFrameUrl, renderFrame]);

  useEffect(() => {
    updateCanvasDimensions();
    window.addEventListener("resize", updateCanvasDimensions);
    return () => window.removeEventListener("resize", updateCanvasDimensions);
  }, [updateCanvasDimensions]);

  // Scroll listener
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

  // Auto-play
  useEffect(() => {
    if (isPlaying) {
      playIntervalRef.current = setInterval(() => {
        setCurrentFrame((prev) => {
          const next = prev >= totalFrames ? 1 : prev + 1;
          renderFrame(next);
          return next;
        });
      }, 1000 / 24);
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
    <section
      id="tour"
      ref={containerRef}
      className="relative w-full h-[380vh] bg-slate-950"
    >
      {/* Sticky Fullscreen Frame */}
      <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center bg-slate-950">
        {/* The Frame Canvas */}
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full object-cover block cursor-grab active:cursor-grabbing"
        />

        {/* Ambient Top Vignette */}
        <div className="absolute inset-x-0 top-0 h-36 bg-gradient-to-b from-slate-950/80 via-slate-950/40 to-transparent pointer-events-none z-10" />

        {/* Floating Interactive Chapter Card (Bottom Left) */}
        <div className="absolute bottom-10 left-6 sm:left-12 z-20 max-w-md pointer-events-none">
          <div className="bg-slate-950/85 backdrop-blur-xl border border-white/10 rounded-2xl p-5 shadow-2xl text-white pointer-events-auto transition-all">
            <div className="flex items-center gap-2 text-[11px] font-mono uppercase tracking-wider text-cyan-400 mb-1">
              <Sparkles className="w-3.5 h-3.5" />
              <span>{chapter.step}</span>
              <span className="text-slate-500">• Virtual Walkthrough</span>
            </div>
            <h3 className="text-lg sm:text-xl font-bold tracking-tight text-white">
              {chapter.name}
            </h3>
            <p className="text-xs text-slate-300/90 mt-1 leading-relaxed">
              {chapter.desc}
            </p>

            <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between">
              <span className="text-[11px] text-slate-400 font-mono">
                Frame {currentFrame} of {totalFrames}
              </span>
              <button
                onClick={onOpenBooking}
                className="text-[11px] font-bold text-cyan-300 hover:text-white transition-colors cursor-pointer"
              >
                Book This Suite →
              </button>
            </div>
          </div>
        </div>

        {/* Floating Mini Scrub Controls (Bottom Right) */}
        <div className="absolute bottom-10 right-6 sm:right-12 z-20 flex items-center gap-3 bg-slate-950/85 backdrop-blur-xl border border-white/10 px-4 py-2.5 rounded-full shadow-2xl text-white">
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
            className="text-slate-400 hover:text-white transition-colors cursor-pointer p-1"
            title="Reset to beginning"
          >
            <RotateCcw className="w-3 h-3" />
          </button>

          <div className="hidden sm:flex items-center gap-2 pl-2 border-l border-white/10">
            <span className="text-[10px] text-slate-400 font-mono">Scrub:</span>
            <input
              type="range"
              min={1}
              max={totalFrames}
              value={currentFrame}
              onChange={handleSliderChange}
              className="w-24 accent-cyan-400 cursor-pointer h-1 bg-slate-800 rounded-lg"
            />
          </div>
        </div>

        {/* Initial Scroll Cue */}
        {currentFrame < 25 && (
          <div className="absolute bottom-28 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-1.5 text-slate-300/80 text-[11px] font-mono tracking-widest uppercase animate-bounce pointer-events-none">
            <span>Scroll Down to Navigate</span>
            <ChevronDown className="w-4 h-4 text-cyan-400" />
          </div>
        )}
      </div>
    </section>
  );
}
