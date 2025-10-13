const mongoose = require("mongoose");

const TimeTableSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  images: [
    {
      img: {
        type: String,
        required: true,
      },
    },
  ],
}, {
  timestamps: true,
});

const TimeTableModel = mongoose.model("TimeTable", TimeTableSchema);

module.exports = TimeTableModel;
