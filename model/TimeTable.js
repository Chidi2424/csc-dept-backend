const mongoose = require("mongoose");
const TimeTableSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
  },

  images: [
    {
      img: {
        type: String,
      },
    },
  ],
});
mongoose.model("TimeTable", TimeTableSchema);
