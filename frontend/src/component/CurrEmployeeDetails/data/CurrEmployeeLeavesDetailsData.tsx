import React, { useEffect, useState } from "react";
import EmployeeLeavesDetailsView from "../../EmployeeDeatils/Views/EmployeeLeavesDetailsView.tsx";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../store/store.tsx";
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

const CurrEmployeeLeavesDetailsData = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [employee, setEmployee] = useState<EmployeeData | null>(null);
  const [editMode, setEditMode] = useState(false);

  const data = useSelector<RootState>((state) => state.employee.user);
  const personalDetailsLoading = useSelector<RootState>(
    (state) => state.employee.personalDetailsLoading
  );

  useEffect(() => {
    setEmployee(data);
  }, [data]);

  const handleEditClick = () => {
    setEditMode(!editMode);
  };
  const handleInputChange = () => {
    // console.log("hii");
  };

  const handleSaveClick = () => {
    // console.log("Hii");
  };

  return (
    <>
      {personalDetailsLoading ? (
        <Loading />
      ) : (
        <EmployeeLeavesDetailsView
          employee={employee}
          handleEditClick={handleEditClick}
          handleInputChange={handleInputChange}
          editMode={editMode}
          handleSaveClick={handleSaveClick}
          isHr={false}
        />
      )}
    </>
  );
};

export default CurrEmployeeLeavesDetailsData;
