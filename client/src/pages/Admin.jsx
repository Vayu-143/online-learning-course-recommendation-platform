import {
  useEffect,
  useState,
} from "react";

import API from "../services/api";

function Admin({ darkMode }) {
  const [stats, setStats] =
    useState({});

  const [courses, setCourses] =
    useState([]);

  const [students, setStudents] =
    useState([]);

  const [enrollments,
    setEnrollments] =
    useState([]);

  const [newCourse,
    setNewCourse] =
    useState({
      title: "",
      description: "",
      category: "",
    });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const statsRes =
      await API.get(
        "/admin/stats"
      );

    const courseRes =
      await API.get(
        "/admin/courses"
      );

    const studentRes =
      await API.get(
        "/admin/students"
      );

    const enrollRes =
      await API.get(
        "/admin/enrollments"
      );

    setStats(statsRes.data);
    setCourses(courseRes.data);
    setStudents(studentRes.data);
    setEnrollments(
      enrollRes.data
    );
  };

  const addCourse = async () => {
    await API.post(
      "/admin/courses",
      newCourse
    );

    fetchData();

    setNewCourse({
      title: "",
      description: "",
      category: "",
    });
  };

  const deleteCourse = async (
    id
  ) => {
    await API.delete(
      `/admin/courses/${id}`
    );

    fetchData();
  };

  return (
    <div
      style={{
        padding: "30px",
      }}
    >
      <h1>
        🛠 Admin Dashboard
      </h1>

      <div
        style={{
          display: "flex",
          gap: "20px",
          marginBottom: "30px",
        }}
      >
        <div>
          📚 Courses:
          {stats.courses}
        </div>

        <div>
          👨‍🎓 Students:
          {stats.students}
        </div>

        <div>
          📖 Enrollments:
          {stats.enrollments}
        </div>
      </div>

      <h2>Add Course</h2>

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
      />

      <button
        onClick={addCourse}
      >
        Add Course
      </button>

      <hr />

      <h2>Courses</h2>

      {courses.map((course) => (
        <div
          key={course._id}
          style={{
            marginBottom: "10px",
          }}
        >
          {course.title}

          <button
            onClick={() =>
              deleteCourse(
                course._id
              )
            }
          >
            Delete
          </button>
        </div>
      ))}

      <hr />

      <h2>Students</h2>

      {students.map((student) => (
        <div
          key={student._id}
        >
          {student.name} (
          {student.email})
        </div>
      ))}

      <hr />

      <h2>Enrollments</h2>

      {enrollments.map((e) => (
        <div key={e._id}>
          {e.user?.name} →
          {e.course?.title}
        </div>
      ))}
    </div>
  );
}

export default Admin;