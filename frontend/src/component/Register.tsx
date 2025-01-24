import React, { isValidElement, useState } from "react";
import TextField from "@mui/material/TextField";
import {
  Button,
  FormControl,
  FormHelperText,
  IconButton,
  InputAdornment,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../store/store";
import { registerEmployee } from "../store/employeeSlice.tsx";

interface formValues {
  employeeFirstName: string;
  employeeLastName: string;
  employeeEmail: string;
  employeePassword: string;
  employeePhoneNumber: number;
  employeeGender: string;
  employeeDesignation: string;
}

interface ErrorValue {
  employeeFirstName: string;
  employeeLastName: string;
  employeeEmail: string;
  employeePassword: string;
  employeePhoneNumber: string;
  employeeGender: string;
  employeeDesignation: string;
}

const Register = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const [formValue, setFormValue] = useState<formValues>({
    employeeFirstName: "",
    employeeLastName: "",
    employeeEmail: "",
    employeePassword: "",
    employeePhoneNumber: 0,
    employeeGender: "",
    employeeDesignation: "",
  });

  const [error, setError] = useState<ErrorValue>({
    employeeFirstName: "",
    employeeLastName: "",
    employeeEmail: "",
    employeePassword: "",
    employeePhoneNumber: "",
    employeeGender: "",
    employeeDesignation: "",
  });

  const [showPassword, setShowPassword] = useState<boolean>(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    // console.log(name, value, e.target.value);
    if (name === "employeePhoneNumber") {
      // console.log("Ho");
      setFormValue({ ...formValue, [name]: Number(value) });
    } else {
      setFormValue({ ...formValue, [name]: value });
    }

    setError({ ...error, [name]: "" });
  };

  const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    const { name } = e.target;
    setError((prev) => ({ ...prev, [name]: "" }));
  };

  //**to check the validation in the form field */
  const validate = (): boolean => {
    let valid = true;
    const newErrors = {
      employeeFirstName: "",
      employeeLastName: "",
      employeeEmail: "",
      employeePassword: "",
      employeePhoneNumber: "",
      employeeGender: "",
      employeeDesignation: "",
    };
    const emailRegex = /^[a-zA-Z0-9-.*%+]+@[a-zA-Z0-9+-.]+\.[a-zA-z]{2,3}$/g;
    if (
      !formValue.employeeFirstName ||
      formValue.employeeFirstName.length < 4
    ) {
      newErrors.employeeFirstName =
        "First name must be at least 4 characters long";
      valid = false;
    }
    if (!formValue.employeeLastName || formValue.employeeLastName.length < 4) {
      newErrors.employeeLastName =
        "Last name must be at least 4 characters long";
      valid = false;
    }
    if (!formValue.employeeEmail || !emailRegex.test(formValue.employeeEmail)) {
      newErrors.employeeEmail = "Invalid email address";
      valid = false;
    }
    if (
      !formValue.employeePassword ||
      formValue.employeePassword.length < 5 ||
      formValue.employeePassword.length > 15
    ) {
      newErrors.employeePassword =
        "Password must be between 5 and 15 characters long";
      valid = false;
    }
    if (
      !formValue.employeePhoneNumber ||
      isNaN(formValue.employeePhoneNumber)
    ) {
      newErrors.employeePhoneNumber = "Invalid phone number";
      valid = false;
    }
    if (!formValue.employeeGender) {
      newErrors.employeeGender = "Select a gender";
      valid = false;
    }
    if (!formValue.employeeDesignation) {
      newErrors.employeeDesignation = "Select a designation";
      valid = false;
    }
    setError(newErrors);
    return valid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      // console.log("Successfully", formValue);

      dispatch(registerEmployee({ payload: formValue, navigate }));
    }
  };
  return (
    <form onSubmit={handleSubmit} method="post">
      <TextField
        name="employeeFirstName"
        value={formValue.employeeFirstName}
        onChange={handleInputChange}
        fullWidth
        id="outlined-error-helper-text"
        label="First Name"
        error={Boolean(error.employeeFirstName)}
        helperText={error.employeeFirstName}
        onFocus={handleFocus}
        margin="normal"
        placeholder="Enter your first name"
      />
      <TextField
        name="employeeLastName"
        onChange={handleInputChange}
        fullWidth
        id="outlined-error-helper-text"
        label="Last Name"
        margin="normal"
        error={Boolean(error.employeeLastName)}
        helperText={error.employeeLastName}
        onFocus={handleFocus}
        placeholder="Enter your last name"
      />
      <TextField
        name="employeeEmail"
        onChange={handleInputChange}
        fullWidth
        id="outlined-error-helper-text"
        label="Email"
        margin="normal"
        onFocus={handleFocus}
        placeholder="Enter your email"
        error={Boolean(error.employeeEmail)}
        helperText={error.employeeEmail}
      />

      <TextField
        name="employeePassword"
        onChange={handleInputChange}
        fullWidth
        id="outlined-error-helper-text"
        label="Password"
        placeholder="Enter your password"
        type={showPassword ? "text" : "password"}
        margin="normal"
        onFocus={handleFocus}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton onClick={() => setShowPassword((prev) => !prev)}>
                {showPassword ? <Visibility /> : <VisibilityOff />}
              </IconButton>
            </InputAdornment>
          ),
        }}
        error={Boolean(error.employeePassword)}
        helperText={error.employeePassword}
      />
      <TextField
        name="employeePhoneNumber"
        onChange={handleInputChange}
        fullWidth
        id="outlined-error-helper-text"
        label="Contact Number"
        placeholder="Enter your contact number"
        margin="normal"
        onFocus={handleFocus}
        error={Boolean(error.employeePhoneNumber)}
        helperText={error.employeePhoneNumber}
      />

      <FormControl
        sx={{ minWidth: 300, width: "100%" }}
        error={Boolean(error.employeeGender)}
        margin="normal"
      >
        <InputLabel id="demo-simple-select-error-label">Gender</InputLabel>
        <Select
          name="employeeGender"
          labelId="demo-simple-select-error-label"
          id="demo-simple-select-error"
          value={formValue.employeeGender}
          label="Gender"
          onChange={(e) =>
            setFormValue({ ...formValue, employeeGender: e.target.value })
          }
          onFocus={(e) => setError((prev) => ({ ...prev, employeeGender: "" }))}
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          <MenuItem value={"male"}>Male</MenuItem>
          <MenuItem value={"female"}>Female</MenuItem>
          <MenuItem value={"other"}>Other</MenuItem>
        </Select>
        <FormHelperText>{error.employeeGender}</FormHelperText>
      </FormControl>
      <FormControl
        sx={{ minWidth: 300, width: "100%" }}
        error={Boolean(error.employeeDesignation)}
        margin="normal"
      >
        <InputLabel id="demo-simple-select-error-label">Designation</InputLabel>
        <Select
          name="employeeDesignation"
          labelId="demo-simple-select-error-label"
          id="demo-simple-select-error"
          value={formValue.employeeDesignation}
          label="Designation"
          onChange={(e) => {
            setFormValue((prev) => ({
              ...prev,
              employeeDesignation: e.target.value,
            }));
          }}
          onFocus={(e) =>
            setError((prev) => ({ ...prev, employeeDesignation: "" }))
          }
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          <MenuItem value={"engineer"}>Engineer</MenuItem>
          <MenuItem value={"manager"}>Manager</MenuItem>
          <MenuItem value={"hr"}>Hr</MenuItem>
          <MenuItem value={"trainee"}>Trainee</MenuItem>
        </Select>
        <FormHelperText>{error.employeeDesignation}</FormHelperText>
      </FormControl>
      <Button
        type="submit"
        fullWidth
        variant="contained"
        color="primary"
        sx={{ mt: 2 }}
      >
        Register
      </Button>
    </form>
  );
};

export default Register;
