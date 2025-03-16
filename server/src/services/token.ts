import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const secret = process.env.JWTSECRETKEY as string;

if (!secret) {
  throw new Error("JWTSECRETKEY is not defined in the environment variables");
}

interface Employee {
  employeeid: number;
  employeefirstname: string;
  employeelastname: string;
  employeeemail: string;
  employeedesignation: string;
  employeegender: string;
  employeephonenumber: string;
  iat?: number; // Issued at timestamp (optional for token payload)
}

export async function handleGenerateToken(employee: Employee): Promise<string> {
  const payload: Employee = {
    employeeid: employee.employeeid,
    employeefirstname: employee.employeefirstname,
    employeelastname: employee.employeelastname,
    employeeemail: employee.employeeemail,
    employeedesignation: employee.employeedesignation,
    employeegender: employee.employeegender,
    employeephonenumber: employee.employeephonenumber,
  };

  return jwt.sign(payload, secret);
}

export async function handleCheckingToken(
  token: string
): Promise<Employee | null> {
  try {
    const payload = jwt.verify(token, secret) as Employee;
    return payload;
  } catch (error) {
    console.error("Token verification failed:", error);
    return null;
  }
}
