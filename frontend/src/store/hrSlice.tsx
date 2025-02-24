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
  employeeList: formValues[];
  error: string;
  selectEmployeeLoading: Boolean;
  selectEmployeeData: formValues | {};
  selectEmployeeError: string;

  referralEmployeeLoading: boolean;
  referralEmployeeData: formValues[];
  referralEmployeeError: string;

  assignLoading: boolean;
  assignEmployeeList: formValues[];
  assignError: string;
}

const initialState: employeeList = {
  loading: false,
  employeeList: [],
  error: "",
  /**selected employee details */
  selectEmployeeLoading: false,
  selectEmployeeData: {},
  selectEmployeeError: "",

  /**referral list */
  referralEmployeeLoading: false,
  referralEmployeeData: [],
  referralEmployeeError: "",

  /**Assigned */
  assignLoading: false,
  assignEmployeeList: [],
  assignError: "",
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

export const referralList = createAsyncThunk("/referral/list", async () => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.get(`${apiUrl}/referral/list`, {
      headers: {
        "x-token": token,
      },
    });
    if (response.status == 200) {
      console.log(response.data);
      return response.data;
    }
  } catch (error) {
    console.log(error);
  }
});

/**Updating table */
// export const updateReferralCandidate = createAsyncThunk(
//   "referral/updateCandidate",
//   async ({ id, candidate_status, candidate_round, candidate_selected }) => {
//     try {
//       const token = localStorage.getItem("token");
//       const response = await axios.patch(
//         `${apiUrl}/referral/update`,
//         { id, candidate_status, candidate_round, candidate_selected },
//         { headers: { "x-token": token } }
//       );
//       return response.data; // Update UI accordingly
//     } catch (error) {
//       console.error("Error updating candidate:", error);
//       throw error;
//     }
//   }
// );
interface UpdateCandidatePayload {
  id: number;
  candidate_status?: string;
  candidate_round?: number;
  candidate_selected?: string;
}

interface UpdateCandidateAssignmentStatus {
  id: number;
  status: string;
}

export const updateReferralCandidate = createAsyncThunk<
  any,
  UpdateCandidatePayload
>(
  "referral/updateCandidate",
  async ({ id, candidate_status, candidate_round, candidate_selected }) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.patch(
        `${apiUrl}/referral/update`,
        { id, candidate_status, candidate_round, candidate_selected },
        { headers: { "x-token": token } }
      );
      return response.data;
    } catch (error) {
      console.error("Error updating candidate:", error);
      throw error;
    }
  }
);

export const assignManagerToReferral = createAsyncThunk(
  "/referral/assign",
  async (
    payload: { referralId: string; managerId: string },
    { rejectWithValue }
  ) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(`${apiUrl}/referral/assign`, payload, {
        headers: {
          "x-token": token,
        },
      });
      if (response.status === 200) {
        return response.data;
      }
    } catch (error) {
      console.error("Error assigning manager:", error);
      return rejectWithValue(
        error.response.data.message || "Error assigning manager"
      );
    }
  }
);

export const updateReferralAssignmentStatus = createAsyncThunk<
  any,
  UpdateCandidateAssignmentStatus
>("/referral/assign/update", async ({ id, status }) => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.patch(
      `${apiUrl}/referral/assign/update`,
      { id, status },
      { headers: { "x-token": token } }
    );
    return response.data;
  } catch (error) {
    console.error("Error updating candidate:", error);
    throw error;
  }
});

// list of assign manager

export const fetchAssignedManagers = createAsyncThunk(
  "hr/fetchAssignedManagers",
  async (referralId, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        `${apiUrl}/referral/assigned-managers/${referralId}`,
        {
          headers: {
            "x-token": token,
          },
        }
      );
      if (!response.data) {
        throw new Error("Failed to fetch assigned managers");
      }

      console.log("reduc", response.data.assignedManagers);
      return response.data.assignedManagers; // Assuming the response contains this structure
    } catch (error) {
      return rejectWithValue(error.message);
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
        if (action.payload) state.employeeList = action?.payload;
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
      })
      /**Referaal List */
      .addCase(referralList.pending, (state, action) => {
        state.referralEmployeeLoading = true;
        state.referralEmployeeData = [];
        state.referralEmployeeError = "";
      })
      .addCase(referralList.fulfilled, (state, action) => {
        state.referralEmployeeLoading = false;
        state.referralEmployeeData = action.payload;
        state.referralEmployeeError = "";
      })
      .addCase(referralList.rejected, (state, action) => {
        state.referralEmployeeLoading = false;
        state.referralEmployeeData = [];
        state.referralEmployeeError =
          action.error.message || "Something went wrong";
      })
      /**updating referal status */
      .addCase(updateReferralCandidate.pending, (state, action) => {
        state.referralEmployeeLoading = true;
        state.referralEmployeeError = "";
      })
      .addCase(updateReferralCandidate.fulfilled, (state, action) => {
        state.referralEmployeeLoading = false;
        state.referralEmployeeError = "";
      })
      .addCase(updateReferralCandidate.rejected, (state, action) => {
        state.referralEmployeeLoading = false;
        state.referralEmployeeError =
          action.error.message || "Something went wrong";
      })
      /**Assigned employed list */
      .addCase(assignManagerToReferral.pending, (state, action) => {
        state.assignLoading = true;
        state.assignEmployeeList = [];
        state.assignError = "";
      })
      .addCase(assignManagerToReferral.fulfilled, (state, action) => {
        state.assignLoading = false;
        state.assignEmployeeList = action.payload;
        state.assignError = "";
      })
      .addCase(assignManagerToReferral.rejected, (state, action) => {
        state.assignLoading = false;
        state.assignEmployeeList = [];
        state.assignError = action.error.message || "Something went wrong";
      })
      /**update assigned employed */
      .addCase(updateReferralAssignmentStatus.pending, (state, action) => {
        state.assignLoading = true;
        // state.assignEmployeeList = [];
        state.assignError = "";
      })
      .addCase(updateReferralAssignmentStatus.fulfilled, (state, action) => {
        state.assignLoading = false;
        // state.assignEmployeeList = action.payload;
        state.assignError = "";
      })
      .addCase(updateReferralAssignmentStatus.rejected, (state, action) => {
        state.assignLoading = false;
        // state.assignEmployeeList = [];
        state.assignError = action.error.message || "Something went wrong";
      })
      //assigned manager for interview
      .addCase(fetchAssignedManagers.pending, (state, action) => {
        state.assignLoading = true;
        state.assignEmployeeList = [];
        state.assignError = "";
      })
      .addCase(fetchAssignedManagers.fulfilled, (state, action) => {
        state.assignLoading = false;
        state.assignEmployeeList = Array.isArray(action.payload)
          ? action.payload
          : [];
        state.assignError = "";
      })
      .addCase(fetchAssignedManagers.rejected, (state, action) => {
        state.assignLoading = false;
        state.assignEmployeeList = [];
        state.assignError = action.error.message || "Something went wrong";
      });
  },
});

export default hrSlice.reducer;
