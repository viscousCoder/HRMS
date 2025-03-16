"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const calender_1 = require("../controllers/calender");
const router = express_1.default.Router();
// Define routes with proper types
router.route("/calenderData").get(calender_1.calendarData).post(calender_1.handleGetCalendarData);
exports.default = router;
