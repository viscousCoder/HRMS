import { Box, Button, Card, Typography } from "@mui/material";
import React, { useState } from "react";
import "froala-editor/css/froala_style.min.css";
import "froala-editor/css/froala_editor.pkgd.min.css";

import "froala-editor/js/plugins.pkgd.min.js";

import FroalaEditorComponent from "react-froala-wysiwyg";
import FroalaEditorView from "react-froala-wysiwyg/FroalaEditorView";

const BlogEditor = () => {
  const [model, setModel] = useState("Example Set");
  const [newData, setNewData] = useState("Hello");
  const [isClicked, setIsClicked] = useState(false);

  const handleModelChange = (event) => {
    setModel(event);
  };

  let config = {
    heightMin: 300,
    placeholderText: "Edit Your Content Here!",
    charCounterCount: false,
    events: {
      //   contentChanged: function (e, editor) {
      //     console.log("test", e, editor.html.get());
      //     // // setModel(e);
      //     // handleModelChange(e);
      //     handleModelChange(editor.html.get()); // Get content as HTML
      //   },
    },
  };
  //   console.log(model);
  const handleBlob = (datas) => {
    let blob = new Blob([datas], { type: "text/html" });

    // console.log(blob);

    let blobURL = URL.createObjectURL(blob);
    console.log("Data convert into blob url", blobURL);

    //blob to data
    // let reader = new FileReader();
    // reader.onload = () => {
    //   let originalData = reader.result;
    //   console.log("Original data from Blob:", originalData);
    //   let container = document.getElementById("container");
    //   container.innerHTML = originalData;
    // };

    // reader.readAsText(blob);

    //bloburl to data
    fetch(blobURL)
      .then((response) => response.text())
      .then((data) => {
        console.log("Data from Blob URL:", data);
        setNewData(data);
      })
      .catch((error) => {
        console.error("Error fetching Blob URL:", error);
      });
    setIsClicked((prev) => !prev);
  };
  return (
    <Box>
      <Card
        sx={{
          //   boxShadow:
          //     "rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px, rgba(10, 37, 64, 0.35) 0px -2px 6px 0px inset",
          minHeight: "100px",
          p: "0px",
        }}
      >
        <FroalaEditorComponent
          tag="textarea"
          config={config}
          onModelChange={handleModelChange}
        />
      </Card>
      {/* <FroalaEditorView model={model} /> */}
      <Box sx={{ m: 10 }} />
      {/* <button onClick={() => handleBlob(model)}>Convert </button> */}
      <Button
        onClick={() => handleBlob(model)}
        variant="contained"
        // sx={{
        //   boxShadow:
        //     "rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px, rgba(10, 37, 64, 0.35) 0px -2px 6px 0px inset",
        // }}
      >
        See Preview
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
