const express = require("express");
const {
  registerAdmin,
  loginAdmin,
  logoutAdmin,
  getAllAdmins,
} = require("../controller/AdminController");

// Get all admins

const router = express.Router();

router.post("/register", registerAdmin);
router.post("/login", loginAdmin);
router.post("/logout", logoutAdmin);
router.get("/all", getAllAdmins);

module.exports = router;
