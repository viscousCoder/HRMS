import { Request, Response, NextFunction } from "express";
import { handleCheckingToken } from "../services/token";

interface Employee {
  employeeid: number;
  employeefirstname: string;
  employeelastname: string;
  employeeemail: string;
  employeedesignation: string;
  employeegender: string;
  employeephonenumber: string;
  iat?: number; // Issued at timestamp (from JWT)
}

interface AuthenticatedRequest extends Request {
  employee?: Employee | null;
}

export async function handleAuthentication(
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
): Promise<void> {
  const token = req.header("x-token") || req.body.token;

  if (!token) {
    return next();
  }

  try {
    const employee = await handleCheckingToken(token);
    req.employee = employee;
  } catch (error) {
    console.error("Token verification failed:", error);
  }

  return next();
}

// export function handleAuthorization(roles: string[]) {
//   return function (
//     req: AuthenticatedRequest,
//     res: Response,
//     next: NextFunction
//   ): Response | void {
//     if (!req.employee) {
//       return res.status(401).json({ message: "Unauthorized" });
//     }

//     if (!roles.includes(req.employee.employeeDesignation)) {
//       return res.status(401).json({ message: "Unauthorized" });
//     }

//     next();
//   };
// }
export function handleAuthorization(roles: string[]) {
  return function (
    req: AuthenticatedRequest,
    res: Response,
    next: NextFunction
  ): void {
    if (!req.employee) {
      res.status(401).json({ message: "Unauthorized" });
      return;
    }
    if (!roles.includes(req.employee.employeedesignation)) {
      res.status(403).json({ message: "Forbidden: Insufficient permissions" });
      return;
    }

    next();
  };
}
