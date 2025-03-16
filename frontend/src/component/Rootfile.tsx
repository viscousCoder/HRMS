import React from "react";
import Box from "@mui/material/Box";
import Sidebar from "./Sidebar.tsx";
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar.tsx";
import Footer from "./Footer.tsx";

const Rootfile = () => {
  const [isOpen, setIsOpen] = React.useState(true);
  return (
    <>
      <Navbar setIsOpen={setIsOpen} />
      <Box height={50} />
      <Box sx={{ display: "flex" }}>
        <Sidebar isOpen={isOpen} />
        <Box
          sx={{
            flexGrow: 1,
            m: { xs: 4, md: 10 },
            boxSizing: "border-box",
            width: "65%",
            height: "100%",
          }}
        >
          <Outlet />
        </Box>
      </Box>
      {/* <Footer /> */}
    </>
  );
};

export default Rootfile;
