const Course = require("../models/Course");
const User = require("../models/User");
const Enrollment = require("../models/Enrollment");

exports.getAdminStats = async (req, res) => {
  try {
    const courses = await Course.countDocuments();
    const students = await User.countDocuments();
    const enrollments =
      await Enrollment.countDocuments();

    res.json({
      courses,
      students,
      enrollments,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

exports.getAllCourses = async (req, res) => {
  const courses = await Course.find();
  res.json(courses);
};

exports.addCourse = async (req, res) => {
  const course = await Course.create(req.body);
  res.json(course);
};

exports.updateCourse = async (req, res) => {
  const course =
    await Course.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

  res.json(course);
};

exports.deleteCourse = async (req, res) => {
  await Course.findByIdAndDelete(
    req.params.id
  );

  res.json({
    message:
      "Course Deleted Successfully",
  });
};

exports.getStudents = async (req, res) => {
  const students = await User.find();

  res.json(students);
};

exports.getEnrollments = async (
  req,
  res
) => {
  const enrollments =
    await Enrollment.find()
      .populate("user")
      .populate("course");

  res.json(enrollments);
};