import express from "express";
import cors from "cors";
import notesRoutes from "./routes/notesRoutes";

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/notes", notesRoutes);

export default app;
