// const multer = require("multer");
// const { CloudinaryStorage } = require("multer-storage-cloudinary");
// const cloudinary = require("../config/cloudinary");

// // Configure Multer Storage for Cloudinary
// const storage = new CloudinaryStorage({
//   cloudinary: cloudinary,
//   params: {
//     folder: "hrms",
//     resource_type: "auto",
//     format: async (req, file) => file.mimetype.split("/")[1],
//   },
// });

// // const upload = multer({ storage });
// const upload = multer({
//   storage: storage,
//   limits: { fileSize: 10 * 1024 * 1024 }, // 10MB
// });

// module.exports = upload;

const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("../config/cloudinary");

// Configure Multer Storage for Cloudinary
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "hrms",
    resource_type: "raw", // Use 'raw' for PDFs and other non-image files
    format: async (req, file) => {
      const fileFormat = file.mimetype.split("/")[1];
      if (fileFormat === "pdf") {
        return "pdf"; // Explicitly return "pdf" if it's a PDF
      }
      throw new Error("Only PDF files are allowed"); // Reject non-PDF files
    },
  },
});

// Initialize Multer with the Cloudinary storage configuration
const upload = multer({
  storage: storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // Limit to 10MB for file size
  fileFilter: (req, file, cb) => {
    if (file.mimetype !== "application/pdf") {
      return cb(new Error("Only PDF files are allowed"));
    }
    cb(null, true); // Accept the file
  },
});

module.exports = upload;
