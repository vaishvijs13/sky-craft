import express from "express";
import multer from "multer";
import path from "path";

const app = express();
const PORT = 5000;

// multer configuration for storing uploads
const upload = multer({ dest: "uploads/" });

app.post("/upload", upload.single("file"), (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    // generating a public URL for the uploaded file
    const fileUrl = `http://localhost:${PORT}/uploads/${req.file.filename}`;

    res.status(200).json({ url: fileUrl });
  } catch (err) {
    console.error("Error handling file upload:", err);
    res.status(500).json({ error: "Failed to upload video." });
  }
});

// serve the uploaded files
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
