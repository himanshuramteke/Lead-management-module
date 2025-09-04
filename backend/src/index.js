import express from "express";
import { PORT } from "./config/serverConfig.js";

const app = express();

app.get("/", (req, res) => {
  res.send("Hello from express");
});

app.listen(PORT, () => {
  console.log(`Server is running on PORT: ${PORT}`);
});
