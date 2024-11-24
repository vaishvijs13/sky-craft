from google.cloud import storage
import os

def download_video_from_gcs(bucket_name, source_blob_name, destination_file_name):
    client = storage.Client()

    # Get the bucket
    bucket = client.bucket(bucket_name)

    blob = bucket.blob(source_blob_name)

    os.makedirs(os.path.dirname(destination_file_name), exist_ok=True)
    blob.download_to_filename(destination_file_name)
    print(f"Video {source_blob_name} downloaded to {destination_file_name}")

if __name__ == "__main__":
    bucket_name = "your-bucket-name"  # replace with gcs
    source_blob_name = "path/to/your_video.mp4"  # path to video
    destination_file_name = "your_video.mp4"  # local path

    download_video_from_gcs(bucket_name, source_blob_name, destination_file_name)

    extract_frames(destination_file_name)