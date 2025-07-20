import express from "express";
import { dbConnection } from "./database/dbConnection.js";
import { config } from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import fileUpload from "express-fileupload";
import { errorMiddleware } from "./middlewares/error.js";
import messageRouter from "./router/messageRouter.js";
import userRouter from "./router/userRouter.js";
import appointmentRouter from "./router/appointmentRouter.js";

// Load environment variables from config.env
config({ path: "./config.env" });

const app = express();

// ✅ CORS setup: allow only the frontend deployed URL
app.use(
  cors({
    origin: "https://hospital-management-system-self-zeta.vercel.app/", // ✅ your Vercel frontend domain here
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type"],
  })
);

// Middleware to parse cookies and JSON
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// For handling file uploads (e.g. profile pictures, reports)
app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp/",
  })
);

// ✅ Route handlers
app.use("/api/v1/message", messageRouter);
app.use("/api/v1/user", userRouter);           // /api/v1/user/login
app.use("/api/v1/appointment", appointmentRouter);

// Connect to MongoDB
dbConnection();

// Error handling middleware (should come last)
app.use(errorMiddleware);

export default app;
