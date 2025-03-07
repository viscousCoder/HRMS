import React, { useEffect, useState } from "react";
import {
  TextField,
  Button,
  Autocomplete,
  FormHelperText,
  FormControl,
  Box,
} from "@mui/material";
import dayjs from "dayjs";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../store/store.tsx";
import {
  handleCreateTodo,
  handleUpdateTodo,
} from "../../store/employeeSlice.tsx"; // Import update action
import { useNavigate } from "react-router-dom";

const statusOptions = ["Pending", "Progress", "Completed"];
const priorityOptions = ["Low", "Medium", "High"];

const TodoForm: React.FC<{
  handleCloseDialog: () => void;
  selectedTodo?: any;
  setToggle?: any;
}> = ({ handleCloseDialog, selectedTodo, setToggle }) => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const initialFormState = {
    title: "",
    description: "",
    due_date: "",
    status: "",
    priority: "",
  };

  const [form, setForm] = useState(initialFormState);
  const [errors, setErrors] = useState(initialFormState);

  useEffect(() => {
    if (selectedTodo) {
      setForm({
        ...selectedTodo,
        due_date: dayjs(selectedTodo.due_date).format("YYYY-MM-DD"), // Format due_date correctly
      });
    } else {
      setForm(initialFormState);
    }
  }, [selectedTodo]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleAutocompleteChange = (name: string, value: string | null) => {
    setForm({ ...form, [name]: value || "" });
  };

  const validateForm = () => {
    let isValid = true;
    const newErrors = {
      title: "",
      description: "",
      due_date: "",
      status: "",
      priority: "",
    };

    if (!form.title.trim()) {
      newErrors.title = "Title is required";
      isValid = false;
    }

    if (!form.description.trim()) {
      newErrors.description = "Description is required";
      isValid = false;
    }

    if (!form.due_date) {
      newErrors.due_date = "Due date is required";
      isValid = false;
    } else if (dayjs(form.due_date).isBefore(dayjs(), "day")) {
      newErrors.due_date = "Due date cannot be in the past";
      isValid = false;
    }

    if (!form.status) {
      newErrors.status = "Status is required";
      isValid = false;
    }

    if (!form.priority) {
      newErrors.priority = "Priority is required";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    if (selectedTodo) {
      // If editing, call update API
      await dispatch(handleUpdateTodo({ payload: form }));

      // dispatch(handleUpdateTodo({ payload: form }));

      console.log(form, "hello", selectedTodo);
    } else {
      // If creating, call create API
      await dispatch(handleCreateTodo({ payload: form }));
    }

    console.log("Todo Task Submitted:", form);
    handleCloseDialog();
    setToggle((prev) => !prev);

    // Reset form after submission
    setForm(initialFormState);
    setErrors(initialFormState);
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        margin: "auto",
        display: "flex",
        flexDirection: "column",
        gap: 16,
      }}
    >
      <TextField
        label="Title"
        name="title"
        value={form.title}
        onChange={handleChange}
        error={!!errors.title}
        helperText={errors.title}
        fullWidth
      />

      <TextField
        label="Short Description"
        name="description"
        value={form.description}
        onChange={handleChange}
        error={!!errors.description}
        helperText={errors.description}
        multiline
        rows={3}
        fullWidth
      />

      <TextField
        label="Due Date"
        type="date"
        name="due_date"
        value={form.due_date}
        onChange={handleChange}
        InputLabelProps={{ shrink: true }}
        error={!!errors.due_date}
        helperText={errors.due_date}
        fullWidth
      />

      <FormControl fullWidth error={!!errors.status}>
        <Autocomplete
          options={statusOptions}
          value={form.status || null}
          onChange={(_, newValue) =>
            handleAutocompleteChange("status", newValue)
          }
          renderInput={(params) => <TextField {...params} label="Status" />}
        />
        <FormHelperText>{errors.status}</FormHelperText>
      </FormControl>

      <FormControl fullWidth error={!!errors.priority}>
        <Autocomplete
          options={priorityOptions}
          value={form.priority || null}
          onChange={(_, newValue) =>
            handleAutocompleteChange("priority", newValue)
          }
          renderInput={(params) => <TextField {...params} label="Priority" />}
        />
        <FormHelperText>{errors.priority}</FormHelperText>
      </FormControl>

      <Box sx={{ display: "flex", justifyContent: "right" }}>
        <Button onClick={handleCloseDialog} color="error">
          Cancel
        </Button>
        <Button type="submit" variant="contained" color="primary">
          {selectedTodo ? "Update" : "Submit"}
        </Button>
      </Box>
    </form>
  );
};

export default TodoForm;

// import React, { useEffect, useState } from "react";
// import {
//   TextField,
//   Button,
//   Autocomplete,
//   FormHelperText,
//   FormControl,
//   Box,
// } from "@mui/material";
// import dayjs from "dayjs";
// import { useDispatch } from "react-redux";
// import { AppDispatch } from "../../store/store.tsx";
// import { handleCreateTodo } from "../../store/employeeSlice.tsx";
// import { useNavigate } from "react-router-dom";

// const statusOptions = ["Not Progress", "Progress", "Completed"];
// const priorityOptions = ["Low", "Medium", "High"];

// const TodoForm: React.FC<{
//   handleCloseDialog: () => void;
//   selectedTodo?: any;
// }> = ({ handleCloseDialog, selectedTodo }) => {
//   console.log(selectedTodo);
//   const dispatch = useDispatch<AppDispatch>();
//   const navigate = useNavigate();
//   const initialFormState = {
//     title: "",
//     description: "",
//     due_date: "",
//     status: "",
//     priority: "",
//   };

//   const [form, setForm] = useState(initialFormState);
//   const [errors, setErrors] = useState(initialFormState);

//   useEffect(() => {
//     if (selectedTodo) {
//       setForm(selectedTodo); // Populate form when editing
//     } else {
//       setForm(initialFormState); // Reset form when adding a new todo
//     }
//   }, [selectedTodo]);

//   const handleChange = (
//     e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
//   ) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

//   const handleAutocompleteChange = (name: string, value: string | null) => {
//     setForm({ ...form, [name]: value || "" });
//   };

//   const validateForm = () => {
//     let isValid = true;
//     const newErrors = {
//       title: "",
//       description: "",
//       due_date: "",
//       status: "",
//       priority: "",
//     };

//     if (!form.title.trim()) {
//       newErrors.title = "Title is required";
//       isValid = false;
//     }

//     if (!form.description.trim()) {
//       newErrors.description = "Description is required";
//       isValid = false;
//     }

//     if (!form.due_date) {
//       newErrors.due_date = "Due date is required";
//       isValid = false;
//     } else if (dayjs(form.due_date).isBefore(dayjs(), "day")) {
//       newErrors.due_date = "Due date cannot be in the past";
//       isValid = false;
//     }

//     if (!form.status) {
//       newErrors.status = "Status is required";
//       isValid = false;
//     }

//     if (!form.priority) {
//       newErrors.priority = "Priority is required";
//       isValid = false;
//     }

//     setErrors(newErrors);
//     return isValid;
//   };

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();

//     if (!validateForm()) return;
//     dispatch(handleCreateTodo({ payload: form, navigate }));
//     console.log("Todo Task Submitted:", form);
//     handleCloseDialog();

//     // Reset the form after submission
//     setForm(initialFormState);
//     setErrors(initialFormState);
//   };

//   return (
//     <form
//       onSubmit={handleSubmit}
//       style={{
//         margin: "auto",
//         display: "flex",
//         flexDirection: "column",
//         gap: 16,
//       }}
//     >
//       <TextField
//         label="Title"
//         name="title"
//         value={form.title}
//         onChange={handleChange}
//         error={!!errors.title}
//         helperText={errors.title}
//         fullWidth
//       />

//       <TextField
//         label="Short Description"
//         name="description"
//         value={form.description}
//         onChange={handleChange}
//         error={!!errors.description}
//         helperText={errors.description}
//         multiline
//         rows={3}
//         fullWidth
//       />

//       <TextField
//         label="Due Date"
//         type="date"
//         name="due_date"
//         value={form.due_date}
//         onChange={handleChange}
//         InputLabelProps={{ shrink: true }}
//         error={!!errors.due_date}
//         helperText={errors.due_date}
//         fullWidth
//       />

//       <FormControl fullWidth error={!!errors.status}>
//         <Autocomplete
//           options={statusOptions}
//           value={form.status || null}
//           onChange={(_, newValue) =>
//             handleAutocompleteChange("status", newValue)
//           }
//           renderInput={(params) => <TextField {...params} label="Status" />}
//         />
//         <FormHelperText>{errors.status}</FormHelperText>
//       </FormControl>

//       <FormControl fullWidth error={!!errors.priority}>
//         <Autocomplete
//           options={priorityOptions}
//           value={form.priority || null}
//           onChange={(_, newValue) =>
//             handleAutocompleteChange("priority", newValue)
//           }
//           renderInput={(params) => <TextField {...params} label="Priority" />}
//         />
//         <FormHelperText>{errors.priority}</FormHelperText>
//       </FormControl>

//       <Box sx={{ display: "flex", justifyContent: "right" }}>
//         <Button onClick={() => handleCloseDialog()} color="error">
//           Cancel
//         </Button>
//         <Button type="submit" variant="contained" color="primary">
//           Submit
//         </Button>
//       </Box>
//     </form>
//   );
// };

// export default TodoForm;
