import express from "express";
import multer from "multer";
import OpenAI from "openai";
import fs from "fs";

const router = express.Router();

const upload = multer({ dest: "uploads/" });

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY!,
});

router.post("/api/analyze-video", upload.single("file"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No video file uploaded." });
    }

    const transcript = await extractTranscript(req.file.path);

    if (!transcript) {
      return res
        .status(500)
        .json({ error: "Failed to extract transcript from video." });
    }

    const response = await openai.completions.create({
      model: "text-davinci-003",
      prompt: `Provide a detailed scene summary for the following video transcript:\n\n${transcript}`,
      max_tokens: 200,
    });

    const summary = response.choices?.[0]?.text?.trim();

    if (!summary) {
      return res.status(500).json({ error: "Failed to generate a summary." });
    }

    fs.unlinkSync(req.file.path);

    res.json({ summary });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "An unexpected error occurred." });
  }
});

async function extractTranscript(videoPath: string): Promise<string> {
  return "ts.";
}

export default router;