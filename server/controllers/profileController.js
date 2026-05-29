const User = require("../models/User");
const Enrollment = require("../models/Enrollment");
const Progress = require("../models/Progress");

exports.getProfile =
  async (req, res) => {
    try {
      const user =
        await User.findById(
          req.params.userId
        );

      const enrolledCourses =
        await Enrollment.countDocuments({
          user: req.params.userId,
        });

      const completedCourses =
        await Progress.countDocuments({
          user: req.params.userId,
          progress: 100,
        });

      res.json({
        ...user.toObject(),
        enrolledCourses,
        completedCourses,
      });
    } catch (error) {
      res.status(500).json({
        message: error.message,
      });
    }
  };