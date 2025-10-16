const express = require("express");
const cors = require("cors");
const ApiError = require("./app/api-error");
const app = express();

app.use(cors());
app.use(express.json());

const contactRouter = require("./app/routes/contact.route");
app.use("/api/contacts", contactRouter);

// Route mặc định
app.get("/", (req, res) => {
  res.send("Chào mừng đến với ContactBook API!");
});

// Xử lý 404 - không tìm thấy route
app.use((req, res, next) => {
  return next(new ApiError(404, "Resource not found"));
});

// Middleware xử lý lỗi tập trung
app.use((error, req, res, next) => {
  return res.status(error.statusCode || 500).json({
    message: error.message || "Internal Server Error",
  });
});

module.exports = app;
