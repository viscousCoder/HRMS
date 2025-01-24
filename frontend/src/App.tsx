import React from "react";
import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Rootfile from "./component/Rootfile.tsx";
import RegisterPage from "./pages/RegisterPage.tsx";
import LoginPage from "./pages/LoginPage.tsx";
import HomeBroadcast from "./pages/HomeBroadcast.tsx";
import { checkAuthLoader } from "./utils/checkAuth.tsx";
import EmployeesListPage from "./pages/EmployeesListPage/EmployeesListPage.tsx";
import AttendancePage from "./pages/AttendancePage/AttendancePage.tsx";
import EmployeeDetails from "./pages/EmployeeDetailsPage/EmployeeDetails.tsx";

function App() {
  const router = createBrowserRouter([
    {
      path: "/register",
      element: <RegisterPage />,
    },
    {
      path: "/login",
      element: <LoginPage />,
    },
    {
      path: "/",
      element: <Rootfile />,
      loader: checkAuthLoader,
      children: [
        {
          path: "/",
          element: <HomeBroadcast />,
        },
        {
          path: "/attendance",
          element: <AttendancePage />,
        },
        {
          path: "EmployeeList",
          element: <EmployeesListPage />,
        },
        {
          path: ":id",
          element: <EmployeeDetails />,
        },
      ],
    },
  ]);
  return <RouterProvider router={router} />;
}

export default App;
