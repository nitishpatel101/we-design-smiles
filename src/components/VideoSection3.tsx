"use client";

import React from "react";
import VideoScrubber from "./VideoScrubber";

interface VideoSection3Props {
  videoFramePath?: string;
  totalFrames?: number;
  overlayTitle?: string;
  overlayDescription?: string;
}

export default function VideoSection3({
  videoFramePath = "/videos/video_3_frames",
  totalFrames = 240,
  overlayTitle = "Professional Clinic Design - Built for Your Comfort",
  overlayDescription = "Every space designed for your peace of mind. Experience pristine medical-grade sterilization, calming acoustic architecture, and effortless care.",
}: VideoSection3Props) {
  return (
    <VideoScrubber
      id="facility"
      folderPath={videoFramePath}
      totalFrames={totalFrames}
      badge="Video 3 • Clinic Continuity & Architecture"
      stepNumber="03 of 03"
      title={overlayTitle}
      description={overlayDescription}
    />
  );
}
