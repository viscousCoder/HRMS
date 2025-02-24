import React, { useEffect, useState } from "react";
import EmployeePersonalDetailsView from "../../EmployeeDeatils/Views/EmployeePersonalDetailsView.tsx";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../store/store.tsx";
import {
  getDetails,
  handleCurrEmployeeUpdate,
} from "../../../store/employeeSlice.tsx";
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

const CurrEmployeePersonalDetailsData = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [employee, setEmployee] = useState<EmployeeData | null>(null);
  const [editMode, setEditMode] = useState(false);

  const data = useSelector<RootState>((state) => state.employee.user);
  const personalDetailsLoading = useSelector<RootState>(
    (state) => state.employee.personalDetailsLoading
  );
  const DesignationList = [
    "HR",
    "Manager",
    "Trainee",
    "Enigneer",
    "Junior Developer",
  ];

  const managerList = [];

  useEffect(() => {
    setEmployee(data);
  }, [data]);

  useEffect(() => {
    // const token = localStorage.getItem("token");
    dispatch(getDetails());
    setEmployee(data);
  }, []);

  const handleEditClick = () => {
    setEditMode(!editMode);
  };

  const handleSaveClick = () => {
    // console.log("Saving data");
    dispatch(handleCurrEmployeeUpdate(employee)).then(() => {
      dispatch(getDetails());
    });
    setEditMode(false);
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    values: EmployeeData
  ) => {
    const { name, value } = e.target;
    if (name === "employeephonenumber") {
      setEmployee({ ...employee, [name]: Number(value) });
    } else {
      setEmployee({ ...employee, [name]: value });
    }
    setEditMode(true);
  };

  return (
    <>
      {personalDetailsLoading ? (
        <Loading />
      ) : (
        <EmployeePersonalDetailsView
          employee={employee}
          handleInputChange={handleInputChange}
          editMode={editMode}
          managerList={managerList}
          DesignationList={DesignationList}
          handleEditClick={handleEditClick}
          handleSaveClick={handleSaveClick}
          isHr={false}
        />
      )}
    </>
  );
};

export default CurrEmployeePersonalDetailsData;
