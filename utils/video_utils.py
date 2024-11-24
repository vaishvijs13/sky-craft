import cv2
import os

def extract_frames(video_file, output_directory="frames", frame_rate=2):
    """
    Extract frames from a video at a specified frame rate.

    Args:
        video_file (str): Path to the video file.
        output_directory (str): Directory to save the extracted frames.
        frame_rate (int): Number of frames to extract per second.
    """
    os.makedirs(output_directory, exist_ok=True)

    cap = cv2.VideoCapture(video_file)
    if not cap.isOpened():
        print(f"Error: Unable to open video file {video_file}")
        return

    video_fps = int(cap.get(cv2.CAP_PROP_FPS))
    frame_interval = int(video_fps / frame_rate)

    frame_count = 0
    extracted_count = 0

    while True:
        ret, frame = cap.read()

        if not ret:
            break

        if frame_count % frame_interval == 0:
            frame_filename = os.path.join(output_directory, f"frame_{extracted_count:06d}.jpg")
            cv2.imwrite(frame_filename, frame)
            print(f"Extracted: {frame_filename}")
            extracted_count += 1

        frame_count += 1

    cap.release()
    print(f"Extraction complete. {extracted_count} frames saved to {output_directory}")