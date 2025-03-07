import React, { useEffect, useState } from "react";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import {
  Button,
  Tabs,
  Tab,
  Box,
  Tooltip,
  Fab,
  Dialog,
  DialogTitle,
  DialogContent,
  IconButton,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store/store.tsx";
import {
  handleDeleteTodo,
  handleGetTodoItem,
} from "../../store/employeeSlice.tsx";
import TodoForm from "./TodoForm.tsx";
import CreateOutlinedIcon from "@mui/icons-material/CreateOutlined";
import PendingActionsOutlinedIcon from "@mui/icons-material/PendingActionsOutlined";
import AutorenewOutlinedIcon from "@mui/icons-material/AutorenewOutlined";
import CheckCircleOutlineOutlinedIcon from "@mui/icons-material/CheckCircleOutlineOutlined";
import KeyboardArrowDownOutlinedIcon from "@mui/icons-material/KeyboardArrowDownOutlined";
import KeyboardArrowUpOutlinedIcon from "@mui/icons-material/KeyboardArrowUpOutlined";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import CloseIcon from "@mui/icons-material/Close";

const AssignReferralList = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { todoData } = useSelector((state: RootState) => state.employee);
  const [status, setStatus] = useState("All");
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedTodo, setSelectedTodo] = useState(null);
  const [toggle, setToggle] = useState<boolean>(true);
  const [detailDialouge, setDetailDialouge] = useState<boolean>(false);

  useEffect(() => {
    dispatch(handleGetTodoItem({ status }));
  }, [status, dispatch, toggle]);

  const handleEdit = (e, todo) => {
    e.stopPropagation();

    setSelectedTodo(todo);
    setOpenDialog(true);
  };

  const handleDelete = async (e, id) => {
    console.log("Delete todo:", id);
    e.stopPropagation();
    await dispatch(handleDeleteTodo(id));
    setToggle((prev) => !prev);
  };

  const handleOpenDialog = () => {
    setSelectedTodo(null); // Reset to create new todo
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setDetailDialouge(false);
  };

  const handleRowClick = (params) => {
    setSelectedTodo(params.row);
    setDetailDialouge(true);
  };

  const rows = todoData?.map((todo) => ({
    id: todo.todo_id,
    title: todo.title,
    description: todo.description,
    due_date: todo.due_date,
    status: todo.status,
    priority: todo.priority,
  }));

  const columns: GridColDef<(typeof rows)[number]>[] = [
    { field: "id", headerName: "ID", width: 90 },
    { field: "title", headerName: "Title", width: 200 },
    { field: "description", headerName: "Description", width: 200 },
    { field: "due_date", headerName: "Due Date", width: 150 },
    {
      field: "status",
      headerName: "Status",
      width: 210,
      renderCell: (params) => (
        <>
          {params.row.status === "Pending" ? (
            <>
              <Button
                size="small"
                variant="outlined"
                startIcon={<PendingActionsOutlinedIcon />}
                color="warning"
                sx={{
                  width: "10rem",
                  justifyContent: "left",
                  pointerEvents: "none",
                }}
              >
                Pending
              </Button>
            </>
          ) : params.row.status === "Progress" ? (
            <Button
              size="small"
              variant="outlined"
              startIcon={<AutorenewOutlinedIcon />}
              color="info"
              sx={{
                width: "10rem",
                justifyContent: "left",
                pointerEvents: "none",
              }}
            >
              In Progress
            </Button>
          ) : (
            <Button
              size="small"
              variant="outlined"
              startIcon={<CheckCircleOutlineOutlinedIcon />}
              color="success"
              sx={{
                width: "10rem",
                justifyContent: "left",
                pointerEvents: "none",
              }}
            >
              Completed
            </Button>
          )}
        </>
      ),
    },
    {
      field: "priority",
      headerName: "Priority",
      width: 200,
      renderCell: (params) => (
        <>
          {params.row.priority === "Low" ? (
            <>
              <Button
                size="small"
                variant="outlined"
                startIcon={<KeyboardArrowDownOutlinedIcon />}
                color="success"
                sx={{
                  width: "10rem",
                  justifyContent: "left",
                  pointerEvents: "none",
                }}
              >
                Low
              </Button>
            </>
          ) : params.row.priority === "Medium" ? (
            <Button
              size="small"
              variant="outlined"
              startIcon={<RemoveCircleOutlineIcon />}
              color="warning"
              sx={{
                width: "10rem",
                justifyContent: "left",
                pointerEvents: "none",
              }}
            >
              Medium
            </Button>
          ) : (
            <Button
              size="small"
              variant="outlined"
              startIcon={<KeyboardArrowUpOutlinedIcon />}
              color="error"
              sx={{
                width: "10rem",
                justifyContent: "left",
                pointerEvents: "none",
              }}
            >
              High
            </Button>
          )}
        </>
      ),
    },

    {
      field: "actions",
      headerName: "Actions",
      width: 150,
      headerAlign: "center",
      align: "center",
      renderCell: (params) => (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
            height: "100%",
          }}
        >
          <Tooltip title="Edit">
            <CreateOutlinedIcon
              sx={{ cursor: "pointer", color: "blue" }}
              onClick={(e) => handleEdit(e, params.row)}
            />
          </Tooltip>
          <Tooltip title="Delete">
            <DeleteIcon
              sx={{ cursor: "pointer", color: "red", marginLeft: 1 }}
              onClick={(e) => handleDelete(e, params.row.id)}
            />
          </Tooltip>
        </Box>
      ),
    },
  ];

  return (
    <Box sx={{ width: "100%", p: 2 }}>
      {/* Tabs + Button Container */}
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", sm: "row" },
          justifyContent: "space-between",
          alignItems: "center",
          gap: 2,
          mb: 2,
        }}
      >
        {/* Tabs */}
        <Tabs
          value={status}
          onChange={(e, newValue) => setStatus(newValue)}
          variant="scrollable"
          scrollButtons="auto"
          sx={{ flexGrow: 1 }}
        >
          <Tab label="All" value="All" />
          <Tab label="Progress" value="Progress" />
          <Tab label="Completed" value="Completed" />
        </Tabs>

        {/* Add Todo Button */}
        <Box sx={{ display: { xs: "none", sm: "block" } }}>
          <Button
            variant="contained"
            color="primary"
            onClick={handleOpenDialog}
          >
            Add Todo Item
          </Button>
        </Box>
      </Box>

      {/* Data Grid */}
      <DataGrid
        rows={rows}
        columns={columns}
        pageSizeOptions={[10]}
        checkboxSelection
        disableRowSelectionOnClick
        sx={{ height: "32rem !important" }}
        onRowClick={handleRowClick}
      />

      {/* Floating Add Button for Small Screens */}
      <Box
        sx={{
          position: "fixed",
          bottom: 16,
          right: 16,
          display: { xs: "block", sm: "none" },
        }}
      >
        <Tooltip title="Add Item" arrow>
          <Fab color="primary" size="medium" onClick={handleOpenDialog}>
            <AddIcon />
          </Fab>
        </Tooltip>
      </Box>

      {/* Todo Form Dialog */}
      <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle>
          {selectedTodo ? "Edit Todo Item" : "Add Todo Item"}
        </DialogTitle>
        <DialogContent>
          <TodoForm
            handleCloseDialog={handleCloseDialog}
            selectedTodo={selectedTodo}
            setToggle={setToggle}
          />
        </DialogContent>
      </Dialog>

      <Dialog
        open={detailDialouge}
        onClose={handleCloseDialog}
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          Todo Details
          <IconButton onClick={handleCloseDialog} sx={{ color: "gray" }}>
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          {selectedTodo && (
            <Box>
              <p>
                <strong>ID:</strong> {selectedTodo.id}
              </p>
              <p>
                <strong>Title:</strong> {selectedTodo.title}
              </p>
              <p>
                <strong>Description:</strong> {selectedTodo.description}
              </p>
              <p>
                <strong>Due Date:</strong> {selectedTodo.due_date}
              </p>
              <p>
                <strong>Status:</strong> {selectedTodo.status}
              </p>
              <p>
                <strong>Priority:</strong> {selectedTodo.priority}
              </p>
            </Box>
          )}
        </DialogContent>
      </Dialog>
    </Box>
  );
};

export default AssignReferralList;
