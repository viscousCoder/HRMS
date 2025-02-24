const express = require("express");
const {
  handleEmployeesList,
  handleemployeeDetails,
  handleUpdateEmployeeDeatils,
  handleUpdateEmployeeLeaves,
  handleReferralList,
  handleReferralAssign,
  handleGetAssignedManagers,
  updateReferralCandidate,
} = require("../controllers/hrprocess");
const router = express.Router();

router.get("/employeeslist", handleEmployeesList);
router.get("/getEmployeeDetails", handleemployeeDetails);
router.post("/updateUserdetails", handleUpdateEmployeeDeatils);
router.post("/updateemployeeleaves", handleUpdateEmployeeLeaves);
router.get("/referral/list", handleReferralList);
router.patch("/referral/update", updateReferralCandidate);
router.post("/referral/assign", handleReferralAssign);

router.get(
  "/referral/assigned-managers/:referralId",
  handleGetAssignedManagers
);

module.exports = router;
