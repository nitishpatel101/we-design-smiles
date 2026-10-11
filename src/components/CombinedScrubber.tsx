"use client";

import React, { useEffect, useRef, useCallback } from "react";

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
      // Find nearest loaded frame within available cached images
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

  // PHASE 1 PRELOAD: Keyframe Skeleton
  useEffect(() => {
    // Initial 20 frames immediately for instant first view
    for (let i = 1; i <= 20; i++) {
      requestFrame(i);
    }

    // Keyframes sampled every 25 frames across the whole video
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
      const target = targetFrameRef.current;
      const current = currentFrameRef.current;

      const diff = target - current;
      if (Math.abs(diff) > 0.1) {
        const next = current + diff * 0.18;
        currentFrameRef.current = next;
        const rounded = Math.round(next);
        renderFrame(rounded);

        // Proactively prioritize loading frames around current scroll position
        for (let offset = -10; offset <= 25; offset++) {
          requestFrame(rounded + offset);
        }
      }

      animId = requestAnimationFrame(tick);
    };

    animId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(animId);
  }, [renderFrame, requestFrame]);

  // Scroll listener
  useEffect(() => {
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
  }, [totalFrames]);

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
      </div>
    </div>
  );
}
