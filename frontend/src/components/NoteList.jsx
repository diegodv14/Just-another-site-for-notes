import { useState, useEffect } from "react"
import noteServices from "../services/notes"
import { useUserContext } from "../context/userContext"
import { ToolBar } from "./ToolBar"
import { Filters } from "./Filters"


export const NoteList = () => {

    const { isNewNote, setIsNewNote } = useState(false)
    const [notes, setNotes] = useState([])
    const { user } = useUserContext()



    useEffect(() => {
        noteServices.getAll(user.token).then(response => {
            setNotes(response)
        }
        )
    }, [])



    return (
        <>
            <div className="flex flex-col w-full gap-2">
                <ToolBar isNewNote={isNewNote} setIsNewNote={setIsNewNote} />
                <Filters />
                <section className="flex-1 pl-6 pr-6 pb-6 shadow-xl">
                    <ul className="h-full border-2">
                        {notes.map(note =>
                            <li key={String(note._id)}>{note.content}{note.importance}</li>
                        )}
                    </ul>
                </section>
            </div>
        </>
    )
}