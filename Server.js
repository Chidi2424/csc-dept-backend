// ...existing code...
require("dotenv").config();
const dotenv = require("dotenv").config();
const EventRoute = require("./route/EventRoute");
const AnnouncementRoute = require("./route/AnnouncementRoute");
const express = require("express");
const connectDB = require("./config/db");
const Cloudinary = require("./Utils/Cloudinary");
// import express from "express" this is used only when commonjs is changed to modulejs
// import axios from axios

const colors = require("colors");
const StudentRoute = require("./route/StudentRoute");
const TimeTableRoute = require("./route/TimetableRoute");
const bodyParser = require("body-parser");
const AdminRoute = require("./route/AdminRoute");
const cors = require("cors");
// const bcryptjs = require("bcryptjs");
// import dotenv from "dotenv.config()"
connectDB();
const app = express();
app.use(bodyParser.json({ limit: "50mb" }));
app.use(cors());
app.use("/api/Admin", AdminRoute);
app.use("/api/Student", StudentRoute);
app.use("/api/announcements", AnnouncementRoute);
app.use("/api/timetable", TimeTableRoute);
app.use("/api/events", EventRoute);

// app.use(bycryptjs());

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server is running on port ${port}`));
