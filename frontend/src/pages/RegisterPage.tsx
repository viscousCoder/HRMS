import React from "react";
import { Grid, Box, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import Register from "../component/Register.tsx";

const RegisterPage: React.FC = () => {
  return (
    <Grid container sx={{ height: "100vh" }}>
      {/* Left Side (Image Section) */}
      <Grid
        item
        xs={12}
        md={6}
        sx={{
          backgroundImage:
            "url('https://www.shutterstock.com/image-vector/new-user-online-registration-sign-260nw-1982734163.jpg')", // Replace with your image path
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      ></Grid>

      {/* Right Side (Form Section) */}
      <Grid
        item
        xs={12}
        md={6}
        sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}
      >
        <Box sx={{ width: "100%", maxWidth: 400, p: 4 }}>
          <Register />
          <Typography textAlign="center" mt={2}>
            Already have an account?{" "}
            <Link to="/login" style={{ textDecoration: "none" }}>
              <Typography
                component="span"
                color="primary"
                sx={{ cursor: "pointer" }}
              >
                Login
              </Typography>
            </Link>
          </Typography>
        </Box>
      </Grid>
    </Grid>
  );
};

export default RegisterPage;
