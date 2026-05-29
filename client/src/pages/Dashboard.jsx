import { useEffect, useState } from "react";
import API from "../services/api";
import ProgressChart from "../components/ProgressChart";

function Dashboard({ darkMode }) {
  const [recommendations, setRecommendations] =
    useState([]);

  const [chartData, setChartData] =
    useState([]);

  const [stats, setStats] = useState({
    totalCourses: 0,
    enrolledCourses: 0,
    completedCourses: 0,
    progress: 0,
  });

  useEffect(() => {
    const user = JSON.parse(
      localStorage.getItem("user")
    );

    if (user?._id) {
      fetchDashboardStats(user._id);

      fetchChartData(user._id);

      API.get(
        `/recommendations/${user._id}`
      )
        .then((res) =>
          setRecommendations(res.data)
        )
        .catch((err) =>
          console.log(err)
        );
    }
  }, []);

  const fetchDashboardStats = async (
    userId
  ) => {
    try {
      const res = await API.get(
        `/dashboard/${userId}`
      );

      setStats(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const fetchChartData = async (
    userId
  ) => {
    try {
      const res = await API.get(
        `/dashboard/chart/${userId}`
      );

      setChartData(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div
      style={{
        padding: "30px",
        minHeight: "100vh",
        background: darkMode
          ? "#111827"
          : "#f4f7fc",
        color: darkMode
          ? "white"
          : "black",
      }}
    >
      {/* Hero Section */}
      <div
        style={{
          background:
            "linear-gradient(135deg,#4f46e5,#7c3aed)",
          color: "white",
          padding: "30px",
          borderRadius: "15px",
          marginBottom: "30px",
        }}
      >
        <h1>
          🎓 Online Learning Platform
        </h1>

        <p>
          Learn. Grow. Get Recommended
          Courses based on your
          interests.
        </p>
      </div>

      {/* Statistics Cards */}
      <div
        style={{
          display: "flex",
          gap: "20px",
          marginBottom: "30px",
          flexWrap: "wrap",
        }}
      >
        {[
          {
            title:
              "📚 Total Courses",
            value:
              stats.totalCourses,
          },
          {
            title:
              "🎓 Enrolled Courses",
            value:
              stats.enrolledCourses,
          },
          {
            title:
              "🏆 Completed Courses",
            value:
              stats.completedCourses,
          },
          {
            title: "📈 Progress",
            value: `${stats.progress}%`,
          },
        ].map((item) => (
          <div
            key={item.title}
            style={{
              background: darkMode
                ? "#1f2937"
                : "#fff",
              color: darkMode
                ? "#fff"
                : "#000",
              padding: "20px",
              borderRadius: "12px",
              width: "220px",
              boxShadow:
                "0px 2px 10px rgba(0,0,0,0.15)",
            }}
          >
            <h3>{item.title}</h3>

            <h2>{item.value}</h2>
          </div>
        ))}
      </div>

      {/* Progress Chart */}
      <ProgressChart
        data={chartData}
        darkMode={darkMode}
      />

      {/* Recommendations */}
      <h2>
        🔥 Recommended Courses
      </h2>

      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            "repeat(auto-fill,minmax(300px,1fr))",
          gap: "20px",
          marginTop: "20px",
        }}
      >
        {recommendations.length >
        0 ? (
          recommendations.map(
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
                  borderRadius:
                    "12px",
                  boxShadow:
                    "0px 2px 10px rgba(0,0,0,0.15)",
                }}
              >
                <h3>
                  {
                    course.title
                  }
                </h3>

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
                  }}
                >
                  View Course
                </button>
              </div>
            )
          )
        ) : (
          <p>
            Enroll in a course
            to receive
            recommendations.
          </p>
        )}
      </div>
    </div>
  );
}

export default Dashboard;