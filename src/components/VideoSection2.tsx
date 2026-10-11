"use client";

import React from "react";
import VideoScrubber from "./VideoScrubber";

interface VideoSection2Props {
  videoFramePath?: string;
  totalFrames?: number;
  overlayTitle?: string;
  overlayDescription?: string;
}

export default function VideoSection2({
  videoFramePath = "/videos/video_2_frames",
  totalFrames = 240,
  overlayTitle = "See Our Smile Transformations - Before & After Results",
  overlayDescription = "Join hundreds of satisfied patients who achieved their dream smiles. From porcelain veneers to full-mouth restorations, witness true craftsmanship.",
}: VideoSection2Props) {
  return (
    <VideoScrubber
      id="transformations"
      folderPath={videoFramePath}
      totalFrames={totalFrames}
      badge="Video 2 • Chair to Results Gallery"
      stepNumber="02 of 03"
      title={overlayTitle}
      description={overlayDescription}
    />
  );
}
