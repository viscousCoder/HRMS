const { handleCheckingToken } = require("../services/token");

async function handleAuthetication(req, res, next) {
  // console.log(req.query);
  const token = req.header("x-token") || req.body.token;
  if (!token) {
    return next();
  }
  const employee = await handleCheckingToken(token);
  req.employee = employee;

  return next();
}

function handleAutharization(roles) {
  return function (req, res, next) {
    if (!req.employee) {
      return res.status(401).json({ message: "UnAuthorised" });
    }
    if (!roles.includes(req.employee.employeeDesignation))
      return res.status(401).json({ message: "UnAuthorised" });
    next();
  };
}

module.exports = { handleAutharization, handleAuthetication };
