import { useEffect, useState } from "react";
import axios from "axios";

function Courses({ darkMode }) {
  const [courses, setCourses] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] =
    useState("All");

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5000/api/courses"
      );

      setCourses(res.data);
    } catch (err) {
      console.log(err);
      alert("Failed to load courses");
    }
  };

  const enrollCourse = async (
    courseId
  ) => {
    try {
      const user = JSON.parse(
        localStorage.getItem("user")
      );

      await axios.post(
        "http://localhost:5000/api/enrollments",
        {
          userId: user._id,
          courseId,
        }
      );

      alert(
        "Course Enrolled Successfully"
      );
    } catch (err) {
      console.log(err);

      if (
        err.response &&
        err.response.data &&
        err.response.data.message
      ) {
        alert(
          err.response.data.message
        );
      } else {
        alert("Enrollment Failed");
      }
    }
  };

  const filteredCourses = courses
    .filter((course) =>
      course.title
        .toLowerCase()
        .includes(
          search.toLowerCase()
        )
    )
    .filter(
      (course) =>
        category === "All" ||
        course.category ===
          category
    );

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
      <h1
        style={{
          marginBottom: "20px",
        }}
      >
        📚 Courses
      </h1>

      {/* Search + Filter */}
      <div
        style={{
          display: "flex",
          gap: "15px",
          marginBottom: "25px",
          flexWrap: "wrap",
        }}
      >
        <input
          type="text"
          placeholder="Search Courses..."
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
          style={{
            flex: 1,
            minWidth: "250px",
            padding: "12px",
            borderRadius: "8px",
            border:
              "1px solid #ccc",
            fontSize: "16px",
          }}
        />

        <select
          value={category}
          onChange={(e) =>
            setCategory(
              e.target.value
            )
          }
          style={{
            padding: "12px",
            borderRadius: "8px",
            border:
              "1px solid #ccc",
            fontSize: "16px",
          }}
        >
          <option value="All">
            All Categories
          </option>

          <option value="AI">
            AI
          </option>

          <option value="Security">
            Security
          </option>

          <option value="Web Development">
            Web Development
          </option>

          <option value="Data Science">
            Data Science
          </option>
        </select>
      </div>

      {/* Courses */}
      {filteredCourses.length ===
      0 ? (
        <p>
          No courses found for the
          selected filter.
        </p>
      ) : (
        filteredCourses.map(
          (course) => (
            <div
              key={course._id}
              style={{
                background:
                  darkMode
                    ? "#1f2937"
                    : "#fff",
                color:
                  darkMode
                    ? "#fff"
                    : "#000",
                padding:
                  "20px",
                marginBottom:
                  "20px",
                borderRadius:
                  "12px",
                boxShadow:
                  "0px 2px 10px rgba(0,0,0,0.15)",
              }}
            >
              <h2>
                {course.title}
              </h2>

              <p>
                {
                  course.description
                }
              </p>

              <p>
                <strong>
                  Category:
                </strong>{" "}
                {
                  course.category
                }
              </p>

              <button
                onClick={() =>
                  enrollCourse(
                    course._id
                  )
                }
                style={{
                  background:
                    "#4f46e5",
                  color:
                    "white",
                  border:
                    "none",
                  padding:
                    "10px 15px",
                  borderRadius:
                    "6px",
                  cursor:
                    "pointer",
                  marginTop:
                    "10px",
                }}
              >
                Enroll Now
              </button>
            </div>
          )
        )
      )}
    </div>
  );
}

export default Courses;