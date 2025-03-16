"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const hrprocess_1 = require("../controllers/hrprocess");
const router = express_1.default.Router();
// Define routes with proper types
router.get("/employeeslist", hrprocess_1.handleEmployeesList);
router.get("/getEmployeeDetails", hrprocess_1.handleEmployeeDetails);
router.post("/updateUserdetails", hrprocess_1.handleUpdateEmployeeDetails);
router.post("/updateemployeeleaves", hrprocess_1.handleUpdateEmployeeLeaves);
router.get("/referral/list", hrprocess_1.handleReferralList);
router.patch("/referral/update", hrprocess_1.updateReferralCandidate);
router.post("/referral/assign", hrprocess_1.handleReferralAssign);
router.get("/referral/assigned-managers/:referralId", hrprocess_1.handleGetAssignedManagers);
exports.default = router;
