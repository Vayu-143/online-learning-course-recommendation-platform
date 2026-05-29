import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function EnrolledCourses({ darkMode }) {
  const [courses, setCourses] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchEnrolledCourses();
  }, []);

  const fetchEnrolledCourses = async () => {
    try {
      const user = JSON.parse(
        localStorage.getItem("user")
      );

      const res = await axios.get(
        `http://localhost:5000/api/enrollments/${user._id}`
      );

      setCourses(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const exitCourse = async (courseId) => {
    try {
      const user = JSON.parse(
        localStorage.getItem("user")
      );

      await axios.delete(
        `http://localhost:5000/api/enrollments/${user._id}/${courseId}`
      );

      alert("Course Exited Successfully");

      fetchEnrolledCourses();
    } catch (err) {
      console.log(err);
      alert("Failed to Exit Course");
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
        color: darkMode ? "#fff" : "#000",
      }}
    >
      <h1>📚 My Enrolled Courses</h1>

      {courses.length === 0 ? (
        <p>No Enrolled Courses</p>
      ) : (
        courses.map((enrollment) => (
          <div
            key={enrollment._id}
            style={{
              background: darkMode
                ? "#1f2937"
                : "#fff",
              padding: "20px",
              marginBottom: "20px",
              borderRadius: "12px",
            }}
          >
            <h2>
              {enrollment.course.title}
            </h2>

            <p>
              {
                enrollment.course
                  .description
              }
            </p>

            <p>
              <strong>
                Category:
              </strong>{" "}
              {
                enrollment.course
                  .category
              }
            </p>

            <div
              style={{
                display: "flex",
                gap: "10px",
                marginTop: "15px",
              }}
            >
              <button
                onClick={() =>
                  navigate(
                    `/course/${enrollment.course._id}`
                  )
                }
                style={{
                  background: "#4f46e5",
                  color: "white",
                  border: "none",
                  padding:
                    "10px 15px",
                  borderRadius:
                    "8px",
                  cursor: "pointer",
                }}
              >
                ▶ Continue Learning
              </button>

              <button
                onClick={() =>
                  exitCourse(
                    enrollment.course
                      ._id
                  )
                }
                style={{
                  background:
                    "#ef4444",
                  color: "white",
                  border: "none",
                  padding:
                    "10px 15px",
                  borderRadius:
                    "8px",
                  cursor: "pointer",
                }}
              >
                ❌ Exit Course
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
}

export default EnrolledCourses;