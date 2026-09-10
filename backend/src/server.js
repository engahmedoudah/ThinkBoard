require("dotenv").config();
const app = require("./app");
const connectDB = require("./config/db");

// Connect to MongoDB
connectDB();

// Get port from environment or use default
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`🚀 Server is running on port ${PORT}`);
    console.log(`📍 Environment: ${process.env.NODE_ENV || "development"}`);
});
