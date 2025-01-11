import express, { Request, Response } from "express";
import multer, { Multer, FileFilterCallback } from "multer";
import { Storage, Bucket } from "@google-cloud/storage";
import path from "path";
import cors from "cors";
import { NextFunction } from "express";

const app = express();
app.use(cors());

const upload: Multer = multer({ dest: "uploads/" });

const storage: Storage = new Storage({ keyFilename: "service-account.json" });
const bucketName: string = "video_storage1";
const bucket: Bucket = storage.bucket(bucketName);

app.post(
  "/upload",
  upload.single("file"),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      if (!req.file) {
        return res.status(400).json({ error: "No file uploaded" });
      }

      const filePath: string = req.file.path;
      const fileName: string = path.basename(req.file.originalname);

      await bucket.upload(filePath, {
        destination: `videos/${fileName}`,
        public: true,
      });

      const publicUrl: string = `https://storage.googleapis.com/${bucketName}/videos/${fileName}`;

      res.status(200).json({ url: publicUrl });
    } catch (err) {
      console.error("Error uploading to Google Cloud Storage:", err);
      next(err); // Pass the error to the Express error handler
    }
  }
);

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  res.status(500).json({ error: err.message });
});

const PORT: number = 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});