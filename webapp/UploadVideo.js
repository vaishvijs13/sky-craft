import React, { useState } from "react";

const UploadVideo = () => {
  const [uploadProgress, setUploadProgress] = useState(0);
  const [videoUrl, setVideoUrl] = useState("");

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch("http://localhost:5000/upload", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();
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
      {videoUrl && <p>Video URL: {videoUrl}</p>}
    </div>
  );
};

export default UploadVideo;