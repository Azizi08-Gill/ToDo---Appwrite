import PropTypes from 'prop-types';
import { useState } from "react";
import db from "../appwrite/database"; 

function NoteForm({ setNotes }) {
    const [noteBody, setNoteBody] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!noteBody.trim()) return;

        try {
            const newNote = await db.notes.create({ body: noteBody, completed: false });

            console.log(newNote); 

            setNotes((prevState) => [newNote, ...prevState]);

            setNoteBody("");
        } catch (error) {
            console.error("Error creating note:", error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                value={noteBody}
                onChange={(e) => setNoteBody(e.target.value)}
                placeholder="Enter your note"
            />
            <button type="submit">Add Note</button>
        </form>
    );
}

NoteForm.propTypes = {
    setNotes: PropTypes.func.isRequired,
};

export default NoteForm;