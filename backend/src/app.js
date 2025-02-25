import express from "express";
import authRouter from "./Routes/auth.route.js";
import dotenv from "dotenv";
import { connectDB } from "./utils/db.js";
import cookieParser from "cookie-parser";
import messageRoute from "./Routes/message.route.js";
import cors from "cors";
import { server, app } from "./utils/socket.js";
import path from "path";
import { fileURLToPath } from "url";

// ES Module fix for __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load environment variable
dotenv.config();

// connect to database
connectDB();

// middlewares
app.use(cookieParser());
app.use(express.json({ limit: "50mb" }));
app.use(
  cors({
    origin:
      process.env.NODE_ENV === "production" ? "*" : "http://localhost:5173",
    credentials: true,
  })
);

// routes
app.use("/api/auth", authRouter);
app.use("/api/messages", messageRoute);

// Production setup
if (process.env.NODE_ENV === "production") {
  const frontendDist = path.join(__dirname, "../../frontend/dist");
  app.use(express.static(frontendDist));

  app.get("*", (req, res) => {
    res.sendFile(path.join(frontendDist, "index.html"));
  });
}

// start server
const PORT = process.env.PORT || 8080;
server.listen(PORT, () => {
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
});
