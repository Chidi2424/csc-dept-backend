// Archive past announcements (e.g., before today)
exports.archivePastAnnouncements = async (req, res) => {
  try {
    const now = new Date();
    await Announcement.updateMany(
      { date: { $lt: now }, archived: false },
      { archived: true }
    );
    res.json({ message: "Past announcements archived" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get archived announcements (with search)
exports.getArchivedAnnouncements = async (req, res) => {
  try {
    const { q, category, startDate, endDate, page = 1, limit = 10 } = req.query;
    let filter = { archived: true };
    if (category) filter.category = category;
    if (q)
      filter.$or = [
        { title: { $regex: q, $options: "i" } },
        { body: { $regex: q, $options: "i" } },
      ];
    if (startDate || endDate) {
      filter.date = {};
      if (startDate) filter.date.$gte = new Date(startDate);
      if (endDate) filter.date.$lte = new Date(endDate);
    }
    const announcements = await Announcement.find(filter)
      .sort({ date: -1 })
      .skip((page - 1) * limit)
      .limit(Number(limit));
    const total = await Announcement.countDocuments(filter);
    res.json({
      results: announcements,
      total,
      page: Number(page),
      pages: Math.ceil(total / limit),
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
// Search Announcements by keyword (title/body)
exports.searchAnnouncements = async (req, res) => {
  try {
    const { q, category, startDate, endDate, page = 1, limit = 10 } = req.query;
    let filter = {};
    if (category) filter.category = category;
    if (q)
      filter.$or = [
        { title: { $regex: q, $options: "i" } },
        { body: { $regex: q, $options: "i" } },
      ];
    if (startDate || endDate) {
      filter.date = {};
      if (startDate) filter.date.$gte = new Date(startDate);
      if (endDate) filter.date.$lte = new Date(endDate);
    }
    const announcements = await Announcement.find(filter)
      .sort({ date: -1 })
      .skip((page - 1) * limit)
      .limit(Number(limit));
    const total = await Announcement.countDocuments(filter);
    res.json({
      results: announcements,
      total,
      page: Number(page),
      pages: Math.ceil(total / limit),
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
const Announcement = require("../model/AnnouncementModel");

// Create Announcement
exports.createAnnouncement = async (req, res) => {
  try {
    const { title, body, category } = req.body;
    const announcement = new Announcement({ title, body, category });
    await announcement.save();
    res.status(201).json(announcement);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Edit Announcement
exports.updateAnnouncement = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, body, category } = req.body;
    const updated = await Announcement.findByIdAndUpdate(
      id,
      { title, body, category },
      { new: true }
    );
    if (!updated)
      return res.status(404).json({ message: "Announcement not found" });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Delete Announcement
exports.deleteAnnouncement = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Announcement.findByIdAndDelete(id);
    if (!deleted)
      return res.status(404).json({ message: "Announcement not found" });
    res.json({ message: "Announcement deleted" });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Get All Announcements (reverse chronological)
exports.getAnnouncements = async (req, res) => {
  try {
    const { category } = req.query;
    let filter = {};
    if (category) filter.category = category;
    const announcements = await Announcement.find(filter).sort({ date: -1 });
    res.json(announcements);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
