const mongoose = require("mongoose");

const lessonSchema = new mongoose.Schema({
  title: String,
  completed: {
    type: Boolean,
    default: false,
  },
});

const courseSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },

    description: {
      type: String,
      required: true,
    },

    category: {
      type: String,
      required: true,
    },

    tags: [
      {
        type: String,
      },
    ],

    lessons: [lessonSchema],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model(
  "Course",
  courseSchema
);