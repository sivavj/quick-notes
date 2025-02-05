import React, { useState } from "react";
import NoteForm from "../components/NoteForm";
import NotesList from "../components/NotesList";
import useNotes from "../hooks/useNotes";
import useDebounce from "../hooks/useDebounce";

const HomePage: React.FC = () => {
  const [editingNote, setEditingNote] = useState<{
    _id: string;
    title: string;
    content: string;
  } | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const debouncedQuery = useDebounce(searchQuery, 300);

  const {
    notes,
    loading,
    error,
    fetchNotes,
    createNote,
    updateNote,
    deleteNote,
  } = useNotes();

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
      updateNote(editingNote._id, note);
      setEditingNote(null);
    } else {
      createNote(note);
    }
  };

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  // Trigger fetching notes whenever the debounced search query changes
  React.useEffect(() => {
    fetchNotes(debouncedQuery);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedQuery]);

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
      {/* Search Input */}
      <div className="mb-4">
        <div className="flex px-4 py-3 rounded-md border border-black overflow-hidden">
          <input
            type="email"
            placeholder="Search notes..."
            value={searchQuery}
            onChange={handleSearch}
            className="w-full outline-none bg-transparent text-gray-600 text-sm"
          />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 192.904 192.904"
            width="16px"
            className="fill-gray-600"
          >
            <path d="m190.707 180.101-47.078-47.077c11.702-14.072 18.752-32.142 18.752-51.831C162.381 36.423 125.959 0 81.191 0 36.422 0 0 36.423 0 81.193c0 44.767 36.422 81.187 81.191 81.187 19.688 0 37.759-7.049 51.831-18.751l47.079 47.078a7.474 7.474 0 0 0 5.303 2.197 7.498 7.498 0 0 0 5.303-12.803zM15 81.193C15 44.694 44.693 15 81.191 15c36.497 0 66.189 29.694 66.189 66.193 0 36.496-29.692 66.187-66.189 66.187C44.693 147.38 15 117.689 15 81.193z"></path>
          </svg>
        </div>
      </div>
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
