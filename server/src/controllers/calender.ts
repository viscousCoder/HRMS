import { Request, Response } from "express";
import { getConnection } from "../database/db.config";
import { CalendarData } from "../entities/CalendarData";

interface Employee {
  employeeid: number;
}

interface AuthenticatedRequest extends Request {
  employee?: Employee;
}

interface CalendarPayload {
  calendar_data: any;
  isEveryone: boolean;
}

export async function calendarData(
  req: AuthenticatedRequest,
  res: Response
): Promise<void> {
  try {
    const AppDataSource = await getConnection();
    if (!req.employee) {
      res.status(401).json({ message: "Unauthorized" });
      return;
    }

    const calendarRepository = AppDataSource.getRepository(CalendarData);

    const calendarEntries = await calendarRepository.find({
      where: [
        { employee: { id: req.employee.employeeid } },
        { everyone: true },
      ],
      relations: ["employee"],
    });

    res.status(200).json(calendarEntries);
  } catch (error) {
    console.error("Database query failed:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

export async function handleGetCalendarData(
  req: AuthenticatedRequest,
  res: Response
): Promise<void> {
  try {
    if (!req.employee) {
      res.status(401).json({ message: "Unauthorized" });
      return;
    }
    const AppDataSource = await getConnection();
    const calendarRepository = AppDataSource.getRepository(CalendarData);
    const payload: CalendarPayload | undefined = req.body.payload;
    console.log(payload, "Data here");
    if (payload) {
      const newCalendarEntry = calendarRepository.create({
        employee: { id: req.employee.employeeid },
        calendar_data: payload,
        everyone: payload.isEveryone,
      });

      await calendarRepository.save(newCalendarEntry);

      res.status(200).json({ message: "Successfully added" });
    } else {
      res.status(400).json({ message: "Invalid payload" });
    }
  } catch (error) {
    console.error("Database insert failed:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
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
