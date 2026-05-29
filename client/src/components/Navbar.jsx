import { Link } from "react-router-dom";

function Navbar({ darkMode, setDarkMode }) {
  const logout = () => {
    localStorage.removeItem("user");
    window.location.href = "/login";
  };

  return (
    <nav
      style={{
        background: darkMode
          ? "#111827"
          : "#0f172a",
        color: "white",
        padding: "15px 30px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        boxShadow:
          "0 2px 10px rgba(0,0,0,0.15)",
      }}
    >
      <h2
        style={{
          margin: 0,
        }}
      >
        🎓 LearnHub
      </h2>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "20px",
        }}
      >
        <Link
          to="/"
          style={{
            color: "white",
            textDecoration: "none",
          }}
        >
          Dashboard
        </Link>

        <Link
          to="/courses"
          style={{
            color: "white",
            textDecoration: "none",
          }}
        >
          Courses
        </Link>

        <Link
          to="/enrolled"
          style={{
            color: "white",
            textDecoration: "none",
          }}
        >
          Enrolled
        </Link>

        <Link
          to="/progress"
          style={{
            color: "white",
            textDecoration: "none",
          }}
        >
          Progress
        </Link>

        <Link
          to="/profile"
          style={{
            color: "white",
            textDecoration: "none",
          }}
        >
          Profile
        </Link>

        <Link
          to="/admin"
          style={{
            color: "white",
            textDecoration: "none",
          }}
        >
          Admin
        </Link>

        <button
          onClick={() =>
            setDarkMode(!darkMode)
          }
          style={{
            padding: "8px 12px",
            border: "none",
            borderRadius: "6px",
            cursor: "pointer",
            background: "#f3f4f6",
          }}
        >
          {darkMode
            ? "☀ Light"
            : "🌙 Dark"}
        </button>

        <button
          onClick={logout}
          style={{
            background: "#ef4444",
            color: "white",
            border: "none",
            padding: "8px 14px",
            borderRadius: "6px",
            cursor: "pointer",
          }}
        >
          Logout
        </button>
      </div>
    </nav>
  );
}

export default Navbar;