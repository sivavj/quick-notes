import React from "react";
import { Note } from "./Note";

interface Note {
  _id: string;
  title: string;
  content: string;
}

interface NotesListProps {
  notes: Note[];
  onEdit: (note: Note) => void;
  onDelete: (id: string) => void;
  loading: boolean;
  error: string | null;
}

const NotesList: React.FC<NotesListProps> = ({
  notes,
  onEdit,
  onDelete,
  loading,
  error,
}) => {
  if (loading) return <p>Loading notes...</p>;
  if (error) return <p className="text-red-600">{error}</p>;

  return (
    <div className="grid gap-4">
      {notes.map((note) => (
        <Note key={note._id} note={note} onEdit={onEdit} onDelete={onDelete} />
      ))}
    </div>
  );
};

export default NotesList;
