"use strict";
// const express = require("express");
// const router = express.Router();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// const {
//   handleUserRegister,
//   handleUserSignin,
//   handleGetUserDetails,
//   handleCurrEmployeePersonalData,
//   handleSendReferral,
//   handleUpdateReferral,
//   getAssignedCandidatesForManager,
//   updateReferralAssignmentStatus,
//   handleTodoCreation,
//   handleGetTodoItem,
//   handleTodoUpdate,
//   handleTodoDelete,
//   handleAllEmployeeData,
//   handleBlobCreation,
//   getAllBlobs,
// } = require("../controllers/userAuth");
// const upload = require("../middleware/uploadMiddleware");
// //regiert router
// router.post("/register", handleUserRegister);
// router.post("/login", handleUserSignin);
// router.get("/getDetails", handleGetUserDetails);
// router.post("/currentUserPerUpdate", handleCurrEmployeePersonalData);
// router.post("/referral", upload.single("resume_file"), handleSendReferral);
// router.post(
//   "/referral/update",
//   upload.single("resume_file"),
//   handleUpdateReferral
// );
// router.get("/referral/assignlist/:managerId", getAssignedCandidatesForManager);
// // router.post("/referral/asign/update", handleUpdateReferralAssign);
// router.patch("/referral/assign/update", updateReferralAssignmentStatus);
// /**create todo */
// router.post("/todo", handleTodoCreation);
// router.get("/todo/:status", handleGetTodoItem);
// router.patch("/todo/:id", handleTodoUpdate);
// router.delete("/todo/:id", handleTodoDelete);
// /**getting all employeeList */
// router.get("/get/allEmployee", handleAllEmployeeData);
// /** blog */
// router.post("/post/blog", handleBlobCreation);
// router.get("/blog", getAllBlobs);
// export default router;
const express_1 = __importDefault(require("express"));
const uploadMiddleware_1 = __importDefault(require("../middleware/uploadMiddleware"));
const userAuth_1 = require("../controllers/userAuth");
const router = express_1.default.Router();
// Register and login routes
router.post("/register", userAuth_1.handleUserRegister);
router.post("/login", userAuth_1.handleUserSignin);
// User details routes
router.get("/getDetails", userAuth_1.handleGetUserDetails);
router.post("/currentUserPerUpdate", userAuth_1.handleCurrEmployeePersonalData);
// Referral routes
router.post("/referral", uploadMiddleware_1.default.single("resume_file"), userAuth_1.handleSendReferral);
router.post("/referral/update", uploadMiddleware_1.default.single("resume_file"), userAuth_1.handleUpdateReferral);
router.get("/referral/assignlist/:managerId", userAuth_1.getAssignedCandidatesForManager);
router.patch("/referral/assign/update", userAuth_1.updateReferralAssignmentStatus);
// Todo routes
router.post("/todo", userAuth_1.handleTodoCreation);
router.get("/todo/:status", userAuth_1.handleGetTodoItem);
router.patch("/todo/:id", userAuth_1.handleTodoUpdate);
router.delete("/todo/:id", userAuth_1.handleTodoDelete);
// Employee data routes
router.get("/get/allEmployee", userAuth_1.handleAllEmployeeData);
// Blog routes
router.post("/post/blog", userAuth_1.handleBlobCreation);
router.get("/blog", userAuth_1.getAllBlobs);
exports.default = router;
