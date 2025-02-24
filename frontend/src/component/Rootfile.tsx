import React from "react";
import Box from "@mui/material/Box";
import Sidebar from "./Sidebar.tsx";
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar.tsx";

const Rootfile = () => {
  const [isOpen, setIsOpen] = React.useState(true);
  return (
    <>
      <Navbar setIsOpen={setIsOpen} />
      <Box height={30} />
      <Box sx={{ display: "flex" }}>
        <Sidebar isOpen={isOpen} />
        <Box
          sx={{
            flexGrow: 1,
            m: { xs: 4, md: 10 },
            boxSizing: "border-box",
            width: "65%",
          }}
        >
          <Outlet />
        </Box>
      </Box>
    </>
  );
};

export default Rootfile;
