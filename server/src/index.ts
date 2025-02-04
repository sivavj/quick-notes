import app from "./app";
import mongoose from "mongoose";
import { configDotenv } from "dotenv";

configDotenv();

const PORT = 5000;
const MONGO_URI = "mongodb://localhost:27017/quicknotes";

mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log("Connected to MongoDB");
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch((err) => console.error(err));
