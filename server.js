import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./utils/dbconnect.js";
import UserRoute from "./routes/user.route.js";
import companyRoute from "./routes/company.route.js";
import jobRoute from "./routes/job.route.js";
import applicationRoute from "./routes/application.route.js";

// Initialize environment variables
dotenv.config();

// Connect to the database
connectDB();

const app = express();

// Configure CORS to allow credentials and specify the origin
const corsOptions = {
  origin: 'https://jobportalshivam.netlify.app', // Specify the allowed origin
  credentials: true  // Allow credentials such as cookies, authorization headers etc.
};

// Apply CORS with the specified options
app.use(cors(corsOptions));

// Middleware to parse JSON and urlencoded data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Define API routes
app.use("/api/v1/user", UserRoute);
app.use("/api/v1/company", companyRoute);
app.use("/api/v1/job", jobRoute);
app.use("/api/v1/application", applicationRoute);

// Set the port from environment variables or use default
const PORT = process.env.PORT || 3000;

// Start the server and log the running port
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
