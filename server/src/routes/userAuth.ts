// const express = require("express");
// const router = express.Router();

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

import express from "express";
import upload from "../middleware/uploadMiddleware";

import {
  handleUserRegister,
  handleUserSignin,
  handleGetUserDetails,
  handleCurrEmployeePersonalData,
  handleSendReferral,
  handleUpdateReferral,
  getAssignedCandidatesForManager,
  updateReferralAssignmentStatus,
  handleTodoCreation,
  handleGetTodoItem,
  handleTodoUpdate,
  handleTodoDelete,
  handleAllEmployeeData,
  handleBlobCreation,
  getAllBlobs,
} from "../controllers/userAuth";

const router = express.Router();

// Register and login routes
router.post("/register", handleUserRegister);
router.post("/login", handleUserSignin);

// User details routes
router.get("/getDetails", handleGetUserDetails);
router.post("/currentUserPerUpdate", handleCurrEmployeePersonalData);

// Referral routes
router.post("/referral", upload.single("resume_file"), handleSendReferral);
router.post(
  "/referral/update",
  upload.single("resume_file"),
  handleUpdateReferral
);
router.get("/referral/assignlist/:managerId", getAssignedCandidatesForManager);
router.patch("/referral/assign/update", updateReferralAssignmentStatus);

// Todo routes
router.post("/todo", handleTodoCreation);
router.get("/todo/:status", handleGetTodoItem);
router.patch("/todo/:id", handleTodoUpdate);
router.delete("/todo/:id", handleTodoDelete);

// Employee data routes
router.get("/get/allEmployee", handleAllEmployeeData);

// Blog routes
router.post("/post/blog", handleBlobCreation);
router.get("/blog", getAllBlobs);

export default router;
