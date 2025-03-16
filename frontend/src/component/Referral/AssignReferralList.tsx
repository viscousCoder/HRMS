import React, { useEffect, useState } from "react";
import { DataGrid, GridColDef } from "@mui/x-data-grid";

import {
  Button,
  IconButton,
  Menu,
  MenuItem,
  ListItemText,
  Checkbox,
  Divider,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store/store.tsx";
import { getAssignedCandidatesForManager } from "../../store/employeeSlice.tsx";
import DataGridToolbar from "../EmployeesList/DataGridToolbar.tsx";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import PeopleIcon from "@mui/icons-material/People";
import DownloadIcon from "@mui/icons-material/Download";
import { updateReferralAssignmentStatus } from "../../store/hrSlice.tsx";

const AssignReferralList = () => {
  const dispatch = useDispatch<AppDispatch>();
  const candiate = useSelector<RootState>(
    (state) => state.employee.assignedList
  );
  const assignedManager = useSelector<RootState>(
    (state) => state.hr.assignEmployeeList
  );

  const [toggle, setToggle] = useState<boolean>(false);

  console.log(assignedManager, "Data");
  useEffect(() => {
    const id = localStorage.getItem("id");
    if (id) dispatch(getAssignedCandidatesForManager(id));
  }, [dispatch, toggle]);

  const rows = candiate?.map((user) => {
    return {
      id: user.referral_id,
      candidateName: user.candidate_name,
      candidateEmail: user.candidate_email,
      candidatePhoneNumber: user.candidate_phone_number,
      candidateQualification: user.candidate_qualification,
      candidateResume: user.candidate_resume, // Assuming it's a URL
      // employeeName: user.employeefirstname + " " + user.employeelastname,
      employeeName: user.referred_by,
      employeeEmail: user.referred_by_email,
      candidateStatus: user.status,
      candidateRound: user.candidate_round,
    };
  });

  const handleDownloadResume = (resumeUrl: string) => {
    const newTab = window.open(resumeUrl, "_blank");
    if (!newTab) {
      alert("Failed to open the resume. Please check the URL.");
    }
  };

  const handleAcceptCandidate = async (data: any) => {
    console.log(data);
    await dispatch(
      updateReferralAssignmentStatus({
        status: "ACCEPT",
        id: data.id,
      })
    );
    setToggle((prev) => !prev);
  };

  const handleRejectCandidate = async (data: any) => {
    // console.log(data);
    await dispatch(
      updateReferralAssignmentStatus({
        status: "REJECT",
        id: data.id,
      })
    );
    setToggle((prev) => !prev);
  };

  const columns: GridColDef<(typeof rows)[number]>[] = [
    { field: "id", headerName: "ID", width: 90 },
    {
      field: "candidateName",
      headerName: "Candidate name",
      width: 150,
      editable: false,
    },
    {
      field: "candidateEmail",
      headerName: "Candidate Email",
      width: 150,
      editable: false,
    },
    {
      field: "candidatePhoneNumber",
      headerName: "Candidate Phone Number",
      sortable: false,
      width: 160,
    },
    {
      field: "candidateQualification",
      headerName: "Qualification",
      width: 270,
      editable: false,
    },
    {
      field: "candidateResume",
      headerName: "Resume",
      width: 150,
      editable: false,
      renderCell: (params) => (
        <Button
          size="small"
          variant="outlined"
          onClick={() => handleDownloadResume(params.value)}
          startIcon={<DownloadIcon />}
        >
          Resume
        </Button>
      ),
    },
    {
      field: "employeeName",
      headerName: "Employee Name",
      width: 150,
      editable: false,
    },
    {
      field: "employeeEmail",
      headerName: "Employee Email",
      width: 150,
      editable: false,
    },
    {
      field: "candidateRound",
      headerName: "Rounds",
      width: 150,
      editable: false,
    },
    {
      field: "candidateStatus",
      headerName: "Status",
      width: 150,
      editable: false,
      renderCell: (params) => (
        <>
          {params.row.candidateStatus === "ASSIGNED" ? (
            <>
              <IconButton
                color="success"
                onClick={() => handleAcceptCandidate(params.row)}
              >
                <CheckIcon />
              </IconButton>
              <IconButton
                color="error"
                onClick={() => handleRejectCandidate(params.row)}
              >
                <CloseIcon />
              </IconButton>
            </>
          ) : params.row.candidateStatus === "ACCEPT" ? (
            <Button
              size="small"
              variant="outlined"
              startIcon={<CheckIcon />}
              color="success"
              // disabled={true}
            >
              Accept
            </Button>
          ) : (
            <Button
              size="small"
              variant="outlined"
              startIcon={<CloseIcon />}
              color="error"
              // disabled={true}
            >
              Rejected
            </Button>
          )}
        </>
      ),
    },
    // {
    //   field: "candidateAssign",
    //   headerName: "Assign",
    //   width: 150,
    //   editable: false,
    //   renderCell: (params) => (
    //     <>
    //       <IconButton onClick={(e) => handleClickAssign(e, params.row)}>
    //         <PeopleIcon />
    //       </IconButton>
    //       <Menu
    //         anchorEl={anchorEl}
    //         open={Boolean(anchorEl)}
    //         onClose={handleCloseAssign}
    //       >
    //         {selectedManagers.length > 0 && (
    //           <>
    //             <div style={{ padding: "5px", fontWeight: "bold" }}>
    //               Assigned Managers:
    //             </div>
    //             {selectedManagers.map((manager, index) => (
    //               <div
    //                 key={index}
    //                 style={{ display: "flex", alignItems: "center" }}
    //               >
    //                 <span>
    //                   {manager.employeefirstname} {manager.epmloyeelastname} (
    //                   {manager.employeedesignation})
    //                 </span>
    //                 <IconButton
    //                   color="success"
    //                   onClick={() => console.log("Accepted", manager)}
    //                 >
    //                   <CheckIcon />
    //                 </IconButton>
    //                 <IconButton
    //                   color="error"
    //                   onClick={() => handleRemoveManager(index)}
    //                 >
    //                   <CloseIcon />
    //                 </IconButton>
    //               </div>
    //             ))}
    //             <Divider sx={{ my: 1 }} />
    //           </>
    //         )}
    //         {employeesList
    //           .filter(
    //             (emp) =>
    //               emp.employeedesignation === "Manager" ||
    //               emp.employeedesignation === "Team Lead"
    //           )
    //           .map((emp) => (
    //             <MenuItem
    //               key={emp.id}
    //               onClick={() => handleManagerSelect(emp, params.row)}
    //             >
    //               <ListItemText
    //                 primary={`${emp.employeefirstname} ${emp.employeelastname} (${emp.employeedesignation})`}
    //               />
    //             </MenuItem>
    //           ))}
    //       </Menu>
    //       {selectedManagers.map((manager, index) => (
    //         <div key={index} style={{ display: "flex", alignItems: "center" }}>
    //           <span>
    //             {manager.firstname} {manager.lastname}
    //           </span>
    //           <IconButton
    //             color="success"
    //             onClick={() => console.log("Accepted", manager)}
    //           >
    //             <CheckIcon />
    //           </IconButton>
    //           <IconButton
    //             color="error"
    //             onClick={() => handleRemoveManager(index)}
    //           >
    //             <CloseIcon />
    //           </IconButton>
    //         </div>
    //       ))}
    //     </>
    //   ),
    // },
  ];

  return (
    <>
      <DataGrid
        slots={{ toolbar: DataGridToolbar, baseButton: Button }}
        rows={rows}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 10,
            },
          },
        }}
        pageSizeOptions={[10]}
        checkboxSelection
        disableRowSelectionOnClick
        sx={{ height: "32rem !important" }}
      />
      hii
    </>
  );
};

export default AssignReferralList;
