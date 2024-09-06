import PropTypes from 'prop-types';
import { useState } from "react";
import db from "../appwrite/database"; // Corrected import path
import DeleteIcon from "../assets/DeleteIcon";

function Note({ setNotes, noteData }) {
    const [note, setNote] = useState(noteData);

    const handleUpdate = async () => {
        const completed = !note.completed;
        try {
            await db.notes.update(note.$id, { completed });
            setNote({ ...note, completed: completed });
        } catch (error) {
            console.error("Error updating note:", error);
        }
    };

    const handleDelete = async () => {
        try {
            await db.notes.delete(note.$id);
            setNotes((prevState) => prevState.filter((i) => i.$id !== note.$id));
        } catch (error) {
            console.error("Error deleting note:", error);
        }
    };

    return (
        <div className="note-wrapper">
            <div className="note-content">
                <p>{note.body}</p>
                <button onClick={handleUpdate}>
                    {note.completed ? "Mark as Incomplete" : "Mark as Complete"}
                </button>
                <button onClick={handleDelete}>
                    <DeleteIcon />
                </button>
            </div>
        </div>
    );
}

Note.propTypes = {
    setNotes: PropTypes.func.isRequired,
    noteData: PropTypes.shape({
        $id: PropTypes.string.isRequired,
        body: PropTypes.string.isRequired,
        completed: PropTypes.bool.isRequired,
    }).isRequired,
};

export default Note;