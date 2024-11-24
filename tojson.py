import json
import numpy as np

def quaternion_to_matrix(qw, qx, qy, qz):
    R = np.array([
        [1 - 2*qy**2 - 2*qz**2, 2*qx*qy - 2*qz*qw, 2*qx*qz + 2*qy*qw],
        [2*qx*qy + 2*qz*qw, 1 - 2*qx**2 - 2*qz**2, 2*qy*qz - 2*qx*qw],
        [2*qx*qz - 2*qy*qw, 2*qy*qz + 2*qx*qw, 1 - 2*qx**2 - 2*qy**2]
    ])
    return R

def create_transforms_json(images_file, cameras_file, output_path):
    with open(images_file, 'r') as f:
        images = f.readlines()
    with open(cameras_file, 'r') as f:
        cameras = f.readlines()
    
    for line in cameras:
        if not line.startswith("#") and line.strip():
            _, _, _, _, fx, cx, cy = map(float, line.split())
            camera_angle_x = 2 * np.arctan(0.5 / fx)

    frames = []
    for i, line in enumerate(images):
        if not line.startswith("#") and i % 2 == 0:  # Every second line
            data = line.split()
            qw, qx, qy, qz = map(float, data[1:5])
            tx, ty, tz = map(float, data[5:8])
            file_path = data[9]
            
            R = quaternion_to_matrix(qw, qx, qy, qz)
            T = np.array([tx, ty, tz]).reshape(3, 1)
            transform_matrix = np.hstack((R, T))
            transform_matrix = np.vstack((transform_matrix, [0, 0, 0, 1]))

            frames.append({
                "file_path": f"./images/{file_path}",
                "transform_matrix": transform_matrix.tolist()
            })

    transforms = {"camera_angle_x": camera_angle_x, "frames": frames}
    with open(output_path, 'w') as f:
        json.dump(transforms, f, indent=4)