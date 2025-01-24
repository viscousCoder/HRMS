const express = require("express");
const router = express.Router();

const {
  handleUserRegister,
  handleUserSignin,
  handleGetUserDetails,
  handleemployeeDetails,
} = require("../controllers/userAuth");

//regiert router
router.post("/register", handleUserRegister);
router.post("/login", handleUserSignin);
router.get("/getDetails", handleGetUserDetails);

module.exports = router;
