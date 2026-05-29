require("dotenv").config();

const express = require("express");
const cors = require("cors");

const connectDB = require("./config/db");

// Connect Database
connectDB();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// ==========================
// Routes
// ==========================

// Auth Routes
app.use(
  "/api/auth",
  require("./routes/authRoutes")
);

// Course Routes
app.use(
  "/api/courses",
  require("./routes/courseRoutes")
);

// Enrollment Routes
app.use(
  "/api/enrollments",
  require("./routes/enrollmentRoutes")
);

// Recommendation Routes
app.use(
  "/api/recommendations",
  require("./routes/recommendationRoutes")
);

// Dashboard Routes
app.use(
  "/api/dashboard",
  require("./routes/dashboardRoutes")
);

// Profile Routes
app.use(
  "/api/profile",
  require("./routes/profileRoutes")
);

// Admin Routes
app.use(
  "/api/admin",
  require("./routes/adminRoutes")
);

// ==========================
// Default Route
// ==========================

app.get("/", (req, res) => {
  res.send(
    "Online Learning Platform API Running 🚀"
  );
});

// ==========================
// Start Server
// ==========================

const PORT =
  process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(
    `✅ Server Running On Port ${PORT}`
  );
});