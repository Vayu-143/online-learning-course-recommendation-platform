import { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import Navbar from "./components/Navbar";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Courses from "./pages/Courses";
import EnrolledCourses from "./pages/EnrolledCourses";
import Progress from "./pages/Progress";
import CourseDetails from "./pages/CourseDetails";
import Profile from "./pages/Profile";
import Admin from "./pages/Admin";

function App() {
  const [darkMode, setDarkMode] =
    useState(true);

  const user = JSON.parse(
    localStorage.getItem("user")
  );

  return (
    <Router>
      {user && (
        <Navbar
          darkMode={darkMode}
          setDarkMode={setDarkMode}
        />
      )}

      <Routes>
        {/* Login */}
        <Route
          path="/login"
          element={
            user ? (
              <Navigate to="/" />
            ) : (
              <Login />
            )
          }
        />

        {/* Register */}
        <Route
          path="/register"
          element={
            user ? (
              <Navigate to="/" />
            ) : (
              <Register />
            )
          }
        />

        {/* Dashboard */}
        <Route
          path="/"
          element={
            user ? (
              <Dashboard
                darkMode={darkMode}
              />
            ) : (
              <Navigate to="/login" />
            )
          }
        />

        {/* Courses */}
        <Route
          path="/courses"
          element={
            user ? (
              <Courses
                darkMode={darkMode}
              />
            ) : (
              <Navigate to="/login" />
            )
          }
        />

        {/* Enrolled Courses */}
        <Route
          path="/enrolled"
          element={
            user ? (
              <EnrolledCourses
                darkMode={darkMode}
              />
            ) : (
              <Navigate to="/login" />
            )
          }
        />

        {/* Progress */}
        <Route
          path="/progress"
          element={
            user ? (
              <Progress
                darkMode={darkMode}
              />
            ) : (
              <Navigate to="/login" />
            )
          }
        />

        {/* Course Details */}
        <Route
          path="/course/:id"
          element={
            user ? (
              <CourseDetails
                darkMode={darkMode}
              />
            ) : (
              <Navigate to="/login" />
            )
          }
        />

        {/* Profile */}
        <Route
          path="/profile"
          element={
            user ? (
              <Profile
                darkMode={darkMode}
              />
            ) : (
              <Navigate to="/login" />
            )
          }
        />

        {/* Admin */}
        <Route
          path="/admin"
          element={
            user ? (
              <Admin
                darkMode={darkMode}
              />
            ) : (
              <Navigate to="/login" />
            )
          }
        />

        {/* Invalid Route */}
        <Route
          path="*"
          element={
            <Navigate
              to={
                user
                  ? "/"
                  : "/login"
              }
            />
          }
        />
      </Routes>
    </Router>
  );
}

export default App;