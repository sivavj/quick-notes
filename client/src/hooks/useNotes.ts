/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState, useEffect } from "react";
import axios from "axios";

interface Note {
  _id: string;
  title: string;
  content: string;
}

const API_URL = "http://localhost:5000/api/notes"; // Update with the correct URL

const useNotes = () => {
  const [notes, setNotes] = useState<Note[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchNotes = async () => {
    try {
      setLoading(true);
      const response = await axios.get(API_URL);
      setNotes(response.data);
      setLoading(false);
    } catch (err) {
      setLoading(false);
      setError("Failed to fetch notes.");
    }
  };

  const createNote = async (note: { title: string; content: string }) => {
    try {
      await axios.post(API_URL, note);
      fetchNotes();
    } catch (err) {
      setError("Failed to create note.");
    }
  };

  const updateNote = async (id: string, note: { title: string; content: string }) => {
    try {
      await axios.put(`${API_URL}/${id}`, note);
      fetchNotes();
    } catch (err) {
      setError("Failed to update note.");
    }
  };

  const deleteNote = async (id: string) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      fetchNotes();
    } catch (err) {
      setError("Failed to delete note.");
    }
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  return { notes, loading, error, createNote, updateNote, deleteNote };
};

export default useNotes;
