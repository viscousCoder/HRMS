import { Box, Card, CardContent, Container, Typography } from "@mui/material";
import React from "react";
import style from "./Home.module.css";

const Home = () => {
  const data = [
    "This is the card1",
    "This is the card1",
    "This is the card1",
    "This is the card1",
    "This is the card1",
  ];
  return (
    <Box>
      <Container className={style.container}>
        {/* <Typography variant="h4">Hello Everyone</Typography> */}
        {data?.map((item, index) => (
          <Card key={index} className={style.card}>
            <CardContent>{item}</CardContent>
          </Card>
        ))}
      </Container>
    </Box>
  );
};

export default Home;
