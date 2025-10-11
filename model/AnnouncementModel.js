const mongoose = require("mongoose");

const AnnouncementSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    body: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      enum: ["Exams", "General Notices", "Events"],
      required: true,
    },
    date: {
      type: Date,
      default: Date.now,
    },
    archived: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Announcement", AnnouncementSchema);
