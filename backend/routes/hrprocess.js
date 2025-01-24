const express = require("express");
const {
  handleEmployeesList,
  handleemployeeDetails,
  handleUpdateEmployeeDeatils,
  handleUpdateEmployeeLeaves,
} = require("../controllers/hrprocess");
const router = express.Router();

router.get("/employeeslist", handleEmployeesList);
router.get("/getEmployeeDetails", handleemployeeDetails);
router.post("/updateUserdetails", handleUpdateEmployeeDeatils);
router.post("/updateemployeeleaves", handleUpdateEmployeeLeaves);

module.exports = router;
