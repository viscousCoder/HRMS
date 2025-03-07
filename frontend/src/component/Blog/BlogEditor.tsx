// import { Box, Button, Card, Typography } from "@mui/material";
// import React, { useState } from "react";
// import "froala-editor/css/froala_style.min.css";
// import "froala-editor/css/froala_editor.pkgd.min.css";

// import "froala-editor/js/plugins.pkgd.min.js";

// import FroalaEditorComponent from "react-froala-wysiwyg";
// import FroalaEditorView from "react-froala-wysiwyg/FroalaEditorView";
// import { useDispatch } from "react-redux";
// import { AppDispatch } from "../../store/store.tsx";
// import { postBlog } from "../../store/employeeSlice.tsx";
// import { useNavigate } from "react-router-dom";

// const BlogEditor = () => {
//   const dispatch = useDispatch<AppDispatch>();
//   const navigate = useNavigate();

//   const [model, setModel] = useState("Example Set");
//   const [newData, setNewData] = useState("Hello");
//   const [isClicked, setIsClicked] = useState(false);
//   console.log(newData, "Amana");
//   const handleModelChange = (event) => {
//     setModel(event);
//   };

//   let config = {
//     heightMin: 300,
//     placeholderText: "Edit Your Content Here!",
//     charCounterCount: false,
//     events: {
//       //   contentChanged: function (e, editor) {
//       //     console.log("test", e, editor.html.get());
//       //     // // setModel(e);
//       //     // handleModelChange(e);
//       //     handleModelChange(editor.html.get()); // Get content as HTML
//       //   },
//     },
//   };
//   //   console.log(model);
//   const handleBlob = (datas) => {
//     // console.log(datas, "here");
//     let blob = new Blob([datas], { type: "text/html" });

//     // console.log(blob);

//     let blobURL = URL.createObjectURL(blob);
//     console.log("Data convert into blob url", blobURL);

//     //blob to data
//     // let reader = new FileReader();
//     // reader.onload = () => {
//     //   let originalData = reader.result;
//     //   console.log("Original data from Blob:", originalData);
//     //   let container = document.getElementById("container");
//     //   container.innerHTML = originalData;
//     // };

//     // reader.readAsText(blob);

//     //bloburl to data
//     // console.log("blobUrl", blobURL);
//     fetch(blobURL)
//       .then((response) => response.text())
//       .then((data) => {
//         console.log("Data from Blob URL:", data);
//         setNewData(data);
//       })
//       .catch((error) => {
//         console.error("Error fetching Blob URL:", error);
//       });
//     setIsClicked((prev) => !prev);
//   };

//   // const handleSubmit = (datas) => {
//   //   let blob = new Blob([datas], { type: "text/html" });

//   //   // console.log(blob);

//   //   let blobURL = URL.createObjectURL(blob);
//   //   fetch(blobURL)
//   //     .then((response) => response.text())
//   //     .then((data) => {
//   //       console.log("Data from Blob URL:", data);
//   //       setNewData(data);
//   //     })
//   //     .catch((error) => {
//   //       console.error("Error fetching Blob URL:", error);
//   //     });
//   //   console.log("Data convert into blob url", blobURL);
//   //   dispatch(postBlog({ payload: blobURL, navigate }));
//   // };
//   const handleSubmit = (datas) => {
//     let blob = new Blob([datas], { type: "text/html" });

//     // Create a FileReader to read the Blob as a Data URL (Base64)
//     let reader = new FileReader();

//     reader.onloadend = () => {
//       // The result could be a string or ArrayBuffer. Ensure it's a string before using it.
//       if (typeof reader.result === "string") {
//         let base64String = reader.result; // This is now safely a string

//         console.log("Data converted into Base64:", base64String);
//         setNewData(base64String);

//         // Dispatch the Base64 string instead of the Blob URL
//         dispatch(postBlog({ payload: base64String, navigate }));
//       } else {
//         console.error("Error: FileReader result is not a string");
//       }
//     };

//     // Read the Blob as a Data URL
//     reader.readAsDataURL(blob);
//     setIsClicked((prev) => !prev);
//   };

//   // const handleSubmit = (datas) => {
//   //   let blob = new Blob([datas], { type: "text/html" });

//   //   // Create a FileReader to read the Blob as a Data URL (Base64)
//   //   let reader = new FileReader();

//   //   reader.onloadend = () => {
//   //     // The result will contain the Base64 string
//   //     let base64String = reader.result;

//   //     console.log("Data converted into Base64:", base64String);
//   //     // setNewData(base64String);

//   //     // Dispatch the Base64 string instead of the Blob URL
//   //     dispatch(postBlog({ payload: base64String, navigate }));
//   //   };

//   //   // Read the Blob as a Data URL
//   //   reader.readAsDataURL(blob);
//   // };

//   return (
//     <Box>
//       <Card
//         sx={{
//           //   boxShadow:
//           //     "rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px, rgba(10, 37, 64, 0.35) 0px -2px 6px 0px inset",
//           minHeight: "100px",
//           p: "0px",
//         }}
//       >
//         <FroalaEditorComponent
//           tag="textarea"
//           config={config}
//           onModelChange={handleModelChange}
//         />
//       </Card>
//       {/* <FroalaEditorView model={model} /> */}
//       <Box sx={{ m: 2 }} />
//       {/* <button onClick={() => handleBlob(model)}>Convert </button> */}
//       <Button
//         onClick={() => handleBlob(model)}
//         variant="contained"
//         sx={{
//           boxShadow:
//             "rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px, rgba(10, 37, 64, 0.35) 0px -2px 6px 0px inset",
//         }}
//       >
//         See Preview
//       </Button>
//       <Button
//         onClick={() => handleSubmit(model)}
//         variant="contained"
//         sx={{
//           marginLeft: "10px",
//           boxShadow:
//             "rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px, rgba(10, 37, 64, 0.35) 0px -2px 6px 0px inset",
//         }}
//       >
//         Submit
//       </Button>
//       <Box sx={{ m: 10 }} />
//       <Card
//         sx={{
//           display: isClicked ? "block" : "none",
//           boxShadow:
//             "rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px, rgba(10, 37, 64, 0.35) 0px -2px 6px 0px inset",
//           minHeight: "100px",
//           p: "10px",
//         }}
//       >
//         <FroalaEditorView model={newData} />
//       </Card>
//     </Box>
//   );
// };

// export default BlogEditor;

import { Box, Button, Card } from "@mui/material";
import React, { useState } from "react";
import "froala-editor/css/froala_style.min.css";
import "froala-editor/css/froala_editor.pkgd.min.css";
import "froala-editor/js/plugins.pkgd.min.js";
import FroalaEditorComponent from "react-froala-wysiwyg";
import FroalaEditorView from "react-froala-wysiwyg/FroalaEditorView";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../store/store.tsx";
import { postBlog } from "../../store/employeeSlice.tsx";
import { useNavigate } from "react-router-dom";

const BlogEditor = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const [model, setModel] = useState("");
  const [newData, setNewData] = useState("");
  const [isClicked, setIsClicked] = useState(false);

  const handleModelChange = (event) => {
    setModel(event);
  };

  const handleImageUpload = (files) => {
    const file = files[0];
    const reader = new FileReader();
    reader.onload = (event) => {
      const base64String = event.target.result; // e.g., "data:image/png;base64,iVBORw0KGgo..."
      const imgTag = `<img src="${base64String}" style="width: 300px;" class="fr-fic fr-dib">`;
      setModel((prevModel) => `${prevModel}<p>${imgTag}</p>`);
    };
    reader.readAsDataURL(file);
    return false; // Prevent Froala's default upload behavior
  };

  const config = {
    heightMin: 300,
    placeholderText: "Edit Your Content Here!",
    charCounterCount: false,
    imageUpload: false,
    events: {
      "image.beforeUpload": handleImageUpload, // Intercept image uploads
    },
  };

  const handlePreview = () => {
    setNewData(model);
    setIsClicked((prev) => !prev);
  };

  const handleSubmit = () => {
    // Convert the entire HTML content to base64 for the backend
    const base64Data = `data:text/html;base64,${btoa(model)}`;
    console.log("Submitting base64 data:", base64Data);

    // Dispatch to the backend
    dispatch(postBlog({ payload: base64Data, navigate }));
    setIsClicked(false); // Hide preview after submission
  };

  return (
    <Box>
      <Card sx={{ minHeight: "100px", p: "0px" }}>
        <FroalaEditorComponent
          tag="textarea"
          config={config}
          model={model}
          onModelChange={handleModelChange}
        />
      </Card>
      <Box sx={{ m: 2 }} />
      <Button
        onClick={handlePreview}
        variant="contained"
        sx={{
          boxShadow:
            "rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px, rgba(10, 37, 64, 0.35) 0px -2px 6px 0px inset",
        }}
      >
        See Preview
      </Button>
      <Button
        onClick={handleSubmit}
        variant="contained"
        sx={{
          marginLeft: "10px",
          boxShadow:
            "rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px, rgba(10, 37, 64, 0.35) 0px -2px 6px 0px inset",
        }}
      >
        Submit
      </Button>
      <Box sx={{ m: 10 }} />
      <Card
        sx={{
          display: isClicked ? "block" : "none",
          boxShadow:
            "rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px, rgba(10, 37, 64, 0.35) 0px -2px 6px 0px inset",
          minHeight: "100px",
          p: "10px",
        }}
      >
        <FroalaEditorView model={newData} />
      </Card>
    </Box>
  );
};

export default BlogEditor;
