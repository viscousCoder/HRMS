import React, { useState } from "react";
import Attendance from "../../component/Attendance/Attendance.tsx";
import { Box, Button, Typography } from "@mui/material";

const AttendancePage = () => {
  const [isClicked, setIsClicked] = useState(false);
  return (
    <div>
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <Typography variant="h4">Calender</Typography>
        <Button
          variant="contained"
          onClick={() => setIsClicked((prev) => !prev)}
        >
          {isClicked ? "Step Out" : "Step In"}
        </Button>
      </Box>

      <Attendance isClicked={isClicked} />
    </div>
  );
};

export default AttendancePage;
