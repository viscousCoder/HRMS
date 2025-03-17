// import dotenv from "dotenv";
// import express, { Request, Response, NextFunction } from "express";
// import { Pool } from "pg";
// import cors from "cors";
// import cloudinary from "cloudinary";
// import { getConnection } from "./database/db.config";

// // import { getConnection } from "./database/database";
// // import userAuthRouter from "./routes/userAuth";
// // import hrRouter from "./routes/hrprocess";
// // import calenderRouter from "./routes/calender";
// // import {
// //   handleAuthetication,
// //   handleAutharization,
// // } from "./middleware/Authmiddleware";
// // import { initializeDatabase } from "./database/initializeDb";

// // Load environment variables
// dotenv.config();

// const app = express();
// const port: string = process.env.SERVERPORT || "30012"; // Default to port 3000 if not specified

// // Set up middleware
// app.use(express.json());
// app.use(
//   cors({
//     origin: "http://localhost:3000",
//     methods: "PUT,POST,DELETE,GET",
//     credentials: true,
//   })
// );

// // Function to initialize the server
// // async function init(): Promise<void> {
// //   try {
// //     // Cloudinary configuration (optional)
// //     // cloudinary.config({
// //     //   cloud_name: process.env.CLOUDINARY_NAME,
// //     //   api_key: process.env.CLOUDINARY_API_KEY,
// //     //   api_secret: process.env.CLOUDINARY_API_SECRET,
// //     // });

// //     // Get the DB connection
// //     const db = await getConnection();
// //     console.log("success");
// //     app.use(express.urlencoded({ extended: true }));
// //     app.use(express.json());

// //     // Authentication middleware
// //     // app.use(handleAuthetication);

// //     // Initialize the database
// //     // await initializeDatabase();

// //     // Default route
// //     // app.get("/", async (req: Request, res: Response) => {
// //     //   try {
// //     //     const result = await db.query("SELECT * FROM testtables WHERE id = 1");
// //     //     res.json(result.rows);
// //     //   } catch (error) {
// //     //     console.error("Error executing query", error);
// //     //     res.status(500).send("Error executing query");
// //     //   }
// //     // });

// //     // User routes
// //     // app.use("/", userAuthRouter);
// //     // app.use("/", calenderRouter);
// //     // app.use("/", handleAutharization(["HR"]), hrRouter);

// //     // Start the server
// //     app.listen(port, () => console.log(`Server is running at port ${port}`));
// //   } catch (err) {
// //     console.log(`Error connecting to the database: ${err}`);
// //   }
// // }
// async function init(): Promise<void> {
//   try {
//     // Initialize the database connection
//     const db = await getConnection();
//     console.log("Database connection established successfully.");

//     // Middleware setup
//     app.use(express.urlencoded({ extended: true }));
//     app.use(express.json());

//     // Define routes and middleware here

//     // Start the server
//     app.listen(port, () => console.log(`Server is running at port ${port}`));
//   } catch (err) {
//     console.error("Error connecting to the database:", err);
//     process.exit(1); // Exit the process with a failure code
//   }
// }

// // Call init function to start the server
// init();

require("dotenv").config();
import express, { Application, Request, Response } from "express";
import cors from "cors";
import { getConnection } from "./database/db.config";
import userAuthRouter from "./routes/userAuth";
import hrRouter from "./routes/hrprocess";
import calenderRouter from "./routes/calender";
import {
  handleAuthentication,
  handleAuthorization,
} from "./middleware/Authmiddleware";
// import { initializeDatabase } from "./database/initializeDb";

const app: Application = express();
const port = process.env.SERVERPORT || 3000;

app.use(express.json());
app.use(
  cors({
    // origin: "http://localhost:3000",
    origin: "https://rainbow-kitsune-0d972c.netlify.app",
    methods: ["PUT", "POST", "DELETE", "GET", "PATCH"],
    credentials: true,
  })
);

async function init() {
  try {
    await getConnection();

    app.use(express.urlencoded({ extended: true }));
    app.use(express.json());
    app.use(handleAuthentication);

    // await initializeDatabase();

    // // Test route
    // app.get("/", async (req: Request, res: Response) => {
    //   try {
    //     const result = await db.query("SELECT * FROM testtables WHERE id = 1");
    //     res.json(result.rows);
    //   } catch (error) {
    //     console.error("Error executing query", error);
    //     res.status(500).send("Error executing query");
    //   }
    // });

    // User and HR routes
    app.use("/", userAuthRouter);
    app.use("/", calenderRouter);
    app.use("/", handleAuthorization(["hr"]), hrRouter);

    app.listen(port, () => console.log(`Server is running at port ${port}`));
  } catch (err) {
    console.error(`Error connecting to the database: ${err}`);
  }
}

init();
