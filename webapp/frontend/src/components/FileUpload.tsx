import React, { useState, ChangeEvent } from "react";

const UploadVideo: React.FC = () => {
  const [uploadProgress, setUploadProgress] = useState<number>(0);
  const [videoUrl, setVideoUrl] = useState<string>("");

  const handleFileUpload = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch("http://localhost:5000/upload", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Failed to upload video");
      }

      const data: { url: string } = await response.json();
      setVideoUrl(data.url);
      console.log("Video uploaded:", data.url);
    } catch (err) {
      console.error("Error uploading video:", err);
    }
  };

  return (
    <div>
      <input type="file" accept="video/*" onChange={handleFileUpload} />
      {uploadProgress > 0 && <p>Upload Progress: {uploadProgress}%</p>}
      {videoUrl && (
        <p>
          Video URL: <a href={videoUrl} target="_blank" rel="noopener noreferrer">{videoUrl}</a>
        </p>
      )}
    </div>
  );
};

export default UploadVideo;