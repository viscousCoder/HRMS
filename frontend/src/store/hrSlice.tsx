import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";
interface formValues {
  id: string;
  employeefirstname: string;
  employeelastname: string;
  employeeemail: string;
  employeepassword: string;
  employeephonenumber: number;
  employeegender: string;
  employeedesignation: string;
  manager: string | null;
  total_leaves: number;
}
interface employeeList {
  loading: boolean;
  emloyeelist: formValues[];
  error: string;
  selectEmployeeLoading: Boolean;
  selectEmployeeData: formValues | {};
  selectEmployeeError: string;
}

const initialState: employeeList = {
  loading: false,
  emloyeelist: [],
  error: "",
  /**selected employee details */
  selectEmployeeLoading: false,
  selectEmployeeData: {},
  selectEmployeeError: "",
};

const apiUrl = process.env.REACT_APP_API_URL;

export const allEmployeesList = createAsyncThunk(
  "/employees/list",
  async (payload: string) => {
    try {
      const response = await axios.get(`${apiUrl}/employeesList`, {
        headers: {
          "x-token": payload,
        },
      });
      if (response.status === 200) {
        return response.data;
      }
    } catch (error) {
      console.log(error, "Employee list");
      throw new Error(error.response.data.error);
    }
  }
);

export const selectEmployeeDeatils = createAsyncThunk(
  "/getEmployeeDeatils",
  async (payload: string) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(`${apiUrl}/getEmployeeDetails`, {
        headers: {
          "x-token": token,
          "x-employeeid": payload,
        },
      });
      if (response.status === 200) {
        return response.data;
      }
    } catch (error) {
      console.log(error, "Emplyee Details");
      throw new Error(error.response.data.error);
    }
  }
);

export const handleUpdateEmployee = createAsyncThunk(
  "/updateEmployee",
  async (payload: formValues) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        `${apiUrl}/updateUserdetails`,
        payload,
        {
          headers: {
            "x-token": token,
          },
        }
      );
      if (response.status === 200) {
        return response.data;
      }
    } catch (error) {
      console.log(error, "Emplyee Details");
      throw new Error(error.response.data.error);
    }
  }
);

export const handleUpdateEmployeeLeaves = createAsyncThunk(
  "/updateEmployeeLeaves",
  async (payload: formValues) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        `${apiUrl}/updateemployeeleaves`,
        payload,
        {
          headers: {
            "x-token": token,
          },
        }
      );
      if (response.status === 200) {
        return response.data;
      }
    } catch (error) {
      console.log(error, "Emplyee Details");
      throw new Error(error.response.data.error);
    }
  }
);

export const hrSlice = createSlice({
  name: "hr",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(allEmployeesList.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(allEmployeesList.fulfilled, (state, action) => {
        state.loading = false;
        if (action.payload) state.emloyeelist = action?.payload;
      })
      .addCase(allEmployeesList.rejected, (state, action) => {
        state.loading = false;
        state.error = "something wnet wrong";
      })
      /**Select employee */
      .addCase(selectEmployeeDeatils.pending, (state, action) => {
        state.selectEmployeeLoading = true;
        state.selectEmployeeData = {};
        state.selectEmployeeError = "";
      })
      .addCase(selectEmployeeDeatils.fulfilled, (state, action) => {
        state.selectEmployeeLoading = false;
        state.selectEmployeeData = action.payload;
        state.selectEmployeeError = "";
      })
      .addCase(selectEmployeeDeatils.rejected, (state, action) => {
        state.selectEmployeeLoading = false;
        state.selectEmployeeData = {};
        state.selectEmployeeError =
          action.error.message || "Something went wrong";
      })
      /**updating employee */
      .addCase(handleUpdateEmployee.pending, (state, action) => {
        state.selectEmployeeLoading = true;
        state.selectEmployeeData = {};
        state.selectEmployeeError = "";
      })
      .addCase(handleUpdateEmployee.fulfilled, (state, action) => {
        state.selectEmployeeLoading = false;
        state.selectEmployeeData = action.payload;
        state.selectEmployeeError = "";
      })
      .addCase(handleUpdateEmployee.rejected, (state, action) => {
        state.selectEmployeeLoading = false;
        state.selectEmployeeData = {};
        state.selectEmployeeError =
          action.error.message || "Something went wrong";
      });
  },
});

export default hrSlice.reducer;
