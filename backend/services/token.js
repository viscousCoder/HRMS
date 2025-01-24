const jwt = require("jsonwebtoken");
require("dotenv").config();
const secret = process.env.JWTSECRETKEY;

async function handleGenrateToken(employee) {
  const payload = {
    employeeid: employee.id,
    employeefirstName: employee.employeefirstname,
    employeeLastName: employee.employeelastname,
    employeeEmail: employee.employeeemail,
    employeeDesignation: employee.employeedesignation,
    employeeGender: employee.employeegender,
    employeePhoneNumber: employee.employeephonenumber,
  };
  const token = await jwt.sign(payload, secret);
  return token;
}

async function handleCheckingToken(token) {
  const payload = await jwt.verify(token, secret);
  return payload;
}

module.exports = { handleCheckingToken, handleGenrateToken };
