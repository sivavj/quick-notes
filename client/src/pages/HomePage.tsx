import React, { useState } from "react";
import NoteForm from "../components/NoteForm";
import NotesList from "../components/NotesList";
import useNotes from "../hooks/useNotes";

const HomePage: React.FC = () => {
  const [editingNote, setEditingNote] = useState<{
    _id: string;
    title: string;
    content: string;
  } | null>(null);
  const { notes, loading, error, createNote, updateNote, deleteNote } =
    useNotes();

  const handleEdit = (note: {
    _id: string;
    title: string;
    content: string;
  }) => {
    setEditingNote({
      _id: note._id,
      title: note.title,
      content: note.content,
    });
  };

  const handleSubmit = (note: { title: string; content: string }) => {
    if (editingNote) {
      // When editing, pass the _id and update the note
      updateNote(editingNote._id, note);
      setEditingNote(null); // Reset the editing state after updating
    } else {
      // If no editing is happening, create a new note
      createNote(note);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-4">
      <div className="flex items-center gap-1 mb-4">
          <img src="/notes.svg" alt="Notes Logo" className="h-8" />
        <h1 className="text-2xl underline font-bold">Quick Notes</h1>
      </div>
      <NoteForm
        onSubmit={handleSubmit}
        existingNote={editingNote || undefined}
        onCancel={() => setEditingNote(null)}
      />
      <NotesList
        notes={notes}
        onEdit={handleEdit}
        onDelete={deleteNote}
        loading={loading}
        error={error}
      />
    </div>
  );
};

export default HomePage;
