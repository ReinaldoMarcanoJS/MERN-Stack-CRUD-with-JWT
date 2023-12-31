const morgan = require("morgan");
const express = require("express");
const authRoutes = require("./routes/auth.routes");
const taskRoutes = require("./routes/task.routes");
const cookieParser = require('cookie-parser');
const cors = require('cors');

const app = express()
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}))
app.use(morgan('dev'))
app.use(express.json())
app.use(cookieParser())
app.use("/api", authRoutes)
app.use("/api", taskRoutes)

module.exports = app;