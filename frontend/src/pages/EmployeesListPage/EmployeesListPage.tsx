import React from "react";
import EmployeesList from "../../component/EmployeesList/EmployeesList.tsx";
import { Box } from "@mui/material";

const EmployeesListPage = () => {
  return (
    <Box>
      <h1>This is user attendance table</h1>
      <EmployeesList />
    </Box>
  );
};

export default EmployeesListPage;
