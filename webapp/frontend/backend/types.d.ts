import "express";

declare global {
  namespace Express {
    interface Request {
      file?: Multer.File; // Use Multer.File from the type definitions
    }
  }
}
