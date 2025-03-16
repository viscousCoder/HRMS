import {
  Button,
  Card,
  CardContent,
  CardHeader,
  Grid,
  IconButton,
  TextField,
} from "@mui/material";
import React from "react";
import EditIcon from "@mui/icons-material/Edit";

const EmployeeLeavesDetailsView = ({
  employee,
  handleEditClick,
  handleInputChange,
  editMode,
  handleSaveClick,
  isHr = true,
}) => {
  return (
    <Card sx={{ maxWidth: 1300, margin: "auto" }}>
      <CardHeader
        title="Employee Leaves Details"
        action={
          isHr && (
            <IconButton onClick={handleEditClick}>
              <EditIcon />
            </IconButton>
          )
        }
      />
      <CardContent>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              name="casual_leaves"
              label="Casual Leaves"
              fullWidth
              value={employee?.casual_leaves}
              onChange={isHr ? handleInputChange : null}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              name="sick_leaves"
              label="Sick Leave"
              fullWidth
              value={employee?.sick_leaves}
              // onChange={handleInputChange}
              onChange={isHr ? handleInputChange : null}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              name="earned_leaves"
              label="Earned Leaves"
              fullWidth
              value={employee?.earned_leaves}
              // onChange={handleInputChange}
              onChange={isHr ? handleInputChange : null}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              name="bereavement_leaves"
              label="Bereavement Leaves"
              fullWidth
              value={employee?.bereavement_leaves}
              // onChange={handleInputChange}
              onChange={isHr ? handleInputChange : null}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              name="maternity_leaves"
              label="Maternity_Leaves"
              fullWidth
              value={employee?.maternity_leaves}
              // onChange={handleInputChange}
              onChange={isHr ? handleInputChange : null}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            {/* <TextField
          name="employeegender"
          label="Gender"
          fullWidth
          value={employee?.employeegender}
          onChange={handleInputChange}
        /> */}
          </Grid>
          <Grid item xs={12}>
            <TextField
              name="total_leaves"
              label="Total Leaves"
              fullWidth
              value={employee?.total_leaves}
              // onChange={handleInputChange}
              onChange={isHr ? handleInputChange : null}
              disabled
            />
          </Grid>
        </Grid>
        {editMode && (
          <Button
            variant="contained"
            color="primary"
            onClick={handleSaveClick}
            sx={{ mt: 2 }}
          >
            Save
          </Button>
        )}
      </CardContent>
    </Card>
  );
};

export default EmployeeLeavesDetailsView;
