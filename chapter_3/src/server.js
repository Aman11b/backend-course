import express from "express";
import path, { dirname } from "path";
import { fileURLToPath } from "url";
import authRoutes from "./routes/authRoutes.js";
import todoRoutes from "./routes/todoRoutes.js";
import authMiddleware from "./middleware/authMiddleware.js";

const app = express();
const PORT = process.env.PORT || 5000;

// get file path from url of cirrent module
const __filename = fileURLToPath(import.meta.url);

// get the directory name from the file path
const __dirname = dirname(__filename);

// Middleware
app.use(express.json());
// servers the HTML file from /public directory
// tells express to server all files from the public folder as static assets/files.Any req for CSS file will be resolved to the public dir
app.use(express.static(path.join(__dirname, "../public")));

// Serving up HTML file from /public directory
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

// Routes
app.use("/auth", authRoutes);
app.use("/todos", authMiddleware, todoRoutes);

app.listen(PORT, () => {
  console.log(`Server has started at port: ${PORT}`);
});
