const express = require("express");
const {
  UploadTimeTableImage,
  GetAllTimeTables,
  GetTimeTableById,
  DeleteTimeTable,
} = require("../controller/TimetableController");

const router = express.Router();

router.post("/", UploadTimeTableImage);
router.get("/", GetAllTimeTables);
router.get("/:id", GetTimeTableById);
router.delete("/:id", DeleteTimeTable);

module.exports = router;
