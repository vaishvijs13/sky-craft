import cv2
import os

def extract_frames(video_file, output_directory="frames"):
    os.makedirs(output_directory, exist_ok=True)

    cap = cv2.VideoCapture(video_file)
    if not cap.isOpened():
        print(f"Error: Unable to open video file {video_file}")
        return

    frame_count = 0

    # loop through the video frames
    while True:
        ret, frame = cap.read()

        if not ret: # when done
            break

        # save every frame
        frame_filename = os.path.join(output_directory, f"frame_{frame_count:06d}.jpg")
        cv2.imwrite(frame_filename, frame)
        print(f"Extracted: {frame_filename}")

        frame_count += 1

    # release captured object
    cap.release()
    print(f"Extraction complete. {frame_count} frames saved to {output_directory}")


video_file = "drone.mov"
output_directory = "frames"

extract_frames(video_file, output_directory)