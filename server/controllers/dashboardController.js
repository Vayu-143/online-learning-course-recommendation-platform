const Course = require("../models/Course");
const Enrollment = require("../models/Enrollment");
const Progress = require("../models/Progress");

exports.getDashboardStats =
  async (req, res) => {
    try {
      const userId =
        req.params.userId;

      const totalCourses =
        await Course.countDocuments();

      const enrolledCourses =
        await Enrollment.countDocuments({
          user: userId,
        });

      const completedCourses =
        await Progress.countDocuments({
          user: userId,
          progress: 100,
        });

      const progressData =
        await Progress.find({
          user: userId,
        });

      const avgProgress =
        progressData.length > 0
          ? Math.round(
              progressData.reduce(
                (sum, item) =>
                  sum +
                  item.progress,
                0
              ) /
                progressData.length
            )
          : 0;

      res.json({
        totalCourses,
        enrolledCourses,
        completedCourses,
        progress: avgProgress,
      });
    } catch (error) {
      res.status(500).json({
        message:
          error.message,
      });
    }
  };

exports.getProgressChart =
  async (req, res) => {
    try {
      const progress =
        await Progress.find({
          user:
            req.params.userId,
        }).populate("course");

      const chartData =
        progress.map(
          (item) => ({
            course:
              item.course.title,
            progress:
              item.progress,
          })
        );

      res.json(chartData);
    } catch (error) {
      res.status(500).json({
        message:
          error.message,
      });
    }
  };