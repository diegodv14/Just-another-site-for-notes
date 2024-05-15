import { useState } from "react"
import noteServices from "../services/notes"


export const NoteForm = () => {
    const [newNote, setNewNote] = useState('a new note...')

    const addNote = event => {

    }

    const changeInput = (event) => {
        setNewNote(event.target.value)
    }

    return (
        <>
            <form onSubmit={addNote}>
                <input value={newNote}
                    onChange={changeInput} />
                <button> Save </button>
            </form>
        </>
    )
}