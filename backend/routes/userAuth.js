const express = require("express");
const router = express.Router();

const {
  handleUserRegister,
  handleUserSignin,
  handleGetUserDetails,
  handleCurrEmployeePersonalData,
  // handleSendReferral,
  handleSendReferral,
  handleUpdateReferral,
  // handleUpdateReferralAssign,
  getAssignedCandidatesForManager,
  updateReferralAssignmentStatus,
} = require("../controllers/userAuth");
const upload = require("../middleware/uploadMiddleware");

//regiert router
router.post("/register", handleUserRegister);
router.post("/login", handleUserSignin);
router.get("/getDetails", handleGetUserDetails);
router.post("/currentUserPerUpdate", handleCurrEmployeePersonalData);
router.post("/referral", upload.single("resume_file"), handleSendReferral);
router.post(
  "/referral/update",
  upload.single("resume_file"),
  handleUpdateReferral
);
router.get("/referral/assignlist/:managerId", getAssignedCandidatesForManager);
// router.post("/referral/asign/update", handleUpdateReferralAssign);
router.patch("/referral/assign/update", updateReferralAssignmentStatus);

module.exports = router;
