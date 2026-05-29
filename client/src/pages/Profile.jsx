import { useEffect, useState } from "react";
import axios from "axios";

function Profile({ darkMode }) {
  const [profile, setProfile] =
    useState(null);

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const user = JSON.parse(
        localStorage.getItem("user")
      );

      const res = await axios.get(
        `http://localhost:5000/api/profile/${user._id}`
      );

      setProfile(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  if (!profile) {
    return (
      <h2 style={{ padding: "30px" }}>
        Loading...
      </h2>
    );
  }

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
      <h1>👤 My Profile</h1>

      <div
        style={{
          background: darkMode
            ? "#1f2937"
            : "#fff",
          padding: "25px",
          marginTop: "20px",
          borderRadius: "12px",
          boxShadow:
            "0px 2px 10px rgba(0,0,0,0.15)",
        }}
      >
        <h2>{profile.name}</h2>

        <p>
          <strong>Email:</strong>{" "}
          {profile.email}
        </p>

        <p>
          <strong>Joined:</strong>{" "}
          {new Date(
            profile.createdAt
          ).toLocaleDateString()}
        </p>

        <p>
          <strong>
            Enrolled Courses:
          </strong>{" "}
          {profile.enrolledCourses}
        </p>

        <p>
          <strong>
            Completed Courses:
          </strong>{" "}
          {profile.completedCourses}
        </p>
      </div>
    </div>
  );
}

export default Profile;