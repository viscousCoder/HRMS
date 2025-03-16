import { Request } from "express";

export interface AuthenticatedRequest extends Request {
  employee?: {
    employeeid: number;
    employeeEmail: string;
    employeeFirstName: string;
    employeeLastName: string;
  };
}
