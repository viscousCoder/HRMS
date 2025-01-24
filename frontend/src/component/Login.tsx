import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import { Button, IconButton, InputAdornment } from "@mui/material";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../store/store";
import { useNavigate } from "react-router-dom";
import { loginEmployee } from "../store/employeeSlice.tsx";
import { Visibility, VisibilityOff } from "@mui/icons-material";

interface formValueType {
  employeeEmail: string;
  employeePassword: string;
}
const Login = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [formValue, setFormValue] = useState<formValueType>({
    employeeEmail: "",
    employeePassword: "",
  });

  const [error, setError] = useState<formValueType>({
    employeeEmail: "",
    employeePassword: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormValue((prev) => ({ ...prev, [name]: value }));
    setError((prev) => ({ ...prev, [name]: "" }));
  };
  const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    const { name } = e.target;
    setError((prev) => ({ ...prev, [name]: "" }));
  };
  const isValid = () => {
    let valid = true;
    const newErrors = {
      employeeEmail: "",
      employeePassword: "",
    };
    const emailRegex = /^[a-zA-Z0-9-%.+]+@[a-zA-Z0-9-.+%]+\.[a-zA-Z]{2,3}$/g;
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
    setError(newErrors);
    return valid;
  };
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isValid()) {
      console.log(formValue);
      dispatch(loginEmployee({ payload: formValue, navigate }));
    }
  };
  return (
    <form onSubmit={handleSubmit} method="post">
      <TextField
        value={formValue.employeeEmail}
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

export default Login;
