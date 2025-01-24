import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";
import { APP_URL } from "../common/Constant.ts";

const apiUrl = APP_URL;

export interface formValues {
  employeeFirstName: string;
  employeeLastName: string;
  employeeEmail: string;
  employeePassword: string;
  employeePhoneNumber: number;
  employeeGender: string;
  employeeDesignation: string;
}
interface login {
  employeeEmail: string;
  employeePassword: string;
}

const initialState = {
  loading: false,
  user: {},
  error: "",
};

export const employeeSlice = createSlice({
  name: "employee",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(registerEmployee.pending, (state) => {
        state.loading = true;
      })
      .addCase(registerEmployee.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(registerEmployee.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "something wnet wrong";
      })
      .addCase(loginEmployee.pending, (state) => {
        state.loading = true;
        state.user = {};
      })
      .addCase(loginEmployee.fulfilled, (state, action) => {
        console.log(action, "hii", action.payload);
        state.loading = false;
        state.user = action.payload;
        toast.success("Login Successful");
      })
      .addCase(loginEmployee.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "something wnet wrong";
        toast.error(action.error.message);
        state.user = {};
      })
      .addCase(getDetails.pending, (state) => {
        state.loading = true;
        state.user = {};
      })
      .addCase(getDetails.fulfilled, (state, action) => {
        console.log(action, "hii", action.payload);
        state.loading = false;
        state.user = action.payload;
        toast.success("User Successful");
      })
      .addCase(getDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "something wnet wrong";
        toast.error(action.error.message);
        state.user = {};
      });
  },
});

export const registerEmployee = createAsyncThunk(
  "/register",
  async ({
    payload,
    navigate,
  }: {
    payload: formValues;
    navigate: (path: string) => void;
  }) => {
    try {
      const response = await axios.post(`${apiUrl}/register`, payload);
      if (response.status === 201) {
        toast.success("Employee Registered Successfully");
        navigate("/login");
      }
    } catch (error) {
      console.log(error, "error reghister");
      toast.error("Error Registering Employee");
    }
  }
);

export const loginEmployee = createAsyncThunk(
  "/login",
  async ({
    payload,
    navigate,
  }: {
    payload: login;
    navigate: (path: string) => void;
  }) => {
    try {
      const response = await axios.post(`${apiUrl}/login`, payload);

      if (response.status === 200) {
        const data = response.data;
        // console.log(response.data);
        localStorage.setItem("token", data.token);
        localStorage.setItem("role", data.employeedesignation);
        navigate("/");

        return response.data;
      }
    } catch (error) {
      throw new Error(error.response.data.error);
    }
  }
);

export const getDetails = createAsyncThunk(
  "/getDetails",
  async (payload: string) => {
    try {
      const response = await axios.get(`${apiUrl}/getDetails`, {
        headers: {
          "x-token": payload,
        },
      });
      if (response.status === 200) {
        return response.data;
      }
    } catch (error) {
      console.log(error, "Employee details", error.response.data.error);
      throw new Error(error.response.data.error);
    }
  }
);

export const {} = employeeSlice.actions;
export default employeeSlice.reducer;
