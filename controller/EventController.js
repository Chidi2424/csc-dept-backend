// Search Events by keyword (title/description) and filter by date range
exports.searchEvents = async (req, res) => {
  try {
    const { q, startDate, endDate, page = 1, limit = 10 } = req.query;
    let filter = {};
    if (q)
      filter.$or = [
        { title: { $regex: q, $options: "i" } },
        { description: { $regex: q, $options: "i" } },
      ];
    if (startDate || endDate) {
      filter.date = {};
      if (startDate) filter.date.$gte = new Date(startDate);
      if (endDate) filter.date.$lte = new Date(endDate);
    }
    const events = await Event.find(filter)
      .sort({ date: 1 })
      .skip((page - 1) * limit)
      .limit(Number(limit));
    const total = await Event.countDocuments(filter);
    res.json({
      results: events,
      total,
      page: Number(page),
      pages: Math.ceil(total / limit),
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
const Event = require("../model/EventModel");
const cloudinary = require("../Utils/Cloudinary");

// Create Event (with optional images)
exports.createEvent = async (req, res) => {
  try {
    const { title, date, time, venue, description, images = [] } = req.body;
    let uploadedImages = [];
    if (images.length > 0) {
      uploadedImages = await Promise.all(
        images.map(async (img) => {
          // img can be a base64 string or a remote URL
          const result = await cloudinary.uploader.upload(img, {
            folder: "events",
            resource_type: "image",
          });
          return { url: result.secure_url };
        })
      );
    }
    const event = new Event({
      title,
      date,
      time,
      venue,
      description,
      images: uploadedImages,
    });
    await event.save();
    res.status(201).json(event);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Update Event
exports.updateEvent = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, date, time, venue, description } = req.body;
    const updated = await Event.findByIdAndUpdate(
      id,
      { title, date, time, venue, description },
      { new: true }
    );
    if (!updated) return res.status(404).json({ message: "Event not found" });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Delete Event
exports.deleteEvent = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Event.findByIdAndDelete(id);
    if (!deleted) return res.status(404).json({ message: "Event not found" });
    res.json({ message: "Event deleted" });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Get All Events (with optional archive filter)
exports.getEvents = async (req, res) => {
  try {
    const { archived } = req.query;
    let filter = {};
    if (archived !== undefined) filter.archived = archived === "true";
    const events = await Event.find(filter).sort({ date: 1 });
    res.json(events);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Archive past events (run this periodically or on fetch)
exports.archivePastEvents = async (req, res) => {
  try {
    const now = new Date();
    await Event.updateMany(
      { date: { $lt: now }, archived: false },
      { archived: true }
    );
    res.json({ message: "Past events archived" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
