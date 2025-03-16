import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { APP_URL } from "../common/Constant.ts";
import { toast } from "react-toastify";

interface PayloadType {
  id: number;
  title: string;
  start: string;
  end: string;
  type: number;
  description: string;
}

const apiUrl = APP_URL;
const initialState = {
  loading: false,
  data: [],
  error: "",
};
const token = localStorage.getItem("token");

/**Getting Calender data */
export const handleGetCalenderData = createAsyncThunk(
  "/getCalenderData",
  async () => {
    console.log("hi inside slice", token);
    try {
      const response = await axios.get(`${apiUrl}/calenderData`, {
        headers: { "x-token": token },
      });
      if (response.status === 200) {
        return response.data;
      }
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
);

/**Send Calender data */
export const handleSendCalenderData = createAsyncThunk(
  "/sendCalenderData",
  async (payload: PayloadType) => {
    try {
      const response = await axios.post(`${apiUrl}/calenderData`, {
        payload,
        token,
      });
      if (response.status === 200) {
        toast.success("Data sended successfully");
        handleGetCalenderData();
      }
    } catch (error) {
      console.log(error.response.data.message);
      toast.error(error.response.data.message);
    }
  }
);

export const calenderSlice = createSlice({
  name: "calender",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(handleGetCalenderData.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(handleGetCalenderData.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(handleGetCalenderData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Something went wrong";
      });
  },
});

export default calenderSlice.reducer;
