import express from "express";
import { calendarData, handleGetCalendarData } from "../controllers/calender";

const router = express.Router();

// Define routes with proper types
router.route("/calenderData").get(calendarData).post(handleGetCalendarData);

export default router;
