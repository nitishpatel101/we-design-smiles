import os
import shutil
import subprocess
import time
import imageio_ffmpeg

ffmpeg = imageio_ffmpeg.get_ffmpeg_exe()
combined_video = r"C:\Users\DELL\dentist\public\combined_walkthrough.mp4"
dest_dir = r"C:\Users\DELL\dentist\public\videos\combined_frames"

print("Emptying old directory...")
if os.path.exists(dest_dir):
    shutil.rmtree(dest_dir)
os.makedirs(dest_dir, exist_ok=True)

out_pattern = os.path.join(dest_dir, "frame_%04d.webp")

print("Extracting exactly 5000 frames in 1080p WebP...")
t0 = time.time()

# 30.04s duration. 5000 frames / 30.04s = ~166.4447 fps
cmd = [
    ffmpeg, "-y",
    "-i", combined_video,
    "-vf", "fps=166.4447,scale=1920:1080:flags=lanczos",
    "-c:v", "libwebp",
    "-quality", "75",
    "-compression_level", "0",
    "-vframes", "5000",
    out_pattern
]

res = subprocess.run(cmd, stdout=subprocess.PIPE, stderr=subprocess.PIPE, text=True)
if res.returncode != 0:
    print("Error:", res.stderr)
else:
    frames = [f for f in os.listdir(dest_dir) if f.endswith(".webp")]
    frames.sort()
    total_size = sum(os.path.getsize(os.path.join(dest_dir, f)) for f in frames) / (1024 * 1024)
    print(f"Extraction successful! Extracted: {len(frames)} frames. Total size: {total_size:.2f} MB in {time.time()-t0:.2f}s")
    print(f"First frame: {frames[0]}, Last frame: {frames[-1]}")
