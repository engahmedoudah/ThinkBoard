/**
 * Centralized error handling middleware
 * Handles all errors thrown in the application
 */
const errorHandler = (err, req, res, next) => {
    console.error("Error:", err);

    // Mongoose validation error
    if (err.name === "ValidationError") {
        const errors = Object.values(err.errors).map((e) => e.message);
        return res.status(400).json({
            success: false,
            message: "Validation failed",
            errors,
        });
    }

    // Mongoose CastError (invalid ObjectId)
    if (err.name === "CastError") {
        return res.status(400).json({
            success: false,
            message: "Invalid ID format",
        });
    }

    // Duplicate key error
    if (err.code === 11000) {
        return res.status(400).json({
            success: false,
            message: "Duplicate entry",
        });
    }

    // Default error
    res.status(err.statusCode || 500).json({
        success: false,
        message: err.message || "Internal server error",
        ...(process.env.NODE_ENV === "development" && { stack: err.stack }),
    });
};

module.exports = errorHandler;
