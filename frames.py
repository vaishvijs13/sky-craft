import cv2
import os

def extract_frames(video_file, output_directory="frames", frame_rate=4):
    os.makedirs(output_directory, exist_ok=True)

    cap = cv2.VideoCapture(video_file)
    if not cap.isOpened():
        print(f"Error: Unable to open video file {video_file}")
        return

    # video frame rate (frames per second)
    video_fps = int(cap.get(cv2.CAP_PROP_FPS))
    frame_interval = int(video_fps / frame_rate)

    frame_count = 0
    extracted_count = 0

    # loop through the video frames
    while True:
        ret, frame = cap.read()

        if not ret: # when done
            break

        if frame_count % frame_interval == 0:
            frame_filename = os.path.join(output_directory, f"frame_{extracted_count:06d}.jpg")
            cv2.imwrite(frame_filename, frame)
            print(f"Extracted: {frame_filename}")
            extracted_count += 1

        frame_count += 1

    # release captured object
    cap.release()
    print(f"Extraction complete. {extracted_count} frames saved to {output_directory}")


video_file = "demo.mov"
output_directory = "frames3"
frame_rate = 4

extract_frames(video_file, output_directory, frame_rate)