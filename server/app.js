const express = require("express");
const helmet = require("helmet");
const compression = require("compression");
const cors = require("cors");
const hpp = require("hpp");
// const xss = require('xss-clean')
const mongoSanitize = require("express-mongo-sanitize");
const errorHandler = require("./middlewares/errorMiddleware");
const authRoutes = require("./routers/auth.route");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
require("dotenv").config();
const app = express();
app.use(helmet());
app.use(
  cors({
    origin: "http://localhost:3000",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
// app.use(mongoSanitize())
// app.use(xss)
app.use(hpp());
app.use(compression());
app.use(morgan("dev"));
app.use("/api/auth", authRoutes.router);

app.use(errorHandler);
module.exports = app;
