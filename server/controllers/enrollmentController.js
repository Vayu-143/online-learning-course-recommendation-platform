const Enrollment = require("../models/Enrollment");
const Progress = require("../models/Progress");

// Enroll User
exports.enrollCourse = async (req, res) => {
  try {
    const { userId, courseId } = req.body;

    const exists = await Enrollment.findOne({
      user: userId,
      course: courseId,
    });

    if (exists) {
      return res.status(400).json({
        message: "Already enrolled",
      });
    }

    const enrollment = await Enrollment.create({
      user: userId,
      course: courseId,
    });

    // Create Progress Record
    await Progress.create({
      user: userId,
      course: courseId,
      progress: 0,
    });

    res.status(201).json(enrollment);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Get My Courses
exports.getMyCourses = async (req, res) => {
  try {
    const courses = await Enrollment.find({
      user: req.params.userId,
    }).populate("course");

    res.json(courses);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Update Progress
exports.updateProgress = async (req, res) => {
  try {
    const {
      userId,
      courseId,
      progress,
    } = req.body;

    const updated =
      await Progress.findOneAndUpdate(
        {
          user: userId,
          course: courseId,
        },
        {
          user: userId,
          course: courseId,
          progress,
        },
        {
          new: true,
          upsert: true,
        }
      );

    res.json(updated);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Get Progress
exports.getProgress = async (req, res) => {
  try {
    const progress = await Progress.find({
      user: req.params.userId,
    }).populate("course");

    res.json(progress);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};