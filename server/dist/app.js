"use strict";
// import dotenv from "dotenv";
// import express, { Request, Response, NextFunction } from "express";
// import { Pool } from "pg";
// import cors from "cors";
// import cloudinary from "cloudinary";
// import { getConnection } from "./database/db.config";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
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
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const db_config_1 = require("./database/db.config");
const userAuth_1 = __importDefault(require("./routes/userAuth"));
const hrprocess_1 = __importDefault(require("./routes/hrprocess"));
const calender_1 = __importDefault(require("./routes/calender"));
const Authmiddleware_1 = require("./middleware/Authmiddleware");
// import { initializeDatabase } from "./database/initializeDb";
const app = (0, express_1.default)();
const port = process.env.SERVERPORT || 3000;
app.use(express_1.default.json());
app.use((0, cors_1.default)({
    origin: "http://localhost:3000",
    methods: ["PUT", "POST", "DELETE", "GET", "PATCH"],
    credentials: true,
}));
function init() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield (0, db_config_1.getConnection)();
            app.use(express_1.default.urlencoded({ extended: true }));
            app.use(express_1.default.json());
            app.use(Authmiddleware_1.handleAuthentication);
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
            app.use("/", userAuth_1.default);
            app.use("/", calender_1.default);
            app.use("/", (0, Authmiddleware_1.handleAuthorization)(["hr"]), hrprocess_1.default);
            app.listen(port, () => console.log(`Server is running at port ${port}`));
        }
        catch (err) {
            console.error(`Error connecting to the database: ${err}`);
        }
    });
}
init();
