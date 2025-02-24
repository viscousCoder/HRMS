import { Box, Typography } from "@mui/material";
import React from "react";
import Home from "../component/HomeBrodcast/Home.tsx";

const HomeBroadcast = () => {
  // console.log(localStorage.getItem("token"));
  return (
    <Box>
      <Typography variant="h5">This is the broadcast</Typography>
      <Home />
    </Box>
  );
};

export default HomeBroadcast;
