import React, { useState } from "react";
import { useDropzone } from "react-dropzone";
import {
  TextField,
  Button,
  Grid,
  Container,
  Typography,
  Box,
} from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../store/store.tsx";
import { handleReferral } from "../../store/employeeSlice.tsx";

const Referral: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    contact: "",
    qualification: "",
    resume: null as File | null,
  });

  const [errors, setErrors] = useState({
    name: "",
    email: "",
    contact: "",
    qualification: "",
    resume: "",
  });

  const onDrop = (acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      setFormData((prev) => ({
        ...prev,
        resume: acceptedFiles[0], // Store the selected file
      }));
      setErrors((prev) => ({
        ...prev,
        resume: "", // Clear error if file is selected
      }));
    }
  };

  const { getRootProps, getInputProps, isDragActive, acceptedFiles } =
    useDropzone({
      onDrop,
      accept: {
        "application/pdf": [".pdf"],
        "application/msword": [".doc"],
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
          [".docx"],
        "image/jpeg": [".jpg", ".jpeg"],
        "image/png": [".png"],
      },
      multiple: false, // Only allow one file
    });

  const validate = () => {
    let isValid = true;
    let errors = {
      name: "",
      email: "",
      contact: "",
      qualification: "",
      resume: "",
    };

    if (!formData.name || formData.name.split(" ").length < 2) {
      errors.name = "Name must contain at least two words.";
      isValid = false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email || !emailRegex.test(formData.email)) {
      errors.email = "Please enter a valid email.";
      isValid = false;
    }

    const contactRegex = /^[0-9]{10}$/;
    if (!formData.contact || !contactRegex.test(formData.contact)) {
      errors.contact = "Phone number must be exactly 10 digits.";
      isValid = false;
    }

    if (!formData.qualification) {
      errors.qualification = "Qualification is required.";
      isValid = false;
    }

    if (!formData.resume) {
      errors.resume = "Resume is required.";
      isValid = false;
    }

    setErrors(errors);
    return isValid;
  };

  const handleSubmit = () => {
    if (validate()) {
      console.log("Form Data:", formData);
      dispatch(handleReferral(formData));

      setFormData({
        name: "",
        email: "",
        contact: "",
        qualification: "",
        resume: null,
      });

      setErrors({
        name: "",
        email: "",
        contact: "",
        qualification: "",
        resume: "",
      });
    } else {
      console.log("Form has errors:", errors);
    }
  };

  return (
    <Container>
      <form noValidate>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Candidate Name"
              variant="outlined"
              fullWidth
              name="name"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              error={!!errors.name}
              helperText={errors.name}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              label="Candidate Email"
              variant="outlined"
              fullWidth
              name="email"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              error={!!errors.email}
              helperText={errors.email}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              label="Contact Number"
              variant="outlined"
              fullWidth
              name="contact"
              value={formData.contact}
              onChange={(e) =>
                setFormData({ ...formData, contact: e.target.value })
              }
              error={!!errors.contact}
              helperText={errors.contact}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              label="Qualification"
              variant="outlined"
              fullWidth
              name="qualification"
              value={formData.qualification}
              onChange={(e) =>
                setFormData({ ...formData, qualification: e.target.value })
              }
              error={!!errors.qualification}
              helperText={errors.qualification}
            />
          </Grid>

          {/* File Upload using Dropzone */}
          <Grid item xs={12}>
            <Box
              {...getRootProps()}
              sx={{
                border: "2px dashed #ccc",
                padding: "16px",
                textAlign: "center",
                cursor: "pointer",
                borderRadius: "8px",
                backgroundColor: isDragActive ? "#f1f1f1" : "#fafafa",
                "&:hover": { backgroundColor: "#f1f1f1" },
              }}
            >
              <input {...getInputProps()} />
              <CloudUploadIcon sx={{ fontSize: 40, color: "#1976d2" }} />
              <Typography variant="body1">
                {isDragActive
                  ? "Drop the file here..."
                  : "Drag & drop a file here, or click to select"}
              </Typography>
              <Typography variant="caption">
                (Accepted formats: PDF, DOC, DOCX, JPG, JPEG, PNG)
              </Typography>
            </Box>
            {formData.resume && (
              <Typography variant="body2" sx={{ marginTop: 1 }}>
                Selected file: {formData.resume.name}
              </Typography>
            )}
            {errors.resume && (
              <Typography variant="body2" color="error">
                {errors.resume}
              </Typography>
            )}
          </Grid>

          <Grid item xs={12}>
            <Button
              variant="contained"
              color="primary"
              onClick={handleSubmit}
              fullWidth
            >
              Submit
            </Button>
          </Grid>
        </Grid>
      </form>
    </Container>
  );
};

export default Referral;

// import React, { useState } from "react";
// import {
//   TextField,
//   Button,
//   Grid,
//   FormControl,
//   InputLabel,
//   FormHelperText,
//   Input,
//   Container,
//   InputAdornment,
// } from "@mui/material";
// import CloudUploadIcon from "@mui/icons-material/CloudUpload";
// import { useDispatch } from "react-redux";
// import { AppDispatch } from "../../store/store.tsx";
// import { handleReferral } from "../../store/employeeSlice.tsx";

// const Referral: React.FC = () => {
//   const dispatch = useDispatch<AppDispatch>();
//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     contact: "",
//     qualification: "",
//     resume: null as File | null,
//   });

//   const [errors, setErrors] = useState({
//     name: "",
//     email: "",
//     contact: "",
//     qualification: "",
//     resume: "",
//   });

//   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({
//       ...prev,
//       [name]: value,
//     }));
//   };

//   const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     if (e.target.files) {
//       setFormData((prev) => ({
//         ...prev,
//         resume: e.target.files[0],
//       }));
//     }
//   };

//   // Custom validation logic
//   const validate = () => {
//     let isValid = true;
//     let errors = {
//       name: "",
//       email: "",
//       contact: "",
//       qualification: "",
//       resume: "",
//     };

//     // Validate name (two words)
//     if (!formData.name || formData.name.split(" ").length < 2) {
//       errors.name = "Name must contain at least two words.";
//       isValid = false;
//     }

//     // Validate email (basic email format)
//     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//     if (!formData.email || !emailRegex.test(formData.email)) {
//       errors.email = "Please enter a valid email.";
//       isValid = false;
//     }

//     // Validate contact number (exactly 10 digits)
//     const contactRegex = /^[0-9]{10}$/;
//     if (!formData.contact || !contactRegex.test(formData.contact)) {
//       errors.contact = "Phone number must be exactly 10 digits.";
//       isValid = false;
//     }

//     // Validate qualification
//     if (!formData.qualification) {
//       errors.qualification = "Qualification is required.";
//       isValid = false;
//     }

//     // Validate resume (file must be uploaded)
//     if (!formData.resume) {
//       errors.resume = "Resume is required.";
//       isValid = false;
//     }

//     setErrors(errors);
//     return isValid;
//   };

//   const handleSubmit = () => {
//     if (validate()) {
//       console.log("Form Data:", formData);
//       dispatch(handleReferral(formData));
//       // alert("Form submitted successfully!");

//       // Reset all fields after form submission
//       setFormData({
//         name: "",
//         email: "",
//         contact: "",
//         qualification: "",
//         resume: null,
//       });

//       // Reset error state after submission
//       setErrors({
//         name: "",
//         email: "",
//         contact: "",
//         qualification: "",
//         resume: "",
//       });
//     } else {
//       console.log("Form has errors:", errors);
//     }
//   };

//   return (
//     <Container>
//       <form noValidate>
//         <Grid container spacing={2}>
//           <Grid item xs={12} sm={6}>
//             <TextField
//               label="Candidate Name"
//               variant="outlined"
//               fullWidth
//               name="name"
//               value={formData.name}
//               onChange={handleInputChange}
//               error={!!errors.name}
//               helperText={errors.name}
//             />
//           </Grid>

//           <Grid item xs={12} sm={6}>
//             <TextField
//               label="Candidate Email"
//               variant="outlined"
//               fullWidth
//               name="email"
//               value={formData.email}
//               onChange={handleInputChange}
//               error={!!errors.email}
//               helperText={errors.email}
//             />
//           </Grid>

//           <Grid item xs={12} sm={6}>
//             <TextField
//               label="Contact Number"
//               variant="outlined"
//               fullWidth
//               name="contact"
//               value={formData.contact}
//               onChange={handleInputChange}
//               error={!!errors.contact}
//               helperText={errors.contact}
//             />
//           </Grid>

//           <Grid item xs={12} sm={6}>
//             <TextField
//               label="Qualification"
//               variant="outlined"
//               fullWidth
//               name="qualification"
//               value={formData.qualification}
//               onChange={handleInputChange}
//               error={!!errors.qualification}
//               helperText={errors.qualification}
//             />
//           </Grid>

//           {/* Candidate Resume */}
//           {/* <Grid item xs={12} sm={6}>
//             <TextField
//               label="Resume"
//               variant="outlined"
//               fullWidth
//               value={formData.resume ? formData.resume.name : ""}
//               InputProps={{
//                 endAdornment: (
//                   <InputAdornment position="end">
//                     <label
//                       htmlFor="resume-upload"
//                       style={{ cursor: "pointer" }}
//                     >
//                       <CloudUploadIcon />
//                     </label>
//                   </InputAdornment>
//                 ),
//               }}
//               InputLabelProps={{
//                 shrink: true,
//               }}
//               onClick={() => document.getElementById("resume-upload")?.click()}
//               error={!!errors.resume}
//               helperText={errors.resume}
//             />
//             <input
//               type="file"
//               id="resume-upload"
//               name="resume"
//               onChange={handleFileChange}
//               style={{ display: "none" }}
//               accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
//             />
//           </Grid> */}

//           <Grid item xs={12} sm={6}>
//             <TextField
//               label="Resume"
//               variant="outlined"
//               fullWidth
//               value={formData.resume ? formData.resume.name : ""}
//               InputProps={{
//                 endAdornment: (
//                   <InputAdornment position="end">
//                     <label
//                       htmlFor="resume-upload"
//                       style={{ cursor: "pointer" }}
//                     >
//                       <CloudUploadIcon />
//                     </label>
//                   </InputAdornment>
//                 ),
//               }}
//               onClick={() => document.getElementById("resume-upload")?.click()}
//               error={!!errors.resume}
//               helperText={errors.resume}
//             />
//             <input
//               type="file"
//               id="resume-upload"
//               name="resume"
//               onChange={handleFileChange}
//               style={{ display: "none" }}
//               accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
//             />
//           </Grid>

//           <Grid item xs={12}>
//             <Button
//               variant="contained"
//               color="primary"
//               onClick={handleSubmit}
//               fullWidth
//             >
//               Submit
//             </Button>
//           </Grid>
//         </Grid>
//       </form>
//     </Container>
//   );
// };

// export default Referral;
