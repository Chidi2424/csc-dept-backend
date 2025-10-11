const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const StudentSchema = mongoose.Schema(
  {
    Name: {
      type: String,
      required: true,
    },
    Email: {
      type: String,
      required: true,
    },
    RegNumber: {
      type: String,
      required: true,
      unique: true,
    },
    Level: {
      type: String,
      required: true,
    },
    Password: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);
// Hash password before saving
StudentSchema.pre("save", async function (next) {
  try {
    if (!this.isModified("Password")) return next();
    const salt = await bcrypt.genSalt(10);
    this.Password = await bcrypt.hash(this.Password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

module.exports = mongoose.model("Student", StudentSchema);
