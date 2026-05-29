const express = require("express");

const router = express.Router();

const {
  getAdminStats,
  getAllCourses,
  addCourse,
  updateCourse,
  deleteCourse,
  getStudents,
  getEnrollments,
} = require(
  "../controllers/adminController"
);

router.get("/stats", getAdminStats);

router.get("/courses", getAllCourses);

router.post("/courses", addCourse);

router.put(
  "/courses/:id",
  updateCourse
);

router.delete(
  "/courses/:id",
  deleteCourse
);

router.get("/students", getStudents);

router.get(
  "/enrollments",
  getEnrollments
);

module.exports = router;