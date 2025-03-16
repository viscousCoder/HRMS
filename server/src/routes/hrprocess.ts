import express from "express";
import {
  handleEmployeesList,
  handleEmployeeDetails,
  handleUpdateEmployeeDetails,
  handleUpdateEmployeeLeaves,
  handleReferralList,
  handleReferralAssign,
  handleGetAssignedManagers,
  updateReferralCandidate,
} from "../controllers/hrprocess";

const router = express.Router();

// Define routes with proper types
router.get("/employeeslist", handleEmployeesList);
router.get("/getEmployeeDetails", handleEmployeeDetails);
router.post("/updateUserdetails", handleUpdateEmployeeDetails);
router.post("/updateemployeeleaves", handleUpdateEmployeeLeaves);
router.get("/referral/list", handleReferralList);
router.patch("/referral/update", updateReferralCandidate);
router.post("/referral/assign", handleReferralAssign);

router.get(
  "/referral/assigned-managers/:referralId",
  handleGetAssignedManagers
);

export default router;
