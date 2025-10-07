const express = require("express");
require("dotenv").config();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");

// Initialize app
const app = express();

// ✅ Body parser
app.use(bodyParser.json({ limit: "20mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "20mb", extended: true }));

// ✅ CORS setup
const allowedOrigins = [
  "http://localhost:5001", // frontend during local dev
  "https://propertyproproperty.herokuapp.com", // your production frontend
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

// ✅ Middleware to parse JSON
app.use(express.json());

// ✅ Routes
const propertyRoutes = require("./routes/propertyPro");
const userRoutes = require("./routes/users");
const authRoutes = require("./routes/auth");

app.use("/api/propertypro", propertyRoutes);
app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);

// ✅ Serve frontend build (for production)
app.use(express.static(path.join(__dirname, "../build")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../build", "index.html"));
});

// ✅ MongoDB connection and server start
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    const port = process.env.PORT || 5000;
    app.listen(port, () =>
      console.log(`✅ MongoDB connected & Server running on port: ${port}`)
    );
  })
  .catch((err) => console.error("❌ MongoDB connection error:", err.message));
