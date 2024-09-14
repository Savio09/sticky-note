const mongoose = require("mongoose");

const notesSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
  content: {
    type: String,
  },
  colors: { type: Object },
  position: { type: Object },
  updatedAt: Date,
});

module.exports = mongoose.model("Notes", notesSchema);
