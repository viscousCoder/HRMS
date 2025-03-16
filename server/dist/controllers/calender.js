"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.calendarData = calendarData;
exports.handleGetCalendarData = handleGetCalendarData;
const db_config_1 = require("../database/db.config");
const CalendarData_1 = require("../entities/CalendarData");
function calendarData(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const AppDataSource = yield (0, db_config_1.getConnection)();
            if (!req.employee) {
                res.status(401).json({ message: "Unauthorized" });
                return;
            }
            const calendarRepository = AppDataSource.getRepository(CalendarData_1.CalendarData);
            const calendarEntries = yield calendarRepository.find({
                where: [
                    { employee: { id: req.employee.employeeid } },
                    { everyone: true },
                ],
                relations: ["employee"],
            });
            res.status(200).json(calendarEntries);
        }
        catch (error) {
            console.error("Database query failed:", error);
            res.status(500).json({ message: "Internal Server Error" });
        }
    });
}
function handleGetCalendarData(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            if (!req.employee) {
                res.status(401).json({ message: "Unauthorized" });
                return;
            }
            const AppDataSource = yield (0, db_config_1.getConnection)();
            const calendarRepository = AppDataSource.getRepository(CalendarData_1.CalendarData);
            const payload = req.body.payload;
            console.log(payload, "Data here");
            if (payload) {
                const newCalendarEntry = calendarRepository.create({
                    employee: { id: req.employee.employeeid },
                    calendar_data: payload,
                    everyone: payload.isEveryone,
                });
                yield calendarRepository.save(newCalendarEntry);
                res.status(200).json({ message: "Successfully added" });
            }
            else {
                res.status(400).json({ message: "Invalid payload" });
            }
        }
        catch (error) {
            console.error("Database insert failed:", error);
            res.status(500).json({ message: "Internal Server Error" });
        }
    });
}
// export async function handleGetCalenderData(
//   req: AuthenticatedRequest,
//   res: Response
// ): Promise<void> {
//   try {
//     if (!req.employee) {
//       res.status(401).json({ message: "Unauthorized" });
//       return;
//     }
//     const db = await getConnection();
//     const payload: CalendarPayload | undefined = req.body.payload;
//     if (payload) {
//       await db.query(
//         `INSERT INTO calender_data(employee_id, calender_data, everyone) VALUES ($1, $2, $3)`,
//         [req.employee.employeeid, payload.calender_data, payload.isEveryone]
//       );
//       res.status(200).json({ message: "Successfully added" });
//     } else {
//       res.status(400).json({ message: "Invalid payload" });
//     }
//   } catch (error) {
//     console.error("Database insert failed:", error);
//     res.status(500).json({ message: "Internal Server Error" });
//   }
// }
