import React, { useState } from "react";
import OpenAI from "openai/index.mjs";

const openai = new OpenAI({
  apiKey: "", // Replace with your OpenAI API key
  dangerouslyAllowBrowser: true,
});

const AIBotSummary: React.FC = () => {
  const [summary, setSummary] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const videoPath = "../backend/uploads/FogTL.mp4"; // Replace with your local video file path

  const analyzeVideo = async () => {
    setLoading(true);
    setError(null);
    setSummary(null);

    try {
      // Example transcript from the video (replace with real video-to-text extraction logic)
      const dummyTranscript = "waz gud.";

      const response = await openai.completions.create({
        model: "text-davinci-003",
        prompt: `Provide a detailed scene summary for the following video transcript:\n\n${dummyTranscript}`,
        max_tokens: 200,
      });

      if (response.choices && response.choices[0].text) {
        setSummary(response.choices[0].text.trim());
      } else {
        setError("No summary was generated.");
      }
    } catch (err) {
      console.error(err);
      setError("An error occurred while analyzing the video.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">AI Bot Summary</h1>
      <div className="mb-4">
        <video
          src={videoPath}
          controls
          className="w-full max-w-md border border-gray-300 rounded-md"
        >
          Your browser does not support the video tag.
        </video>
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
