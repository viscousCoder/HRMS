import React, { Fragment, useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import EmployeePersonalDetailsView from "../Views/EmployeePersonalDetailsView.tsx";
import {
  selectEmployeeDeatils,
  allEmployeesList,
  handleUpdateEmployee,
} from "../../../store/hrSlice.tsx";
import { AppDispatch, RootState } from "../../../store/store.tsx";

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

const EmployeePeronalDetailsData: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [employee, setEmployee] = useState<EmployeeData | null>(null);
  const [editMode, setEditMode] = useState(false);
  const [reportingManagers, setReportingManagers] = useState<
    ReportingManager[]
  >([]);
  const DesignationList = [
    "HR",
    "Manager",
    "Trainee",
    "Enigneer",
    "Junior Developer",
  ];

  const { id } = useParams();
  const data = useSelector<RootState>((state) => state.hr.selectEmployeeData);
  const managerList = useSelector<RootState>((state) =>
    state.hr.emloyeeList?.filter(
      (item) => item.employeedesignation === "Manager"
    )
  );
  useEffect(() => {
    setEmployee(data);
  }, [data]);

  // console.log(managerList, "hiii", employee);

  // Simulating fetching data from an API
  useEffect(() => {
    dispatch(selectEmployeeDeatils(id!));
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
    dispatch(handleUpdateEmployee(employee)).then(() =>
      dispatch(selectEmployeeDeatils(id!))
    );
    setEditMode(false);
  };
  console.log(employee, "hello", managerList);
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    values: EmployeeData
  ) => {
    if (!values) {
      const { name, value } = e.target;
      if (name === "employeephonenumber") {
        setEmployee({ ...employee, [name]: Number(value) });
      } else {
        setEmployee({ ...employee, [name]: value });
      }
    } else {
      {
        values.id
          ? setEmployee({
              ...employee,
              manager: values?.id || "",
              rep_manager:
                values?.employeefirstname + " " + values?.employeelastname,
            })
          : setEmployee({ ...employee, employeedesignation: values });
      }
    }

    setEditMode(true);
  };

  return (
    <Fragment>
      <EmployeePersonalDetailsView
        employee={employee}
        handleInputChange={handleInputChange}
        editMode={editMode}
        managerList={managerList}
        DesignationList={DesignationList}
        handleEditClick={handleEditClick}
        handleSaveClick={handleSaveClick}
      />
    </Fragment>
  );
};

export default EmployeePeronalDetailsData;
