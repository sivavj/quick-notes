import React, { useState, useEffect } from "react";

interface NoteFormProps {
  onSubmit: (note: { id: string; title: string; content: string }) => void;
  existingNote?: { _id: string; title: string; content: string };
  onCancel?: () => void;
}

const NoteForm: React.FC<NoteFormProps> = ({ onSubmit, existingNote, onCancel }) => {
  const [title, setTitle] = useState<string>(existingNote?.title || "");
  const [content, setContent] = useState<string>(existingNote?.content || "");

  const handleCancel = (e: React.FormEvent) => {
    e.preventDefault();
    onCancel?.();
    setTitle("");
    setContent("");
  };

  useEffect(() => {
    if (existingNote) {
      setTitle(existingNote.title);
      setContent(existingNote.content);
    }
  }, [existingNote]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ id: existingNote?._id as string, title, content });
    setTitle("");
    setContent("");
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4">
      <input
        type="text"
        name="title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Title"
        className="border p-2 w-full mb-2 rounded"
        required
      />
      <textarea
        name="content"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Content"
        className="border p-2 w-full mb-2 rounded"
        rows={4}
        required
      />
      <button
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        {existingNote ? "Update Note" : "Add Note"}
      </button>
      {existingNote && (
        <button
          onClick={handleCancel}
          className="bg-red-500 text-white px-4 py-2 rounded ml-2"
        >
          Cancel
        </button>
      )}
    </form>
  );
};

export default NoteForm;
