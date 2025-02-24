import React, { Fragment } from "react";
import CurrEmployeePersonalDetailsData from "./data/CurrEmployeePersonalDetailsData.tsx";
import CurrEmployeeLeavesDetailsData from "./data/CurrEmployeeLeavesDetailsData.tsx";
import { Divider } from "@mui/material";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store.tsx";
import Loading from "../Loading/Loading.tsx";

const CurrEmployeeDetails = () => {
  const personalDetailsLoading = useSelector<RootState>(
    (state) => state.employee.personalDetailsLoading
  );
  if (personalDetailsLoading) console.log("Aman");
  else console.log("Bisht");
  console.log(personalDetailsLoading, "helo");
  return (
    <Fragment>
      {/* {personalDetailsLoading ? (
        <Loading />
      ) : ( */}
      <Fragment>
        <CurrEmployeePersonalDetailsData />
        <Divider sx={{ mt: 5, mb: 5 }} />
        <CurrEmployeeLeavesDetailsData />
      </Fragment>
      {/*  )} */}
    </Fragment>
  );
};

export default CurrEmployeeDetails;
