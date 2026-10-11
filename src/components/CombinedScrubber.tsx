"use client";

import React, { useEffect, useRef } from "react";

interface CombinedScrubberProps {
  videoSrc?: string;
  totalFrames?: number;
}

export default function CombinedScrubber({
  videoSrc = "/scrub_video.mp4",
  totalFrames = 5000,
}: CombinedScrubberProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const targetTimeRef = useRef<number>(0);
  const currentTimeRef = useRef<number>(0);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Ensure video is paused and preloaded
    video.pause();
    video.preload = "auto";
    video.currentTime = 0;

    let animId: number;

    // Silky Smooth 60/120 FPS RAF Lerp Loop
    const tick = () => {
      const target = targetTimeRef.current;
      const current = currentTimeRef.current;

      const diff = target - current;
      if (Math.abs(diff) > 0.001) {
        // Smooth 16% interpolation for fluid cinema camera feel
        const next = current + diff * 0.16;
        currentTimeRef.current = next;

        if (video.readyState >= 2) {
          video.currentTime = next;
        }
      }

      animId = requestAnimationFrame(tick);
    };

    animId = requestAnimationFrame(tick);

    const handleScroll = () => {
      if (!containerRef.current || !video || !video.duration) return;

      const rect = containerRef.current.getBoundingClientRect();
      const containerHeight = containerRef.current.offsetHeight;
      const windowHeight = window.innerHeight;

      const totalScrollable = containerHeight - windowHeight;
      if (totalScrollable <= 0) return;

      const scrolled = -rect.top;
      const progress = Math.min(1, Math.max(0, scrolled / totalScrollable));

      targetTimeRef.current = progress * video.duration;
    };

    // Trigger on metadata loaded
    const onLoadedMetadata = () => {
      handleScroll();
    };

    video.addEventListener("loadedmetadata", onLoadedMetadata);
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("scroll", handleScroll);
      if (video) video.removeEventListener("loadedmetadata", onLoadedMetadata);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative w-full h-[600vh] bg-[#f4efe6]"
    >
      {/* Sticky fullscreen viewport */}
      <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center bg-[#f4efe6]">
        <video
          ref={videoRef}
          src={videoSrc}
          playsInline
          muted
          preload="auto"
          className="absolute inset-0 w-full h-full object-cover block pointer-events-none select-none"
        />
      </div>
    </div>
  );
}
