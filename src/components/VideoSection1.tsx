"use client";

import React from "react";
import VideoScrubber from "./VideoScrubber";

interface VideoSection1Props {
  videoFramePath?: string;
  totalFrames?: number;
  overlayTitle?: string;
  overlayDescription?: string;
}

export default function VideoSection1({
  videoFramePath = "/videos/video_1_frames",
  totalFrames = 240,
  overlayTitle = "We Design Smiles - Professional Dental Care",
  overlayDescription = "Your journey to perfect smiles starts here. Step inside our tranquil sanctuary where state-of-the-art precision meets compassionate patient comfort.",
}: VideoSection1Props) {
  return (
    <VideoScrubber
      id="walkthrough"
      folderPath={videoFramePath}
      totalFrames={totalFrames}
      badge="Video 1 • Reception to Chair Walkthrough"
      stepNumber="01 of 03"
      title={overlayTitle}
      description={overlayDescription}
    />
  );
}
