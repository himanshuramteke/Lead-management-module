import express from "express";
import { FRONTEND_URL, NODE_ENV, PORT } from "./config/serverConfig.js";
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

const startServer = async () => {
  try {
    await connectDB();
    if (NODE_ENV !== "production") {
      app.listen(PORT, () => {
        console.log("Server started on PORT:", PORT);
      });
    }
  } catch (error) {
    console.error("Error starting server:", error);
    process.exit(1); //Exit the process with a failure code
  }
};

startServer();

export default app;
