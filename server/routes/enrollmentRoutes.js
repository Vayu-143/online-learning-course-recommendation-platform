const express = require("express");
const router = express.Router();

const Enrollment = require("../models/Enrollment");
const Progress = require("../models/Progress");

const {
  enrollCourse,
  getMyCourses,
  updateProgress,
  getProgress,
} = require("../controllers/enrollmentController");

// Enroll Course
router.post("/", enrollCourse);

// Progress Routes FIRST
router.post("/progress", updateProgress);

router.get(
  "/progress/:userId",
  getProgress
);

// Get My Courses
router.get("/:userId", getMyCourses);

// Exit Course
router.delete(
  "/:userId/:courseId",
  async (req, res) => {
    try {
      const { userId, courseId } =
        req.params;

      await Enrollment.findOneAndDelete({
        user: userId,
        course: courseId,
      });

      await Progress.findOneAndDelete({
        user: userId,
        course: courseId,
      });

      res.json({
        message:
          "Course Unenrolled Successfully",
      });
    } catch (error) {
      res.status(500).json({
        message: error.message,
      });
    }
  }
);

module.exports = router;