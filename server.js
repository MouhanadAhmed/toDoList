import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import morgan from "morgan";
import dbConnection from "./src/db.js";
import init from "./src/index.js";
import AppError from "./src/utils/services/AppError.js";
import logger from "./src/utils/services/logger.js";

dotenv.config();

const app = express();
app.use([
    cors(),
    express.json(),
    express.urlencoded({ extended: true }),
    express.text(),
    morgan(logger),
]);

const PORT = process.env.PORT || 8080;

dbConnection();

init(app);

app.get("/", (req, res) => {
    res.json({
        version: "1.0.0",
        message: "Welcome to Blood Bank API",
        success: true,
    });
});

app.listen(PORT, () => console.info(`server is listening on port ${PORT}!`));

// Fallback route for non-existing paths
// app.all("*", (req, res) => {
//     res.status(404).json({
//         success: false,
//         error: `Path ${req.originalUrl} not found.`,
//     });
// });

// Global error handler for unhandled promise rejections
process.on("unhandledRejection", (err) => new AppError(err));
