import React, { Fragment } from "react";
import { Divider } from "@mui/material";
import EmployeePeronalDetailsData from "./Data/EmployeePeronalDetailsData.tsx";
import EmployeeLeavesDetailsData from "./Data/EmployeeLeavesDetailsData.tsx";

const EmployeeInfo = () => {
  return (
    <Fragment>
      <EmployeePeronalDetailsData />
      <Divider sx={{ mt: 5, mb: 5 }} />
      <EmployeeLeavesDetailsData />
    </Fragment>
  );
};

export default EmployeeInfo;
