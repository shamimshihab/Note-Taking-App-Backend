const Note = require("../models/note");

const createNote = async (req, res) => {
  try {
    const { title, body } = req.body;
    const userId = req.userId;
    const note = new Note({ title, body, user: userId });
    await note.save();
    res.status(201).json(note);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

const getAllNotes = async (req, res) => {
  try {
    const userId = req.userId;
    let { page, limit } = req.query;

    page = parseInt(page) || 1;
    limit = parseInt(limit) || 10;

    const skip = (page - 1) * limit;

    const notes = await Note.find({ user: userId })
      .skip(skip)
      .limit(limit)
      .exec();

    res.json(notes);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

const getNote = async (req, res) => {
  try {
    const noteId = req.params.id;
    const userId = req.userId;
    const note = await Note.findOne({ _id: noteId, user: userId });

    if (!note) {
      return res.status(404).json({ error: "Note not found" });
    }

    res.json(note);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

const updateNote = async (req, res) => {
  try {
    const noteId = req.params.id;
    const userId = req.userId;
    const { title, body } = req.body;
    const note = await Note.findOneAndUpdate(
      { _id: noteId, user: userId },
      { title, body },
      { new: true }
    );

    if (!note) {
      return res.status(404).json({ error: "Note not found" });
    }

    res.json(note);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

const deleteNote = async (req, res) => {
  try {
    const noteId = req.params.id;
    const userId = req.userId;
    const note = await Note.findOneAndDelete({ _id: noteId, user: userId });

    if (!note) {
      return res.status(404).json({ error: "Note not found" });
    }

    res.json({ message: "Note deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

const shareNote = async (req, res) => {
  try {
    const { noteId, userIdToShareWith } = req.params;

    const note = await Note.findById(noteId);
    if (!note) {
      return res.status(404).json({ message: "Note not found" });
    }

    const userToShareWith = await User.findById(userIdToShareWith);
    if (!userToShareWith) {
      return res.status(404).json({ message: "User not found" });
    }

    if (note.sharedWith.includes(userIdToShareWith)) {
      return res
        .status(400)
        .json({ message: "Note is already shared with this user" });
    }

    note.sharedWith.push(userIdToShareWith);
    await note.save();

    res.status(200).json({ message: "Note shared successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = {
  createNote,
  getAllNotes,
  getNote,
  updateNote,
  deleteNote,
  shareNote,
};
