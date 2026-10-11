import os
import subprocess
import time
import imageio_ffmpeg

ffmpeg = imageio_ffmpeg.get_ffmpeg_exe()
print(f"Using FFmpeg: {ffmpeg}")

videos = [
    {
        "src": r"C:\Users\DELL\Downloads\video_01_reception_to_chair.mp4",
        "dest": r"C:\Users\DELL\dentist\public\videos\video_1_frames",
        "name": "Video 1 (Reception to Doctor's Chair)"
    },
    {
        "src": r"C:\Users\DELL\Downloads\video_02_results_gallery.mp4",
        "dest": r"C:\Users\DELL\dentist\public\videos\video_2_frames",
        "name": "Video 2 (Treatment Chair to Results Gallery)"
    },
    {
        "src": r"C:\Users\DELL\Downloads\video_03_clinic_continuity.mp4",
        "dest": r"C:\Users\DELL\dentist\public\videos\video_3_frames",
        "name": "Video 3 (Empty Patient Area to Clinic Continuity)"
    }
]

for v in videos:
    os.makedirs(v["dest"], exist_ok=True)
    out_pattern = os.path.join(v["dest"], "frame_%04d.webp")
    print(f"Extracting {v['name']}...")
    t0 = time.time()
    # Extract at original 24fps, webp quality 78, 1280x720 for silky smooth 60fps web scroll performance
    cmd = [
        ffmpeg, "-y",
        "-i", v["src"],
        "-vf", "fps=24,scale=1280:720:flags=lanczos",
        "-c:v", "libwebp",
        "-quality", "78",
        "-compression_level", "4",
        out_pattern
    ]
    res = subprocess.run(cmd, stdout=subprocess.PIPE, stderr=subprocess.PIPE, text=True)
    if res.returncode != 0:
        print(f"Error extracting {v['name']}: {res.stderr}")
    else:
        frames = [f for f in os.listdir(v["dest"]) if f.endswith(".webp")]
        total_size = sum(os.path.getsize(os.path.join(v["dest"], f)) for f in frames) / (1024 * 1024)
        print(f"Done in {time.time()-t0:.2f}s! Extracted {len(frames)} frames. Total size: {total_size:.2f} MB")
