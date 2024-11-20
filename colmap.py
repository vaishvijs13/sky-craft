import os
import subprocess

#automate colmap commands for preprocessing
video_path = "input_video.mp4"
frames_dir = "frames"
database_path = "database.db"
sparse_model_dir = "sparse"
dense_model_dir = "dense"

os.makedirs(frames_dir, exist_ok=True)
subprocess.run([
    "ffmpeg", "-i", video_path, "-vf", "fps=10", f"{frames_dir}/frame_%04d.png"
], check=True)

subprocess.run([
    "colmap", "feature_extractor",
    "--database_path", database_path,
    "--image_path", frames_dir,
    "--ImageReader.single_camera", "1"
], check=True)

subprocess.run([
    "colmap", "exhaustive_matcher",
    "--database_path", database_path
], check=True)

os.makedirs(sparse_model_dir, exist_ok=True)
subprocess.run([
    "colmap", "mapper",
    "--database_path", database_path,
    "--image_path", frames_dir,
    "--output_path", sparse_model_dir
], check=True)

os.makedirs(dense_model_dir, exist_ok=True)
subprocess.run([
    "colmap", "image_undistorter",
    "--image_path", frames_dir,
    "--input_path", os.path.join(sparse_model_dir, "0"),
    "--output_path", dense_model_dir,
    "--output_type", "COLMAP"
], check=True)

subprocess.run([
    "colmap", "dense_stereo",
    "--workspace_path", dense_model_dir,
    "--workspace_format", "COLMAP",
    "--DenseStereo.geom_consistency", "1"
], check=True)

subprocess.run([
    "colmap", "model_converter",
    "--input_path", os.path.join(sparse_model_dir, "0"),
    "--output_path", "output_model.ply",
    "--output_type", "PLY"
], check=True)