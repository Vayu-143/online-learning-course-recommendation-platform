const express = require("express");
const router = express.Router();

const {
  getDashboardStats,
  getProgressChart,
} = require("../controllers/dashboardController");

router.get(
  "/chart/:userId",
  getProgressChart
);

router.get(
  "/:userId",
  getDashboardStats
);

module.exports = router;