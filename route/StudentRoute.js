const express = require("express");
const {
  RegisterNewStudent,
  GetAllStudents,
  GetSingleStudent,
  UpdateSingleStudent,
  DeleteSingleStudent,
  Login,
} = require("../controller/StudentController");

const router = express.Router();
router.post("/register", RegisterNewStudent);
router.put("/:id", UpdateSingleStudent);
router.post("/login", Login);
router.get("/home", GetAllStudents);
router.get("/:id", GetSingleStudent);
router.delete("/:id", DeleteSingleStudent);

module.exports = router;
