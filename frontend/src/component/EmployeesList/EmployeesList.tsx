// import * as React from "react";
// import Table from "@mui/material/Table";
// import TableBody from "@mui/material/TableBody";
// import TableCell from "@mui/material/TableCell";
// import TableContainer from "@mui/material/TableContainer";
// import TableHead from "@mui/material/TableHead";
// import TableRow from "@mui/material/TableRow";
// import Paper from "@mui/material/Paper";
// import { useDispatch } from "react-redux";
// import { AppDispatch } from "../store/store";
// import { allEmployeesList } from "../store/hrSlice.tsx";

// function createData(
//   name: string,
//   calories: number,
//   fat: number,
//   carbs: number,
//   protein: number
// ) {
//   return { name, calories, fat, carbs, protein };
// }

// const rows = [
//   createData("Frozen yoghurt", 159, 6.0, 24, 4.0),
//   createData("Ice cream sandwich", 237, 9.0, 37, 4.3),
//   createData("Eclair", 262, 16.0, 24, 6.0),
//   createData("Cupcake", 305, 3.7, 67, 4.3),
//   createData("Gingerbread", 356, 16.0, 49, 3.9),
// ];

// export default function AttendanceTable() {
//   const dispatch = useDispatch<AppDispatch>();
//   React.useEffect(() => {
//     const token = localStorage.getItem("token");
//     if (token) dispatch(allEmployeesList(token));
//   }, []);
//   return (
//     <TableContainer component={Paper}>
//       <Table sx={{ minWidth: 650 }} aria-label="simple table">
//         <TableHead>
//           <TableRow>
//             <TableCell>Dessert (100g serving)</TableCell>
//             <TableCell align="right">Calories</TableCell>
//             <TableCell align="right">Fat&nbsp;(g)</TableCell>
//             <TableCell align="right">Carbs&nbsp;(g)</TableCell>
//             <TableCell align="right">Protein&nbsp;(g)</TableCell>
//           </TableRow>
//         </TableHead>
//         <TableBody>
//           {rows.map((row) => (
//             <TableRow
//               key={row.name}
//               sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
//             >
//               <TableCell component="th" scope="row">
//                 {row.name}
//               </TableCell>
//               <TableCell align="right">{row.calories}</TableCell>
//               <TableCell align="right">{row.fat}</TableCell>
//               <TableCell align="right">{row.carbs}</TableCell>
//               <TableCell align="right">{row.protein}</TableCell>
//             </TableRow>
//           ))}
//         </TableBody>
//       </Table>
//     </TableContainer>
//   );
// }

import * as React from "react";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import DataGridToolbar from "./DataGridToolbar.tsx";
import { Button } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { AppDispatch, RootState } from "../../store/store.tsx";
import { allEmployeesList } from "../../store/hrSlice.tsx";

interface formValues {
  id: string;
  employeefirstname: string;
  employeelastname: string;
  employeeemail: string;
  employeepassword: string;
  employeephonenumber: number;
  employeegender: string;
  employeedesignation: string;
  manager: string | null;
  total_leaves: number;
}

export default function TableComponent() {
  const dispatch = useDispatch<AppDispatch>();
  const employeesList = useSelector<RootState>((state) => state.hr.emloyeelist);
  const navigate = useNavigate();

  React.useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) dispatch(allEmployeesList(token));
  }, []);

  const rows = employeesList?.map((user) => {
    return {
      id: user.id,
      firstName: user.employeefirstname,
      lastName: user.employeelastname,
      fullName: user.employeefirstname + user.employeelastname,
      email: user.employeeemail,
      designation: user.employeedesignation,
      gender: user.employeegender,
      contact: user.employeephonenumber,
      manager: user.manager === null ? "NA" : user.manager,
      total_leaves: user.total_leaves,
    };
  });

  const columns: GridColDef<(typeof rows)[number]>[] = [
    { field: "id", headerName: "ID", width: 90 },
    {
      field: "firstName",
      headerName: "First name",
      width: 150,
      editable: false,
    },
    {
      field: "lastName",
      headerName: "Last name",
      width: 150,
      editable: false,
    },

    {
      field: "fullName",
      headerName: "Full name",
      description: "This column has a value getter and is not sortable.",
      sortable: false,
      width: 160,
      valueGetter: (_, row) => `${row.firstName || ""} ${row.lastName || ""}`,
    },
    {
      field: "email",
      headerName: "Email",
      width: 270,
      editable: false,
    },
    {
      field: "designation",
      headerName: "Designation",
      width: 150,
      editable: false,
    },
    {
      field: "gender",
      headerName: "Gender",
      width: 150,
      editable: false,
    },
    {
      field: "contact",
      headerName: "Contact Number",
      width: 150,
      editable: false,
    },
    {
      field: "total_leaves",
      headerName: "Total Leave",
      width: 150,
      editable: false,
    },
    {
      field: "manager",
      headerName: "Manager",
      width: 150,
      editable: false,
    },
  ];
  return (
    <DataGrid
      slots={{ toolbar: DataGridToolbar, baseButton: Button }}
      rows={rows}
      columns={columns}
      onRowClick={(e) => navigate(`/${e.id}`)}
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
      sx={{ height: "42rem !important" }}
    />
  );
}
