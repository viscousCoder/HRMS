import { Box, Card, CardContent, CardHeader, Typography } from "@mui/material";
import React from "react";
import Home from "../component/HomeBrodcast/Home.tsx";

const HomeBroadcast = () => {
  // console.log(localStorage.getItem("token"));
  return (
    // <Box sx={{ width: "100%", height: "100%" }}>
    //   <Card
    //     sx={{ backgroundColor: "gray", maxHeight: "50rem", height: "50rem" }}
    //   >
    //     <CardHeader title="Broadcast Page" />
    //     <CardContent sx={{ maxHeight: "100%", overflow: "auto", mb: 10 }}>
    //       <Home />
    //     </CardContent>
    //   </Card>
    //   {/* <Home /> */}
    // </Box>
    <Box
      sx={{
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Card sx={{ backgroundColor: "gray", maxWidth: "100%", height: "50rem" }}>
        <CardHeader title="Broadcast Page" />
        <CardContent
          sx={{
            height: "calc(100% - 64px)",
            overflowY: "auto",
            paddingBottom: 2,
          }}
        >
          {/* Ensure Home component fits well */}
          <Home />
        </CardContent>
      </Card>
    </Box>
  );
};

export default HomeBroadcast;
