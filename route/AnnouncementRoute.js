const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const {
  createAnnouncement,
  updateAnnouncement,
  deleteAnnouncement,
  getAnnouncements,
  searchAnnouncements,
  archivePastAnnouncements,
  getArchivedAnnouncements,
} = require("../controller/AnnouncementController");
// Archive past announcements (admin only)
router.post("/archive", auth, archivePastAnnouncements);
// Get archived announcements
router.get("/archived", getArchivedAnnouncements);

// Only admins can create, update, delete
router.post("/", auth, createAnnouncement);
router.put("/:id", auth, updateAnnouncement);
router.delete("/:id", auth, deleteAnnouncement);
// Anyone can view
router.get("/", getAnnouncements);
// Search and filter
router.get("/search", searchAnnouncements);

module.exports = router;
