import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

function CourseDetails({ darkMode }) {
  const { id } = useParams();

  const [course, setCourse] = useState(null);
  const [completedLessons, setCompletedLessons] =
    useState([]);

  const courseLessons = {
    "AI Fundamentals": [
      "Introduction to AI",
      "Machine Learning Basics",
      "Deep Learning Fundamentals",
    ],

    "Machine Learning": [
      "What is Machine Learning",
      "Supervised Learning",
      "Unsupervised Learning",
    ],

    "MERN Stack Development": [
      "HTML & CSS Basics",
      "React Fundamentals",
      "Node.js & Express",
    ],

    "Cyber Security": [
      "Network Security",
      "Ethical Hacking",
      "Cyber Attacks & Prevention",
    ],

    "Data Science": [
      "Python for Data Science",
      "Data Analysis",
      "Data Visualization",
    ],
  };

  useEffect(() => {
    fetchCourse();
    createProgressIfNeeded();
  }, []);

  const fetchCourse = async () => {
    try {
      const res = await axios.get(
        `http://localhost:5000/api/courses/${id}`
      );

      setCourse(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const createProgressIfNeeded = async () => {
    try {
      const user = JSON.parse(
        localStorage.getItem("user")
      );

      const progressRes = await axios.get(
        `http://localhost:5000/api/enrollments/progress/${user._id}`
      );

      const exists = progressRes.data.find(
        (item) => item.course._id === id
      );

      if (!exists) {
        await axios.post(
          "http://localhost:5000/api/enrollments/progress",
          {
            userId: user._id,
            courseId: id,
            progress: 0,
          }
        );
      }
    } catch (err) {
      console.log(err);
    }
  };

  if (!course) {
    return <h2>Loading...</h2>;
  }

  const lessons =
    courseLessons[course.title] || [
      "Lesson 1",
      "Lesson 2",
      "Lesson 3",
    ];

  const markComplete = async (
    lessonIndex
  ) => {
    if (
      completedLessons.includes(lessonIndex)
    ) {
      return;
    }

    const updatedLessons = [
      ...completedLessons,
      lessonIndex,
    ];

    setCompletedLessons(updatedLessons);

    const progress = Math.round(
      (updatedLessons.length /
        lessons.length) *
        100
    );

    try {
      const user = JSON.parse(
        localStorage.getItem("user")
      );

      await axios.post(
        "http://localhost:5000/api/enrollments/progress",
        {
          userId: user._id,
          courseId: id,
          progress,
        }
      );

      alert(
        `Progress Updated: ${progress}%`
      );
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        padding: "30px",
        background: darkMode
          ? "#111827"
          : "#f4f7fc",
        color: darkMode
          ? "#fff"
          : "#000",
      }}
    >
      <h1>{course.title}</h1>

      <p>{course.description}</p>

      <h2>📚 Lessons</h2>

      {lessons.map((lesson, index) => (
        <div
          key={index}
          style={{
            background: darkMode
              ? "#1f2937"
              : "#fff",
            padding: "20px",
            marginBottom: "15px",
            borderRadius: "10px",
            boxShadow:
              "0px 2px 10px rgba(0,0,0,0.15)",
          }}
        >
          <h3>
            Lesson {index + 1}
          </h3>

          <p>{lesson}</p>

          <button
            disabled={completedLessons.includes(
              index
            )}
            onClick={() =>
              markComplete(index)
            }
            style={{
              background:
                completedLessons.includes(
                  index
                )
                  ? "#22c55e"
                  : "#4f46e5",
              color: "white",
              border: "none",
              padding: "10px 15px",
              borderRadius: "8px",
              cursor: "pointer",
            }}
          >
            {completedLessons.includes(
              index
            )
              ? "✅ Completed"
              : "Mark Complete"}
          </button>
        </div>
      ))}
    </div>
  );
}

export default CourseDetails;