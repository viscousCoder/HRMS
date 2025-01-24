const express = require("express");
const {
  calenderData,
  handleGetCalenderData,
} = require("../controllers/calender");
const router = express.Router();

// router.get("/calender", calenderData);
router.route("/calenderData").get(calenderData).post(handleGetCalenderData);

module.exports = router;
