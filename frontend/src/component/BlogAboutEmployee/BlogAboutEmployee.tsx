import {
  Box,
  Button,
  Card,
  Dialog,
  DialogTitle,
  DialogContent,
  Typography,
  IconButton,
} from "@mui/material";
import React, { useState, useRef, useEffect } from "react";
import "froala-editor/css/froala_style.min.css";
import "froala-editor/css/froala_editor.pkgd.min.css";
import "froala-editor/js/plugins.pkgd.min.js";
import FroalaEditorComponent from "react-froala-wysiwyg";
import FroalaEditorView from "react-froala-wysiwyg/FroalaEditorView";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store/store.tsx";
import { getAllEmployee, postBlog } from "../../store/employeeSlice.tsx";
import Loading from "../Loading/Loading.tsx";
import { useNavigate } from "react-router-dom";
import CloseIcon from "@mui/icons-material/Close";

const BlogAboutEmployee = () => {
  const employeeList = useSelector<RootState>(
    (state) => state.employee.allEmployee
  );
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const [model, setModel] = useState("");
  const [newData, setNewData] = useState("");
  const [isClicked, setIsClicked] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [suggestionPosition, setSuggestionPosition] = useState({
    top: 0,
    left: 0,
  });
  const [employeeData, setEmployeeData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [openDialog, setOpenDialog] = useState(false); // State for dialog visibility
  const [selectedEmployee, setSelectedEmployee] = useState(null); // State for selected employee

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsLoading(true);
      dispatch(getAllEmployee(token))
        .then((res) => {
          console.log("API Response:", res.payload);
          setEmployeeData(res.payload || []);
        })
        .catch((err) => {
          console.error("Error fetching employees:", err);
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  }, [dispatch]);

  const editorRef = useRef(null);
  console.log(editorRef, "useRef", employeeList, employeeData);

  const handleModelChange = (content) => {
    setModel(content);
  };

  const handleKeyUp = (e) => {
    const editor = editorRef.current.editor;
    console.log(editor, "inside handleKey", employeeList, employeeData);

    if (!employeeData || employeeData.length === 0) {
      setShowSuggestions(false);
      return;
    }

    const content = editor.selection.get().anchorNode?.textContent || "";
    const selection = editor.selection.get();
    const cursorPosition = selection.focusOffset;
    const lastAtIndex = content.lastIndexOf("@", cursorPosition);

    if (lastAtIndex !== -1) {
      const query = content.substring(lastAtIndex + 1).split(" ")[0];
      const filtered = employeeData.filter((emp) =>
        emp.employeefirstname.toLowerCase().startsWith(query.toLowerCase())
      );

      if (filtered.length > 0) {
        setSuggestions(filtered);
        setShowSuggestions(true);
        const range = selection.getRangeAt(0);
        const rect = range.getBoundingClientRect();
        const editorRect =
          editorRef.current.editor.$el[0].getBoundingClientRect();
        setSuggestionPosition({
          top: rect.bottom - editorRect.top + 10,
          left: rect.left - editorRect.left,
        });
      } else {
        setShowSuggestions(false);
      }
    } else {
      setShowSuggestions(false);
    }
  };

  const insertMention = (employee) => {
    const editor = editorRef.current.editor;
    console.log(editor, "inside Insert");
    editor.selection.save();
    const selection = editor.selection.get();
    const cursorPosition = selection.focusOffset;
    let content = selection.anchorNode?.textContent || "";
    const lastAtIndex = content.lastIndexOf("@", cursorPosition);

    if (lastAtIndex !== -1) {
      const newText =
        content.substring(0, lastAtIndex) + content.substring(cursorPosition);
      selection.anchorNode.textContent = newText;
      editor.selection.restore();
    }

    // Use a span with a data attribute instead of an href
    const mentionHTML = `<span contenteditable="false" class="employee-mention" data-id="${employee.id}">@${employee.employeefirstname} ${employee.employeelastname}</span> `;
    editor.html.insert(mentionHTML);
    setModel(editor.html.get());
    setShowSuggestions(false);
  };

  const handleImageUpload = (files) => {
    const file = files[0];
    const reader = new FileReader();
    reader.onload = (event) => {
      const base64String = event.target.result;
      const imgTag = `<img src="${base64String}" style="width: 300px;" class="fr-fic fr-dib">`;
      setModel((prevModel) => `${prevModel}<p>${imgTag}</p>`);
    };
    reader.readAsDataURL(file);
    return false;
  };

  const config = {
    heightMin: 300,
    placeholderText: "Edit Your Content Here!",
    charCounterCount: false,
    events: {
      keyup: handleKeyUp,
      "image.beforeUpload": handleImageUpload,
    },
  };

  const handlePreview = () => {
    setNewData(model);
    setIsClicked((prev) => !prev);
  };

  const handleSubmit = () => {
    const base64Data = `data:text/html;base64,${btoa(model)}`;
    console.log("Submitting base64 data:", base64Data);
    dispatch(postBlog({ payload: base64Data, navigate }));
    setIsClicked(false);
  };

  // Handle mention click in preview
  const handleMentionClick = (e) => {
    const target = e.target;
    if (target.classList.contains("employee-mention")) {
      const employeeId = target.getAttribute("data-id");
      const employee = employeeData.find(
        (emp) => emp.id === parseInt(employeeId)
      );
      if (employee) {
        setSelectedEmployee(employee);
        setOpenDialog(true);
      }
    }
  };

  // Close dialog
  const handleCloseDialog = () => {
    setOpenDialog(false);
    setTimeout(() => {
      setSelectedEmployee(null);
    }, 200);
    // setSelectedEmployee(null);
  };

  if (isLoading) {
    return (
      <div>
        <Loading />
      </div>
    );
  }

  return (
    <Box sx={{ position: "relative" }}>
      <Card sx={{ minHeight: "100px", p: "0px" }}>
        <FroalaEditorComponent
          tag="textarea"
          config={config}
          model={model}
          onModelChange={handleModelChange}
          ref={editorRef}
        />
      </Card>

      {showSuggestions && (
        <Box
          sx={{
            position: "absolute",
            top: suggestionPosition.top,
            left: suggestionPosition.left,
            zIndex: 1000,
            background: "#fff",
            border: "1px solid #ccc",
            borderRadius: "4px",
            maxHeight: "150px",
            overflowY: "auto",
            boxShadow: "0px 2px 8px rgba(0, 0, 0, 0.15)",
          }}
        >
          {suggestions.map((emp) => (
            <Box
              key={emp.id}
              sx={{
                padding: "8px",
                cursor: "pointer",
                "&:hover": { background: "#f0f0f0" },
              }}
              onClick={() => insertMention(emp)}
            >
              {emp.employeefirstname} {emp.employeelastname}
            </Box>
          ))}
        </Box>
      )}

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
      <Box sx={{ m: 2 }} />
      {isClicked && (
        <Card
          sx={{
            minHeight: "100px",
            p: "10px",
            boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
          }}
          onClick={handleMentionClick} // Add click handler to preview
        >
          <FroalaEditorView model={newData} />
        </Card>
      )}

      {/* Dialog for employee details */}
      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>
          Employee Details
          <IconButton
            edge="end"
            color="inherit"
            onClick={handleCloseDialog}
            aria-label="close"
            sx={{ position: "absolute", right: 8, top: 8 }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          {selectedEmployee ? (
            <>
              <Typography>
                <strong>Name:</strong> {selectedEmployee.employeefirstname}{" "}
                {selectedEmployee.employeelastname}
              </Typography>
              <Typography>
                <strong>ID:</strong> {selectedEmployee.id}
              </Typography>
              {/* Add more employee details as needed */}
              <Typography>
                <strong>Email:</strong>{" "}
                {selectedEmployee.employeeemail || "N/A"}
              </Typography>
            </>
          ) : (
            <Typography>No employee selected</Typography>
          )}
        </DialogContent>
      </Dialog>

      <style>{`
        .employee-mention {
          color: #1976d2;
          text-decoration: none;
          cursor: pointer;
        }
        .employee-mention:hover::after {
          content: "ID: " attr(data-id);
          position: absolute;
          background: #333;
          color: #fff;
          padding: 4px 8px;
          border-radius: 3px;
          font-size: 12px;
        }
      `}</style>
    </Box>
  );
};

export default BlogAboutEmployee;
