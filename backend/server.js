require("dotenv").config();

const express = require("express");
const cors = require("cors");

const uploadRoutes = require("./routes/uploadRoutes");

const app = express();

// CORS
app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "https://groweasyai-frontend.onrender.com"
    ],
    methods: ["GET", "POST"],
    credentials: true
  })
);

app.use(express.json());

app.use("/api/upload", uploadRoutes);

// Optional health check
app.get("/", (req, res) => {
  res.send("GrowEasy Backend is Running 🚀");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});