import React, { useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { AppDispatch, RootState } from "../../../store/store.tsx";
import {
  allEmployeesList,
  handleUpdateEmployeeLeaves,
  selectEmployeeDeatils,
} from "../../../store/hrSlice.tsx";
import EmployeeLeavesDetailsView from "../Views/EmployeeLeavesDetailsView.tsx";
import Loading from "../../Loading/Loading.tsx";

type EmployeeData = {
  employeefirstname: string;
  employeelastname: string;
  employeeemail: string;
  employeephonenumber: string;
  employeedesignation: string;
  employeegender: string;
  manager: string;
};

type ReportingManager = {
  id: string;
  name: string;
};

const EmployeeLeavesDetailsData: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [employee, setEmployee] = useState<EmployeeData | null>(null);
  const [editMode, setEditMode] = useState(false);

  const { id } = useParams();
  const data = useSelector<RootState>((state) => state.hr.selectEmployeeData);
  const loading = useSelector<RootState>(
    (state) => state.hr.selectEmployeeLoading
  );

  useEffect(() => {
    setEmployee(data);
  }, [data]);

  // console.log("hiii", employee);

  // Simulating fetching data from an API
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) dispatch(allEmployeesList(token));
    setEmployee(data);
  }, [id]);

  const handleEditClick = () => {
    setEditMode(!editMode);
  };

  const handleSaveClick = () => {
    // Save logic here (usually an API call)
    // console.log("Saving data...");
    dispatch(handleUpdateEmployeeLeaves(employee)).then(() =>
      dispatch(selectEmployeeDeatils(id!))
    );
    setEditMode(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const updatedValue = Number(value);

    setEmployee((prevEmployee) => {
      const updatedEmployee = { ...prevEmployee, [name]: updatedValue };

      // Recalculate the total field after the update
      updatedEmployee.total_leaves =
        updatedEmployee.casual_leaves +
        updatedEmployee.bereavement_leaves +
        updatedEmployee.earned_leaves +
        updatedEmployee.maternity_leaves +
        updatedEmployee.sick_leaves;

      return updatedEmployee;
    });

    setEditMode(true);
  };

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <EmployeeLeavesDetailsView
          employee={employee}
          handleEditClick={handleEditClick}
          handleInputChange={handleInputChange}
          editMode={editMode}
          handleSaveClick={handleSaveClick}
        />
      )}
    </>
  );
};

export default EmployeeLeavesDetailsData;
