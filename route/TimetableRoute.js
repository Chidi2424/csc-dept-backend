const express = require("express");
const cloudinary = require("../Utils/Cloudinary,js");
const { TimeTableSchema } = require("../controller/TimetableController");
const router = express.Router();

router.post("/", TimeTableSchema);
module.exports = router;
