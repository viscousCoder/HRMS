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

export interface TodoFormValues {
  title: string;
  description: string;
  due_date: string;
  status: string;
  priority: string;
}
export interface TodoUpdateFormValues {
  id: number;
  title: string;
  description: string;
  due_date: string;
  status: string;
  priority: string;
}
interface login {
  employeeEmail: string;
  employeePassword: string;
}

interface formData {
  name: string;
  email: string;
  contact: string;
  qualification: string;
  resume: File | null;
}

const initialState = {
  loading: false,
  user: {},
  error: "",
  personalDetailsLoading: false,
  assignedLoading: false,
  assignedList: [],
  assignedError: "",
  /**todod */
  todoLoading: false,
  todoData: [],
  todoError: "",

  /**Allemployee */
  allLoading: false,
  allEmployee: [],
  allError: "",

  /**blog */
  allBlogLoading: false,
  allBlogData: [],
  allBlogError: "",
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
        state.personalDetailsLoading = true;
        state.user = {};
      })
      .addCase(getDetails.fulfilled, (state, action) => {
        console.log(action, "hii", action.payload);
        state.personalDetailsLoading = false;
        state.user = action.payload;
        // toast.success("User Successful");
      })
      .addCase(getDetails.rejected, (state, action) => {
        state.personalDetailsLoading = false;
        state.error = action.error.message || "something wnet wrong";
        toast.error(action.error.message);
        state.user = {};
      })

      //assigned
      .addCase(getAssignedCandidatesForManager.pending, (state) => {
        state.assignedLoading = true;
      })
      .addCase(getAssignedCandidatesForManager.fulfilled, (state, action) => {
        state.assignedLoading = false;
        state.assignedList = action.payload.candidates; // Store the list of assigned candidates
      })
      .addCase(getAssignedCandidatesForManager.rejected, (state, action) => {
        state.assignedLoading = false;
        state.assignedError =
          action.error.message || "Failed to fetch assigned candidates";
        toast.error(state.assignedError);
      })
      //gettodo item

      .addCase(handleGetTodoItem.pending, (state) => {
        state.todoLoading = true;
      })
      .addCase(handleGetTodoItem.fulfilled, (state, action) => {
        state.todoLoading = false;
        state.todoData = action.payload; // Store the list of assigned candidates
      })
      .addCase(handleGetTodoItem.rejected, (state, action) => {
        state.todoLoading = false;
        state.todoError =
          action.error.message || "Failed to fetch assigned candidates";
        toast.error(state.assignedError);
      })
      //getting all employee
      .addCase(getAllEmployee.pending, (state) => {
        state.allLoading = true;
      })
      .addCase(getAllEmployee.fulfilled, (state, action) => {
        state.allLoading = false;
        state.allEmployee = action.payload;
      })
      .addCase(getAllEmployee.rejected, (state, action) => {
        state.allLoading = false;
        state.allError =
          action.error.message || "Failed to fetch assigned candidates";
        // toast.error(state.assignedError);
      })
      .addCase(getBlog.pending, (state) => {
        state.allBlogLoading = true;
      })
      .addCase(getBlog.fulfilled, (state, action) => {
        state.allBlogLoading = false;
        state.allBlogData = action.payload;
      })
      .addCase(getBlog.rejected, (state, action) => {
        state.allBlogLoading = false;
        state.allBlogError =
          action.error.message || "Failed to fetch assigned candidates";
        // toast.error(state.assignedError);
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
        localStorage.setItem("id", data.id);
        navigate("/");

        return response.data;
      }
    } catch (error) {
      throw new Error(error.response.data.error);
    }
  }
);

export const getDetails = createAsyncThunk("/getDetails", async () => {
  const token = localStorage.getItem("token");

  try {
    const response = await axios.get(`${apiUrl}/getDetails`, {
      headers: {
        "x-token": token,
      },
    });
    if (response.status === 200) {
      return response.data;
    }
  } catch (error) {
    console.log(error, "Employee details", error.response.data.error);
    throw new Error(error.response.data.error);
  }
});

export const handleCurrEmployeeUpdate = createAsyncThunk(
  "/currEmployeeUpate",
  async (payload) => {
    const token = localStorage.getItem("token");
    try {
      const response = await axios.post(
        `${apiUrl}/currentUserPerUpdate`,
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
      console.log(error, "Employee updateing error");
      throw new Error(error);
    }
  }
);

// export const handleReferral = createAsyncThunk(
//   "/referral",
//   async (payload: formData) => {
//     console.log("payload", payload);
//     const token = localStorage.getItem("token");
//     try {
//       const response = await axios.post(`${apiUrl}/referral`, payload, {
//         headers: {
//           "x-token": token,
//         },
//       });
//       console.log(response, payload);
//     } catch (error) {
//       console.log(error, "Employee referral error");
//       throw new Error(error);
//     }
//   }
// );

export const handleReferral = createAsyncThunk(
  "/referral",
  async (payload: { [key: string]: any }) => {
    console.log("payload", payload);
    const token = localStorage.getItem("token");

    const formData = new FormData();
    formData.append("candidate_name", payload.name);
    formData.append("candidate_email", payload.email);
    formData.append("candidate_contact", payload.contact);
    formData.append("qualification", payload.qualification);
    if (payload.resume) {
      formData.append("resume_file", payload.resume);
      console.log("File appended:", payload.resume);
    }

    try {
      const response = await axios.post(`${apiUrl}/referral`, formData, {
        headers: {
          "x-token": token,
          "Content-Type": "multipart/form-data",
        },
      });
      console.log(response.data);
    } catch (error) {
      console.log("Error submitting referral:", error);
    }
  }
);

export const getAssignedCandidatesForManager = createAsyncThunk(
  "/getAssignedCandidatesForManager",
  async (managerId: string) => {
    const token = localStorage.getItem("token");

    try {
      const response = await axios.get(
        `${apiUrl}/referral/assignlist/${managerId}`,
        {
          headers: {
            "x-token": token,
          },
        }
      );

      return response.data; // This will return the list of candidates assigned to the manager
    } catch (error) {
      console.error("Error fetching assigned candidates for manager:", error);
      throw new Error(
        error.response?.data?.message || "Error fetching candidates"
      );
    }
  }
);

/**todo */
export const handleCreateTodo = createAsyncThunk(
  "/todo",
  async ({
    payload,
  }: // navigate,
  {
    payload: TodoFormValues;
    // navigate: (path: string) => void;
  }) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(`${apiUrl}/todo`, payload, {
        headers: {
          "x-token": token,
        },
      });
      if (response.status === 201) {
        // navigate("/");
        return response.data;
      }
    } catch (error) {
      console.log(error);
      toast.error("Error creating todo");
    }
  }
);
/**get todo item list */
export const handleGetTodoItem = createAsyncThunk(
  "/todo/status",
  async ({ status }: { status: string }) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(`${apiUrl}/todo/${status}`, {
        headers: {
          "x-token": token,
        },
      });
      if (response.status === 200) {
        console.log(response.data);
        return response.data;
      }
    } catch (error) {
      console.log(error, "getting todo item");
    }
  }
);
/**update todo */
export const handleUpdateTodo = createAsyncThunk(
  "/todo/update",
  async ({
    payload,
  }: // navigate,
  {
    payload: TodoUpdateFormValues;
    // navigate: (path: string) => void;
  }) => {
    try {
      const token = localStorage.getItem("token");
      const id = payload.id;
      const response = await axios.patch(`${apiUrl}/todo/${id}`, payload, {
        headers: {
          "x-token": token,
        },
      });
      if (response.status === 200) {
        toast.success("Update Successfully");
      }
    } catch (error) {
      console.log(error);
      toast.error("Error while Updating the todo");
    }
  }
);

/**delete Todo */
export const handleDeleteTodo = createAsyncThunk(
  "/todo/delete",
  async (id: string) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.delete(`${apiUrl}/todo/${id}`, {
        headers: {
          "x-token": token,
        },
      });
      if (response.status === 200) {
        toast.success("Todo Deleted Successfully");
        return response.data;
      }
    } catch (error) {
      console.log(error, "While delete todod");
      toast.error("Error while deleting Todo");
    }
  }
);

/**getting all employe */
export const getAllEmployee = createAsyncThunk(
  "/get/allEmployee",
  async (payload: string) => {
    try {
      const response = await axios.get(`${apiUrl}/get/allEmployee`, {
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

/**posting blob */

export const postBlog = createAsyncThunk(
  "/post/blog",
  async ({
    payload,
    navigate,
  }: {
    payload: string;
    navigate: (path: string) => void;
  }) => {
    try {
      console.log("Comment", payload);
      const token = localStorage.getItem("token");
      const response = await axios.post(
        `${apiUrl}/post/blog`,
        { base64_data: payload },
        {
          headers: {
            "x-token": token,
          },
        }
      );
      if (response.status === 201) {
        navigate("/");
        return response.data;
      }
    } catch (error) {
      console.log(error);
      // toast.error("Error creating todo");
    }
  }
);

export const getBlog = createAsyncThunk("/blog", async () => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.get(`${apiUrl}/blog`, {
      headers: {
        "x-token": token,
      },
    });
    if (response.status === 200) {
      // console.log(response.data.data);
      return response.data.data;
    }
  } catch (error) {
    console.log(error, "getting todo item");
  }
});

export const {} = employeeSlice.actions;
export default employeeSlice.reducer;
