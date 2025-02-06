import { useState } from "react";
import ConfirmationDialog from "./ConfirmationDialog"; // Import the dialog component

interface NoteProps {
  note: { _id: string; title: string; content: string };
  onDelete: (id: string) => void;
  onEdit: (note: { _id: string; title: string; content: string }) => void;
}

export const Note = ({ note, onEdit, onDelete }: NoteProps) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isDelete, setIsDelete] = useState(false); // To differentiate between edit and delete action

  const handleEdit = () => {
    onEdit(note);
  };

  const handleDelete = () => {
    setIsDialogOpen(true);
    setIsDelete(true); // Indicating the delete action
  };

  const handleDialogConfirm = () => {
    if (isDelete) {
      onDelete(note._id); // Delete the note if it's the delete action
    } else {
      onEdit(note); // Edit the note if it's the edit action
    }
    setIsDialogOpen(false); // Close the dialog after action
  };

  const handleDialogCancel = () => {
    setIsDialogOpen(false); // Close the dialog without doing anything
  };

  return (
    <div className="border p-4 rounded odd:bg-gray-100 even:bg-gray-200 shadow md:flex items-center justify-between">
      <div className="flex flex-col">
        <h2 className="font-bold text-xl">{note.title}</h2>
        <p className="text-gray-700 flex flex-wrap w-3/4">{note.content}</p>
      </div>
      <div className="mt-2 w-1/4 flex md:justify-end">
        <button
          onClick={handleEdit}
          className="bg-blue-500 text-white px-2 py-1 rounded mr-2"
        >
          Edit
        </button>
        <button
          onClick={handleDelete}
          className="bg-red-500 text-white px-2 py-1 rounded"
        >
          Delete
        </button>
      </div>

      {/* Confirmation Dialog */}
      <ConfirmationDialog
        isOpen={isDialogOpen}
        message="Are you sure you want to delete this note?"
        onConfirm={handleDialogConfirm}
        onCancel={handleDialogCancel}
        confirmText="Yes, I'm sure"
        cancelText="No, go back"
      />
    </div>
  );
};
