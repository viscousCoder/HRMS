import * as React from "react";
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
import { useNavigate } from "react-router-dom";
import { AppDispatch, RootState } from "../../store/store.tsx";
import {
  allEmployeesList,
  assignManagerToReferral,
  fetchAssignedManagers,
  referralList,
  updateReferralCandidate,
} from "../../store/hrSlice.tsx";
import DataGridToolbar from "../EmployeesList/DataGridToolbar.tsx";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import PeopleIcon from "@mui/icons-material/People";
import DownloadIcon from "@mui/icons-material/Download";
import PendingActionsIcon from "@mui/icons-material/PendingActions";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";

export default function HrReferralList() {
  const dispatch = useDispatch<AppDispatch>();
  const referralEmployeeData = useSelector<RootState>(
    (state) => state.hr.referralEmployeeData
  );
  const employeesList = useSelector<RootState>(
    (state) => state.hr.employeeList
  );

  const assignedManagers = useSelector(
    (state: RootState) => state.hr.assignEmployeeList || []
  );
  console.log(assignedManagers, employeesList, "Here");

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [selectedRow, setSelectedRow] = React.useState(null);
  const [toggle, settoggle] = React.useState<boolean>(false);

  const navigate = useNavigate();

  React.useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      dispatch(referralList());
      dispatch(allEmployeesList(token));
    }
  }, [dispatch, toggle]);

  const rows = referralEmployeeData?.map((user) => {
    return {
      id: user.id,
      candidateName: user.candidate_name,
      candidateEmail: user.candidate_email,
      candidatePhoneNumber: user.candidate_phone_number,
      candidateQualification: user.candidate_qualification,
      candidateResume: user.candidate_resume,
      employeeName: user.employeefirstname + user.employeelastname,
      employeeEmail: user.employeeemail,
      candidateStatus: user.candidate_status,
      candidateRound: user.candidate_round,
      candidateAssign: null,
      candidateSelected: user.candidate_selected,
    };
  });

  const handleDownloadResume = (resumeUrl: string) => {
    const newTab = window.open(resumeUrl, "_blank");
    if (!newTab) {
      alert("Failed to open the resume. Please check the URL.");
    }
  };

  const handleClickAssign = async (
    event: React.MouseEvent<HTMLElement>,
    row: any
  ) => {
    console.log(row.candidateRound, row);
    setSelectedRow(row.id);
    setAnchorEl(event.currentTarget);
    await dispatch(fetchAssignedManagers(row.id));
  };

  const handleCloseAssign = () => {
    setSelectedRow(null);
    setAnchorEl(null);
  };

  const handleManagerSelect = async (manager: any, row: any) => {
    // Add the manager to the selected list

    dispatch(
      assignManagerToReferral({
        referralId: selectedRow!,
        managerId: manager.id,
      })
    );
    dispatch(
      updateReferralCandidate({
        candidate_round: row.candidateRound + 1,
        id: row.id,
      })
    );

    handleCloseAssign();
  };

  const handleRemoveManager = (index: number) => {};

  const handleAcceptCandidate = async (data: any) => {
    // console.log(data);
    await dispatch(
      updateReferralCandidate({
        candidate_status: "ACCEPT",
        id: data.id,
      })
    );
    settoggle((prev) => !prev);
  };

  const handleRejectCandidate = async (data: any) => {
    // console.log(data);
    await dispatch(
      updateReferralCandidate({
        candidate_status: "REJECT",
        id: data.id,
      })
    );
    settoggle((prev) => !prev);
  };

  // const handleSelectedCandidate = (data: any) => {
  //   // console.log(data);
  //   dispatch(
  //     updateReferralCandidate({
  //       candidate_selected: "SELECTED",
  //       id: data.id,
  //     })
  //   );
  // };
  const handleSelectedCandidate = async (data: any) => {
    const isAnyManagerRejected =
      Array.isArray(assignedManagers) &&
      assignedManagers.some((manager) => manager.status === "REJECT");

    await dispatch(
      updateReferralCandidate({
        candidate_selected: isAnyManagerRejected ? "REJECTED" : "SELECTED",
        id: data.id,
      })
    );
    settoggle((prev) => !prev);
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
          {params.row.candidateStatus === "PENDING" ? (
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
    {
      field: "candidateAssign",
      headerName: "Assign",
      width: 150,
      editable: false,
      renderCell: (params) => (
        <>
          <IconButton
            onClick={(e) => handleClickAssign(e, params.row)}
            disabled={
              params.row.candidateStatus === "REJECT" ||
              params.row.candidateSelected === "ASSIGNED"
            }
          >
            <PeopleIcon />
          </IconButton>
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleCloseAssign}
          >
            {assignedManagers.length > 0 && (
              <>
                <div style={{ padding: "5px", fontWeight: "bold" }}>
                  Assigned Managers:
                </div>
                {assignedManagers.map((manager, index) => (
                  <div
                    key={index}
                    style={{ display: "flex", alignItems: "center" }}
                  >
                    <span>
                      {manager.employeefirstname} {manager.employeelastname} (
                      {manager.employeedesignation})
                    </span>
                    {manager.status === "ASSIGNED" ? (
                      <Button
                        size="small"
                        variant="outlined"
                        color="warning"
                        // disabled={params.row.status == "ACCEPT"}
                        startIcon={<PendingActionsIcon />}
                      >
                        Pending
                      </Button>
                    ) : manager.status === "ACCEPT" ? (
                      <Button
                        size="small"
                        variant="outlined"
                        // disabled={params.row.status !== "ACCEPT"}
                        startIcon={<ThumbUpIcon />}
                        color="success"
                      >
                        Selected
                      </Button>
                    ) : (
                      <Button
                        size="small"
                        variant="outlined"
                        // disabled={params.row.status !== "ACCEPT"}
                        startIcon={<CloseIcon />}
                        color="error"
                      >
                        Rejected
                      </Button>
                    )}
                  </div>
                ))}
                <Divider sx={{ my: 1 }} />
              </>
            )}

            {employeesList.map((emp) => {
              const isAssigned =
                Array.isArray(assignedManagers) &&
                assignedManagers.some(
                  (assignedManager) => assignedManager.manager_id === emp.id
                );

              const isManagerOrLead =
                emp.employeedesignation === "Manager" ||
                emp.employeedesignation === "Team Lead";

              if (!isManagerOrLead) return null;

              return (
                <MenuItem
                  key={emp.id}
                  onClick={
                    !isAssigned
                      ? () => handleManagerSelect(emp, params.row)
                      : undefined
                  }
                  disabled={isAssigned} // Disable the item if it's already assigned
                >
                  <ListItemText
                    primary={`${emp.employeefirstname} ${emp.employeelastname} (${emp.employeedesignation})`}
                  />
                </MenuItem>
              );
            })}
          </Menu>
        </>
      ),
    },
    // {
    //   field: "candidateSelected",
    //   headerName: "Selected",
    //   width: 150,
    //   editable: false,
    //   renderCell: (params) =>
    //     params.row.candidateSelected === true ? (
    //       <Button
    //         size="small"
    //         variant="outlined"
    //         disabled={params.row.candidateStatus !== "ACCEPT"}
    //         startIcon={<ThumbUpIcon />}
    //         color="success"
    //       >
    //         Selected
    //       </Button>
    //     ) : (
    //       <Button
    //         size="small"
    //         variant="outlined"
    //         color="warning"
    //         disabled={params.row.candidateStatus !== "ACCEPT"}
    //         onClick={() => handleSelectedCandidate(params.row)}
    //         startIcon={<PendingActionsIcon />}
    //       >
    //         Pending
    //       </Button>
    //     ),
    // },
    {
      field: "candidateSelected",
      headerName: "Selected",
      width: 150,
      editable: false,
      renderCell: (params) => {
        const isAllManagersValid =
          Array.isArray(assignedManagers) &&
          assignedManagers.length > 0 &&
          assignedManagers.every(
            (manager) =>
              manager.status === "ACCEPT" || manager.status === "REJECT"
          );

        return params.row.candidateSelected === "SELECTED" ? (
          <Button
            size="small"
            variant="outlined"
            startIcon={<ThumbUpIcon />}
            color="success"
          >
            Selected
          </Button>
        ) : params.row.candidateSelected === "PENDING" ? (
          <Button
            size="small"
            variant="outlined"
            color="warning"
            disabled={
              params.row.candidateStatus !== "ACCEPT" || !isAllManagersValid
            }
            onClick={() => handleSelectedCandidate(params.row)}
            startIcon={<PendingActionsIcon />}
          >
            Pending
          </Button>
        ) : (
          <Button
            size="small"
            variant="outlined"
            // disabled={params.row.status !== "ACCEPT"}
            startIcon={<CloseIcon />}
            color="error"
          >
            Rejected
          </Button>
        );
      },
    },
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
    </>
  );
}
