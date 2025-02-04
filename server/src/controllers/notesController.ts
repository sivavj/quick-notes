import { Request, Response } from "express";
import Note from "../models/Note";

// Get all notes
export const getNotes = async (req: Request, res: Response) => {
  try {
    const notes = await Note.find();
    res.json(notes);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch notes", error });
  }
};

// Create a new note
export const createNote = async (req: Request, res: Response) => {
  try {
    const { title, content } = req.body;
    const newNote = new Note({ title, content });
    await newNote.save();
    res.status(201).json(newNote);
  } catch (error) {
    res.status(500).json({ message: "Failed to create note", error });
  }
};

// Update a note
export const updateNote = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { title, content } = req.body;

  try {
    const updatedNote = await Note.findByIdAndUpdate(
      id,
      { title, content },
      { new: true } // This ensures it returns the updated note
    );
    if (!updatedNote) {
      res.status(404).json({ message: "Note not found" });
      return;
    }
    res.json(updatedNote); // Respond with the updated note
  } catch (err) {
    res.status(500).json({ message: "Error updating note" });
  }
};


// Delete a note
export const deleteNote = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const deletedNote = await Note.findByIdAndDelete(id);

    if (!deletedNote) {
      res.status(404).json({ message: "Note not found" });
      return;
    }

    res.status(204).send(); // No content
  } catch (error) {
    res.status(500).json({ message: "Failed to delete note", error });
  }
};
