const express = require("express");
const multer = require("multer");
const { Storage } = require("@google-cloud/storage");
const path = require("path");
const cors = require("cors");

const app = express();
app.use(cors());
const upload = multer({ dest: "uploads/" });

const storage = new Storage({ keyFilename: "service-account.json" });
const bucketName = "video_storage1";

app.post("/upload", upload.single("file"), async (req, res) => {
  try {
    const bucket = storage.bucket(bucketName);
    const filePath = req.file.path;
    const fileName = path.basename(req.file.originalname);

    await bucket.upload(filePath, {
      destination: `videos/${fileName}`,
      public: true, // need public access
    });

    const publicUrl = `https://storage.googleapis.com/${bucketName}/videos/${fileName}`;
    res.json({ url: publicUrl });
  } catch (err) {
    console.error("Error uploading to google cloud storage:", err);
    res.status(500).json({ error: "Upload failed" });
  }
});

app.listen(5000, () => console.log("Server running on port 5000"));