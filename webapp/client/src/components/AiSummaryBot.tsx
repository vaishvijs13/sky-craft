import React, { useState } from "react";
import axios from "axios";

const AIBotSummary: React.FC = () => {
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [summary, setSummary] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setVideoFile(e.target.files[0]);
    }
  };

  const analyzeVideo = async () => {
    if (!videoFile) {
      setError("Please select a video file to analyze.");
      return;
    }

    setLoading(true);
    setError(null);
    setSummary(null);

    try {
      // upload the video file to the backend for processing
      const formData = new FormData();
      formData.append("file", videoFile);

      const response = await axios.post("/api/analyze-video", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      setSummary(response.data.summary);
    } catch (err) {
      console.error(err);
      setError("Failed to analyze the video. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">AI Bot Summary</h1>
      <div className="mb-4">
      <input
          type="file"
          accept="video/*"
          onChange={handleFileChange}
          className="mb-2"
        />
        {videoFile && (
          <video
            src={URL.createObjectURL(videoFile)}
            controls
            className="w-full max-w-md border border-gray-300 rounded-md"
          >
            Your browser does not support the video tag.
          </video>
        )}
      </div>
      <button
        onClick={analyzeVideo}
        className="bg-blue-500 text-white px-4 py-2 rounded-md"
        disabled={loading}
      >
        {loading ? "Analyzing..." : "Analyze Video"}
      </button>

      {error && <p className="text-red-500 mt-4">{error}</p>}

      {summary && (
        <div className="mt-4">
          <h2 className="text-lg font-semibold">Video Summary:</h2>
          <p className="mt-2">{summary}</p>
        </div>
      )}
    </div>
  );
};

export default AIBotSummary;
