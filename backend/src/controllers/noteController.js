const {
  getNotes,
  getNote,
  createNote,
  updateNote,
  deleteNote,
} = require("../services/noteService");

/**
 * @desc    Get all notes
 * @route   GET /api/notes
 * @access  Public
 */
exports.getAllNotes = async (req, res, next) => {
  try {
    const notes = await getNotes();
    res.status(200).json({
      success: true,
      count: notes.length,
      data: notes,
    });
  } catch (err) {
    next(err);
  }
};

/**
 * @desc    Get single note by ID
 * @route   GET /api/notes/:id
 * @access  Public
 */
exports.getNoteByID = async (req, res, next) => {
  try {
    const note = await getNote(req.params.id);
    if (!note) {
      return res.status(404).json({
        success: false,
        message: "Note not found",
      });
    }
    res.status(200).json({
      success: true,
      data: note,
    });
  } catch (err) {
    next(err);
  }
};

/**
 * @desc    Create new note
 * @route   POST /api/notes
 * @access  Public
 */
exports.createNote = async (req, res, next) => {
  try {
    const newNote = await createNote(req.body);
    res.status(201).json({
      success: true,
      message: "Note created successfully",
      data: newNote,
    });
  } catch (err) {
    next(err);
  }
};

/**
 * @desc    Update note by ID
 * @route   PUT /api/notes/:id
 * @access  Public
 */
exports.updateNoteByID = async (req, res, next) => {
  try {
    const updatedNote = await updateNote(req.params.id, req.body);
    if (!updatedNote) {
      return res.status(404).json({
        success: false,
        message: "Note not found",
      });
    }
    res.status(200).json({
      success: true,
      message: "Note updated successfully",
      data: updatedNote,
    });
  } catch (err) {
    next(err);
  }
};

/**
 * @desc    Delete note by ID
 * @route   DELETE /api/notes/:id
 * @access  Public
 */
exports.deleteNoteByID = async (req, res, next) => {
  try {
    const deletedNote = await deleteNote(req.params.id);
    if (!deletedNote) {
      return res.status(404).json({
        success: false,
        message: "Note not found",
      });
    }
    res.status(200).json({
      success: true,
      message: "Note deleted successfully",
    });
  } catch (err) {
    next(err);
  }
};
