// Admin Registration
exports.registerAdmin = async (req, res) => {
  const { username, password } = req.body;
  try {
    // Check if admin already exists
    const existingAdmin = await Admin.findOne({ username });
    if (existingAdmin) {
      return res.status(409).json({ message: "Admin already exists" });
    }
    const newAdmin = new Admin({ username, password });
    await newAdmin.save();
    res.status(201).json({ message: "Admin registered successfully" });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};
const Admin = require("../model/AdminModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Admin Login
exports.loginAdmin = async (req, res) => {
  const { username, password } = req.body;
  try {
    const admin = await Admin.findOne({ username });
    if (!admin) {
      return res.status(401).json({ message: "Invalid username" });
    }
    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid password" });
    }
    // Generate JWT
    const token = jwt.sign({ id: admin._id }, process.env.JWT_SECRET, {
      expiresIn: "30m",
    });
    res.status(200).json({ token, admin: { username: admin.username } });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

// Admin Logout (handled on frontend by deleting token)
exports.logoutAdmin = (req, res) => {
  // Just a placeholder, as JWT logout is handled client-side
  res.status(200).json({ message: "Logged out" });
};

// Get all admins
exports.getAllAdmins = async (req, res) => {
  try {
    const admins = await Admin.find().select("-password");
    res.status(200).json(admins);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch admins" });
  }
};
