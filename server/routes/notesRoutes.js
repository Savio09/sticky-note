const express = require("express");
const router = express.Router();

const {
  getAllNotes,
  createNote,
  updateNote,
  deleteNote,
} = require("../controllers/notesController");

const { protectRoutes } = require("../middleware/authMiddleware");

router
  .route("/notes")
  .get(protectRoutes, getAllNotes)
  .post(protectRoutes, createNote);
router
  .route("/notes/:id")
  .put(protectRoutes, updateNote)
  .delete(protectRoutes, deleteNote);

module.exports = router;
