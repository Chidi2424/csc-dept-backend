const TimeTableModel = require("../model/TimeTableModel");
const cloudinary = require("../Utils/Cloudinary");

const UploadTimeTableImage = async (req, res) => {
  const { title, images } = req.body;
  try {
    if (!images || !title) {
      return res.status(400).json({
        message: "images and title are required",
      });
    }
    if (!Array.isArray(images) || images.length === 0) {
      return res.status(400).json({
        message: "images must be a non-empty array",
      });
    }
    if (images.length > 5) {
      return res.status(400).json({
        message: "You can't upload more than 5 files",
      });
    }

    const uploadedImages = await Promise.all(
      images.map(async (image) => {
        const result = await cloudinary.uploader.upload(image, {
          folder: "timetables",
          resource_type: "image",
        });

        return {
          img: result.secure_url,
        };
      })
    );

    const newTimeTable = new TimeTableModel({
      title,
      images: uploadedImages,
    });

    const savedTimeTable = await newTimeTable.save();
    res.status(201).json({
      message: "Timetable uploaded successfully",
      data: savedTimeTable,
    });
  } catch (error) {
    console.error("Upload error:", error);
    res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};

const GetAllTimeTables = async (req, res) => {
  try {
    const timetables = await TimeTableModel.find().sort({ createdAt: -1 });
    res.status(200).json({
      message: "Timetables retrieved successfully",
      data: timetables,
    });
  } catch (error) {
    console.error("Get timetables error:", error);
    res.status(500).json({
      message: "Failed to fetch timetables",
      error: error.message,
    });
  }
};

const GetTimeTableById = async (req, res) => {
  const { id } = req.params;
  try {
    const timetable = await TimeTableModel.findById(id);
    if (!timetable) {
      return res.status(404).json({ message: "Timetable not found" });
    }
    res.status(200).json({
      message: "Timetable retrieved successfully",
      data: timetable,
    });
  } catch (error) {
    console.error("Get timetable by ID error:", error);
    res.status(500).json({
      message: "Failed to fetch timetable",
      error: error.message,
    });
  }
};

const DeleteTimeTable = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedTimetable = await TimeTableModel.findByIdAndDelete(id);
    if (!deletedTimetable) {
      return res.status(404).json({ message: "Timetable not found" });
    }
    res.status(200).json({
      message: "Timetable deleted successfully",
      data: deletedTimetable,
    });
  } catch (error) {
    console.error("Delete timetable error:", error);
    res.status(500).json({
      message: "Failed to delete timetable",
      error: error.message,
    });
  }
};

module.exports = {
  UploadTimeTableImage,
  GetAllTimeTables,
  GetTimeTableById,
  DeleteTimeTable,
};
