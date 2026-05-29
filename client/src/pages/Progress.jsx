import { useEffect, useState } from "react";
import axios from "axios";
import jsPDF from "jspdf";

function Progress({ darkMode }) {
  const [progressData, setProgressData] =
    useState([]);

  useEffect(() => {
    fetchProgress();
  }, []);

  const fetchProgress = async () => {
    try {
      const user = JSON.parse(
        localStorage.getItem("user")
      );

      const res = await axios.get(
        `http://localhost:5000/api/enrollments/progress/${user._id}`
      );

      setProgressData(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const downloadCertificate = (course) => {
    const user = JSON.parse(
      localStorage.getItem("user")
    );

    const doc = new jsPDF();

    doc.setFontSize(24);

    doc.text(
      "COURSE COMPLETION CERTIFICATE",
      20,
      30
    );

    doc.setFontSize(16);

    doc.text(
      "This is to certify that",
      20,
      60
    );

    doc.setFontSize(20);

    doc.text(
      user.name,
      20,
      80
    );

    doc.setFontSize(16);

    doc.text(
      "has successfully completed",
      20,
      100
    );

    doc.setFontSize(20);

    doc.text(
      course.title,
      20,
      120
    );

    doc.setFontSize(14);

    doc.text(
      `Date: ${new Date().toLocaleDateString()}`,
      20,
      150
    );

    doc.text(
      "Online Learning Platform",
      20,
      170
    );

    doc.save(
      `${course.title}-Certificate.pdf`
    );
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
      <h1>📈 Course Progress</h1>

      {progressData.length === 0 ? (
        <p>No Progress Available</p>
      ) : (
        progressData.map((item) => (
          <div
            key={item._id}
            style={{
              background: darkMode
                ? "#1f2937"
                : "#fff",
              color: darkMode
                ? "#fff"
                : "#000",
              padding: "20px",
              marginBottom: "20px",
              borderRadius: "12px",
              boxShadow:
                "0px 2px 10px rgba(0,0,0,0.15)",
            }}
          >
            <h2>{item.course.title}</h2>

            <p>
              {item.course.description}
            </p>

            <p>
              <strong>
                Progress:
              </strong>{" "}
              {item.progress}%
            </p>

            <div
              style={{
                width: "100%",
                height: "20px",
                background: "#374151",
                borderRadius: "10px",
                overflow: "hidden",
                marginTop: "10px",
              }}
            >
              <div
                style={{
                  width: `${item.progress}%`,
                  height: "100%",
                  background:
                    item.progress ===
                    100
                      ? "#22c55e"
                      : "#4f46e5",
                }}
              />
            </div>

            {item.progress ===
              100 && (
              <div
                style={{
                  marginTop: "20px",
                  padding: "20px",
                  borderRadius: "10px",
                  background:
                    "linear-gradient(135deg,#22c55e,#16a34a)",
                  color: "white",
                }}
              >
                <h2>
                  🏆 Course Completed
                </h2>

                <p>
                  Congratulations!
                  You have
                  successfully
                  completed{" "}
                  {
                    item.course
                      .title
                  }
                </p>

                <button
                  onClick={() =>
                    downloadCertificate(
                      item.course
                    )
                  }
                  style={{
                    background:
                      "white",
                    color:
                      "#16a34a",
                    border:
                      "none",
                    padding:
                      "10px 15px",
                    borderRadius:
                      "8px",
                    fontWeight:
                      "bold",
                    cursor:
                      "pointer",
                    marginTop:
                      "10px",
                  }}
                >
                  🏆 Download Certificate
                </button>
              </div>
            )}
          </div>
        ))
      )}
    </div>
  );
}

export default Progress;