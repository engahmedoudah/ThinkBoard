const { body, param } = require("express-validator");

/**
 * Validation rules for creating a note
 */
exports.createNoteValidation = [
    body("title")
        .trim()
        .notEmpty()
        .withMessage("Title is required")
        .isLength({ max: 200 })
        .withMessage("Title cannot exceed 200 characters"),

    body("body")
        .trim()
        .notEmpty()
        .withMessage("Body is required")
        .isLength({ max: 5000 })
        .withMessage("Body cannot exceed 5000 characters"),
];

/**
 * Validation rules for updating a note
 */
exports.updateNoteValidation = [
    body("title")
        .optional()
        .trim()
        .notEmpty()
        .withMessage("Title cannot be empty")
        .isLength({ max: 200 })
        .withMessage("Title cannot exceed 200 characters"),

    body("body")
        .optional()
        .trim()
        .notEmpty()
        .withMessage("Body cannot be empty")
        .isLength({ max: 5000 })
        .withMessage("Body cannot exceed 5000 characters"),
];

/**
 * Validation rules for note ID param
 */
exports.noteIdValidation = [
    param("id")
        .isMongoId()
        .withMessage("Invalid note ID format"),
];
