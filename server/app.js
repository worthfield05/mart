const express = require('express');
const helmet = require('helmet');
const compression = require('compression');
const cors = require('cors')
const hpp = require('hpp')
// const xss = require('xss-clean')
const mongoSanitize = require('express-mongo-sanitize')
const errorHandler = require('./middlewares/errorMiddleware');
const authRoutes = require('./routers/auth.route')
require('dotenv').config()
const app = express();
app.use(helmet())
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
// app.use(mongoSanitize())
// app.use(xss)
app.use(hpp())
app.use(compression())
app.use("/api/auth", authRoutes.router)

app.use(errorHandler)
module.exports = app