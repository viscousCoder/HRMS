import {
  Autocomplete,
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

const EmployeePersonalDetailsView = ({
  employee,
  handleInputChange,
  DesignationList,
  managerList,
  handleEditClick,
  editMode,
  handleSaveClick,
  isHr = true,
}) => {
  // console.log(employee, "hii");
  return (
    <Card sx={{ maxWidth: 1300, margin: "auto" }}>
      <CardHeader
        title="Employee Personal Info"
        action={
          <IconButton onClick={handleEditClick}>
            <EditIcon />
          </IconButton>
        }
      />
      <CardContent>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              name="employeefirstname"
              label="First Name"
              fullWidth
              value={employee?.employeefirstname}
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              name="employeelastname"
              label="Last Name    "
              fullWidth
              value={employee?.employeelastname}
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              name="employeeemail"
              label="Email"
              fullWidth
              value={employee?.employeeemail}
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              name="employeephonenumber"
              label="Contact Number"
              fullWidth
              value={employee?.employeephonenumber}
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            {/* <TextField
          name="employeedesignation"
          label="Designation"
          fullWidth
          value={employee?.employeedesignation}
          onChange={handleInputChange}
        /> */}
            {isHr ? (
              <Autocomplete
                options={DesignationList}
                getOptionLabel={(option) => option}
                value={
                  DesignationList.find(
                    (manager) =>
                      employee?.employeedesignation &&
                      manager === employee.employeedesignation
                  ) || null
                }
                onChange={(_, value) => handleInputChange(_, value)}
                renderInput={(params) => (
                  <TextField {...params} label="Designation" fullWidth />
                )}
              />
            ) : (
              <TextField
                name="employeedesignation"
                label="Designation"
                fullWidth
                value={employee?.employeedesignation}
              />
            )}
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              name="employeegender"
              label="Gender"
              fullWidth
              value={employee?.employeegender}
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item xs={12}>
            {isHr ? (
              <Autocomplete
                options={managerList}
                getOptionLabel={(option) =>
                  `${option.employeefirstname} ${option.employeelastname}`
                }
                // value={employee?.rep_manager}
                value={
                  managerList?.find(
                    (manager) =>
                      employee?.manager && manager.id === employee.manager
                  ) || null
                }
                onChange={(_, value) => handleInputChange(_, value)}
                // onChange={(_, newValue) =>
                //   setEmployee({
                //     ...employee,
                //     manager: newValue?.id || "",
                //   })
                // }

                renderInput={(params) => (
                  <TextField {...params} label="Reporting Manager" fullWidth />
                )}
              />
            ) : (
              <TextField
                name="manager"
                label="Reporting manager"
                fullWidth
                value={employee?.rep_manager}
              />
            )}
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

export default EmployeePersonalDetailsView;
