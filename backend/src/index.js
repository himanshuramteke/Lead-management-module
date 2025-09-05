import express from "express";
import { FRONTEND_URL, PORT } from "./config/serverConfig.js";
import { connectDB } from "./config/dbConfig.js";
import cors from "cors";
import leadRoutes from "./routes/lead.route.js";

const app = express();

app.use(
  cors({
    origin: FRONTEND_URL,
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/leads", leadRoutes);

app.get("/", (req, res) => {
  res.send("Hello from express");
});

app.listen(PORT, () => {
  console.log(`Server is running on PORT: ${PORT}`);
  connectDB();
});
