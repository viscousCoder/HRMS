require("dotenv").config();
const express = require("express");
const pg = require("pg");
const cors = require("cors");

const { getConnection } = require("./database/database");
const userAuthRouter = require("./routes/userAuth");
const hrRouter = require("./routes/hrprocess");
const calenderRouter = require("./routes/calender");
const {
  handleAuthetication,
  handleAutharization,
} = require("./middleware/Authmiddleware");

const app = express();

const port = process.env.SERVERPORT;
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:3000",
    method: "PUT,POST,DELETE,GET",
    credentials: true,
  })
);

async function init() {
  try {
    const db = await getConnection();
    app.use(express.urlencoded({ extended: false }));
    app.use(express.json());
    app.use(handleAuthetication);

    //get route
    app.get("/", async (req, res) => {
      try {
        const result = await db.query("SELECT * FROM testtables WHERE id = 1");
        res.json(result.rows);
      } catch (error) {
        console.error("Error executing query", error);
        res.status(500).send("Error executing query");
      }
    });

    //user routes
    app.use("/", userAuthRouter);
    app.use("/", calenderRouter);
    app.use("/", handleAutharization(["hr"]), hrRouter);

    app.listen(port, () => console.log(`server is runnig at port ${port}`));
  } catch (err) {
    console.log(`Error conecting to the database :${err}`);
  }
}
init();
