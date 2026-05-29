import API from "../services/api";

function CourseCard({ course }) {

  const enrollCourse = async () => {
    try {
      const user = JSON.parse(
        localStorage.getItem("user")
      );

      await API.post("/enrollments", {
        userId: user._id,
        courseId: course._id,
      });

      alert("Course Enrolled Successfully");
    } catch (error) {
      console.log(error);
      alert("Enrollment Failed");
    }
  };

  return (
    <div
      style={{
        border: "1px solid #ccc",
        padding: "20px",
        marginBottom: "20px",
      }}
    >
      <h2>{course.title}</h2>

      <p>{course.description}</p>

      <p>
        <strong>Category:</strong>{" "}
        {course.category}
      </p>

      <button onClick={enrollCourse}>
        Enroll Now
      </button>
    </div>
  );
}

export default CourseCard;