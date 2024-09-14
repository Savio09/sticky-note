const Notes = require("../models/notesModel");
const User = require("../models/userModel");

const getAllNotes = async (req, res) => {
  // Get all the notes from the database
  const notes = await Notes.find({
    user: req.user.id,
  });
  res.status(200).json(notes);
};

const createNote = async (req, res) => {
  const newNote = await Notes.create({
    user: req.user.id,
    content: req.body.content,
    colors: req.body.colors,
    position: req.body.position,
  });
  res.status(201).json(newNote);
};

const updateNote = async (req, res) => {
  const note = await Notes.findById(req.params.id);
  if (!note) {
    res.status(400).json({
      message: "Note not found",
    });
    return;
  }
  const user = await User.findById(req.user.id);
  if (!user) {
    res.status(401).json({
      message: "No user found",
    });
  }

  if (note.user.toString() !== user.id) {
    res.status(401).json({ message: "Unauthorized user!" });
  }

  const updatedNotes = await Notes.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  res.status(200).json(updatedNotes);
};

const deleteNote = async (req, res) => {
  const item = await Notes.findById(req.params.id);
  if (!item) {
    res.status(400).json({
      message: "This item was not found!",
    });
  }

  if (!req.user) {
    res.status(401).json({
      message: "User not found",
    });
  }

  if (item.user.toString() !== req.user.id) {
    res.status(401).json({
      message: "Unauthorized user",
    });
  }

  await item.deleteOne();
  res.status(200).json({
    id: req.params.id,
  });
};

module.exports = {
  getAllNotes,
  createNote,
  updateNote,
  deleteNote,
};
