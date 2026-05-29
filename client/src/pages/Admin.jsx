import { useEffect, useState } from "react";
import API from "../services/api";

function Admin({ darkMode }) {
  const [stats, setStats] = useState({});
  const [courses, setCourses] = useState([]);
  const [students, setStudents] = useState([]);
  const [enrollments, setEnrollments] =
    useState([]);

  const [newCourse, setNewCourse] =
    useState({
      title: "",
      description: "",
      category: "",
    });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const statsRes = await API.get(
        "/admin/stats"
      );

      const courseRes = await API.get(
        "/admin/courses"
      );

      const studentRes = await API.get(
        "/admin/students"
      );

      const enrollRes = await API.get(
        "/admin/enrollments"
      );

      setStats(statsRes.data);
      setCourses(courseRes.data);
      setStudents(studentRes.data);
      setEnrollments(
        enrollRes.data
      );
    } catch (err) {
      console.log(err);
    }
  };

  const addCourse = async () => {
    try {
      await API.post(
        "/admin/courses",
        newCourse
      );

      setNewCourse({
        title: "",
        description: "",
        category: "",
      });

      fetchData();
    } catch (err) {
      console.log(err);
    }
  };

  const deleteCourse = async (id) => {
    try {
      await API.delete(
        `/admin/courses/${id}`
      );

      fetchData();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: darkMode
          ? "#111827"
          : "#f3f4f6",
        color: darkMode
          ? "#fff"
          : "#000",
        padding: "30px",
      }}
    >
      <h1
        style={{
          marginBottom: "30px",
        }}
      >
        🛠 Admin Dashboard
      </h1>

      {/* Stats */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            "repeat(auto-fit,minmax(220px,1fr))",
          gap: "20px",
          marginBottom: "30px",
        }}
      >
        <div
          style={{
            background: darkMode
              ? "#1f2937"
              : "#fff",
            padding: "20px",
            borderRadius: "12px",
          }}
        >
          <h3>📚 Courses</h3>
          <h2>{stats.courses || 0}</h2>
        </div>

        <div
          style={{
            background: darkMode
              ? "#1f2937"
              : "#fff",
            padding: "20px",
            borderRadius: "12px",
          }}
        >
          <h3>🎓 Students</h3>
          <h2>{stats.students || 0}</h2>
        </div>

        <div
          style={{
            background: darkMode
              ? "#1f2937"
              : "#fff",
            padding: "20px",
            borderRadius: "12px",
          }}
        >
          <h3>📖 Enrollments</h3>
          <h2>
            {stats.enrollments || 0}
          </h2>
        </div>
      </div>

      {/* Add Course */}
      <div
        style={{
          background: darkMode
            ? "#1f2937"
            : "#fff",
          padding: "25px",
          borderRadius: "12px",
          marginBottom: "30px",
        }}
      >
        <h2>Add Course</h2>

        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "10px",
            marginTop: "15px",
          }}
        >
          <input
            placeholder="Title"
            value={newCourse.title}
            onChange={(e) =>
              setNewCourse({
                ...newCourse,
                title:
                  e.target.value,
              })
            }
            style={{
              padding: "12px",
              borderRadius: "8px",
              border:
                "1px solid #ccc",
              flex: 1,
            }}
          />

          <input
            placeholder="Description"
            value={
              newCourse.description
            }
            onChange={(e) =>
              setNewCourse({
                ...newCourse,
                description:
                  e.target.value,
              })
            }
            style={{
              padding: "12px",
              borderRadius: "8px",
              border:
                "1px solid #ccc",
              flex: 1,
            }}
          />

          <input
            placeholder="Category"
            value={
              newCourse.category
            }
            onChange={(e) =>
              setNewCourse({
                ...newCourse,
                category:
                  e.target.value,
              })
            }
            style={{
              padding: "12px",
              borderRadius: "8px",
              border:
                "1px solid #ccc",
              flex: 1,
            }}
          />

          <button
            onClick={addCourse}
            style={{
              background:
                "#4f46e5",
              color: "white",
              border: "none",
              padding:
                "12px 20px",
              borderRadius: "8px",
              cursor: "pointer",
            }}
          >
            Add Course
          </button>
        </div>
      </div>

      {/* Courses */}
      <div
        style={{
          background: darkMode
            ? "#1f2937"
            : "#fff",
          padding: "25px",
          borderRadius: "12px",
          marginBottom: "30px",
        }}
      >
        <h2>📚 Courses</h2>

        {courses.map((course) => (
          <div
            key={course._id}
            style={{
              display: "flex",
              justifyContent:
                "space-between",
              alignItems:
                "center",
              padding: "15px 0",
              borderBottom:
                "1px solid rgba(255,255,255,0.1)",
            }}
          >
            <span>
              {course.title}
            </span>

            <button
              onClick={() =>
                deleteCourse(
                  course._id
                )
              }
              style={{
                background:
                  "#ef4444",
                color: "white",
                border: "none",
                padding:
                  "8px 12px",
                borderRadius:
                  "6px",
                cursor:
                  "pointer",
              }}
            >
              Delete
            </button>
          </div>
        ))}
      </div>

      {/* Students */}
      <div
        style={{
          background: darkMode
            ? "#1f2937"
            : "#fff",
          padding: "25px",
          borderRadius: "12px",
          marginBottom: "30px",
        }}
      >
        <h2>🎓 Students</h2>

        {students.map(
          (student) => (
            <div
              key={student._id}
              style={{
                padding:
                  "12px",
                marginBottom:
                  "10px",
                background:
                  darkMode
                    ? "#111827"
                    : "#f3f4f6",
                borderRadius:
                  "8px",
              }}
            >
              <strong>
                {student.name}
              </strong>

              <br />

              {student.email}
            </div>
          )
        )}
      </div>

      {/* Enrollments */}
      <div
        style={{
          background: darkMode
            ? "#1f2937"
            : "#fff",
          padding: "25px",
          borderRadius: "12px",
        }}
      >
        <h2>📖 Enrollments</h2>

        {enrollments.map((e) => (
          <div
            key={e._id}
            style={{
              padding:
                "12px",
              marginBottom:
                "10px",
              background:
                darkMode
                  ? "#111827"
                  : "#f3f4f6",
              borderRadius:
                "8px",
            }}
          >
            {e.user?.name} →{" "}
            {e.course?.title}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Admin;