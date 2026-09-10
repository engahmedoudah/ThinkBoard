const express = require("express");
const router = express.Router();
const noteController = require("../controllers/noteController");
const validateRequest = require("../middlewares/validateRequest");
const {
    createNoteValidation,
    updateNoteValidation,
    noteIdValidation,
} = require("../validators/noteValidator");

// Get all notes
router.get("/", noteController.getAllNotes);

// Get note by id
router.get(
    "/:id",
    noteIdValidation,
    validateRequest,
    noteController.getNoteByID
);

// Create new note
router.post(
    "/",
    createNoteValidation,
    validateRequest,
    noteController.createNote
);

// Update note by id
router.put(
    "/:id",
    noteIdValidation,
    updateNoteValidation,
    validateRequest,
    noteController.updateNoteByID
);

// Delete note by id
router.delete(
    "/:id",
    noteIdValidation,
    validateRequest,
    noteController.deleteNoteByID
);

module.exports = router;
