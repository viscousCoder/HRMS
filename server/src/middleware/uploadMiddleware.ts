import multer, { FileFilterCallback } from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import { Request } from "express";
import cloudinary from "../config/cloudinary";

// Configure Multer Storage for Cloudinary
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: async (req: Request, file: Express.Multer.File) => {
    const fileFormat = file.mimetype.split("/")[1];

    if (fileFormat === "pdf") {
      return {
        folder: "hrms",
        resource_type: "raw", // Use 'raw' for PDFs and other non-image files
        format: "pdf", // Explicitly set format to PDF
      };
    }

    throw new Error("Only PDF files are allowed");
  },
});

// File filter to accept only PDFs
const fileFilter = (
  req: Request,
  file: Express.Multer.File,
  cb: FileFilterCallback
) => {
  if (file.mimetype !== "application/pdf") {
    return cb(new Error("Only PDF files are allowed"));
  }
  cb(null, true); // Accept the file
};

// Initialize Multer with the Cloudinary storage configuration
const upload = multer({
  storage: storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // Limit to 10MB for file size
  fileFilter: fileFilter,
});

export default upload;
