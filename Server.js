// load environment variables as early as possible
require("dotenv").config();

const express = require("express");
const connectDB = require("./config/db");
// require routes after dotenv so any module reading process.env sees values
const EventRoute = require("./route/EventRoute");
const AnnouncementRoute = require("./route/AnnouncementRoute");
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
