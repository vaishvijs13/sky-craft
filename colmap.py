import os
import subprocess

# paths
output_root = "colmap" # parent directory
frames_dir = os.path.join(output_root, "input")
database_path = os.path.join(output_root, "database.db")
sparse_model_dir = os.path.join(output_root, "sparse")
dense_model_dir = os.path.join(output_root, "dense")
undistorted_images_dir = os.path.join(dense_model_dir, "images")

os.makedirs(output_root, exist_ok=True)
os.makedirs(frames_dir, exist_ok=True)

# feature extraction
subprocess.run([
    "colmap", "feature_extractor",
    "--database_path", database_path,
    "--image_path", frames_dir,
    "--ImageReader.single_camera", "1"
], check=True)

# feature matching
subprocess.run([
    "colmap", "exhaustive_matcher",
    "--database_path", database_path
], check=True)

# sparse reconstruction
os.makedirs(sparse_model_dir, exist_ok=True)
subprocess.run([
    "colmap", "mapper",
    "--database_path", database_path,
    "--image_path", frames_dir,
    "--output_path", sparse_model_dir
], check=True)

# image undistortion
os.makedirs(dense_model_dir, exist_ok=True)
subprocess.run([
    "colmap", "image_undistorter",
    "--image_path", frames_dir,
    "--input_path", os.path.join(sparse_model_dir, "0"),
    "--output_path", dense_model_dir,
    "--output_type", "COLMAP"
], check=True)

# dense stereo reconstruction
subprocess.run([
    "colmap", "dense_stereo",
    "--workspace_path", dense_model_dir,
    "--workspace_format", "COLMAP",
    "--DenseStereo.geom_consistency", "1"
], check=True)

# resize undistorted images
percentages = [50, 25, 12.5]  # resize percentages
for percentage in percentages:
    command_l = f"magick mogrify -resize {percentage}% {undistorted_images_dir}/*"
    exit_code = os.system(command_l)
    if exit_code != 0:
        print(f"error: resizing images to {percentage}% failed. exit immediately")
        exit(exit_code)

subprocess.run([
    "colmap", "model_converter",
    "--input_path", os.path.join(sparse_model_dir, "0"),
    "--output_path", os.path.join(output_root, "output_model.ply"),
    "--output_type", "PLY"
], check=True)

print(f"output saved in '{output_root}'.")