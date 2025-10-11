const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const {
  createEvent,
  updateEvent,
  deleteEvent,
  getEvents,
  archivePastEvents,
  searchEvents,
} = require("../controller/EventController");

// Only admins can create, update, delete
router.post("/", auth, createEvent);
router.put("/:id", auth, updateEvent);
router.delete("/:id", auth, deleteEvent);
// Anyone can view
router.get("/", getEvents);
// Search and filter
router.get("/search", searchEvents);
// Archive past events (admin only)
router.post("/archive", auth, archivePastEvents);

module.exports = router;
