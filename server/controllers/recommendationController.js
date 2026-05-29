const User = require("../models/User");
const Course = require("../models/Course");
const Enrollment = require("../models/Enrollment");

exports.getRecommendations = async (
  req,
  res
) => {
  try {
    const userId = req.params.userId;

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    const enrollments =
      await Enrollment.find({
        user: userId,
      });

    const enrolledIds =
      enrollments.map((e) =>
        e.course.toString()
      );

    const courses = await Course.find();

    const recommendations =
      courses.filter((course) => {
        const interestMatch =
          user.interests.some((interest) =>
            course.tags.includes(interest)
          );

        const skillMatch =
          user.skills.some((skill) =>
            course.tags.includes(skill)
          );

        const notEnrolled =
          !enrolledIds.includes(
            course._id.toString()
          );

        return (
          (interestMatch || skillMatch) &&
          notEnrolled
        );
      });

    res.json(recommendations);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};