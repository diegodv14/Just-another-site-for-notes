import { useEffect, useState } from "react"
import noteServices from "../services/notes"
import { useUserContext } from "../context/userContext"
import { useForm } from "react-hook-form"
import { Note } from "./Note"
import { useNoteContext } from "../context/notesContext"
import { NewNote } from "./NewNote"


export const NoteList = ({ dataCategory, setType }) => {

    const { user } = useUserContext()
    const { notes, addNote, filter, setFilter } = useNoteContext()
    const [filteredArray, setFilteredArray] = useState()
    const [isNewNote, setIsNewNote] = useState(false)
    const { clearErrors, setValue } = useForm({
        defaultValues: {
            important: false,
        }
    })


    useEffect(() => {
        if (dataCategory.category === "All" && filter === null) setFilteredArray(notes)
        else if (dataCategory.category === "All" && filter === true) setFilteredArray(notes.filter(note => note.important === filter))
        else if (dataCategory.category === "All" && filter === false) setFilteredArray(notes.filter(note => note.important === filter))
        else if (filter !== null) {
            const newArray = notes.filter(note => note.category === dataCategory.category).filter(note => note.important === filter)
            setFilteredArray(newArray)
        }
    }, [notes, filter])





    const AddNote = async data => {
        setIsNewNote(null)
        const newNote = {
            title: data.title,
            content: data.content,
            important: data.important,
            category: data.category || dataCategory.category
        }
        const response = await noteServices.create(newNote, user.token)
        addNote(response)
        clearErrors()
    }

    const throwNote = () => {
        clearErrors()
        setIsNewNote(false)
        setValue("title", "")
        setValue("content", "")

    }
    return (
        <>
            <section className="flex flex-col gap-6 p-6">
                <div className="flex gap-4">
                    <div className="flex justify-between items-center w-full">
                        <div className="flex gap-4">
                            <button onClick={() => setType(null)} title="Go Back"><svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" className="bi bi-backspace" viewBox="0 0 16 16">
                                <path d="M5.83 5.146a.5.5 0 0 0 0 .708L7.975 8l-2.147 2.146a.5.5 0 0 0 .707.708l2.147-2.147 2.146 2.147a.5.5 0 0 0 .707-.708L9.39 8l2.146-2.146a.5.5 0 0 0-.707-.708L8.683 7.293 6.536 5.146a.5.5 0 0 0-.707 0z" />
                                <path d="M13.683 1a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2h-7.08a2 2 0 0 1-1.519-.698L.241 8.65a1 1 0 0 1 0-1.302L5.084 1.7A2 2 0 0 1 6.603 1zm-7.08 1a1 1 0 0 0-.76.35L1 8l4.844 5.65a1 1 0 0 0 .759.35h7.08a1 1 0 0 0 1-1V3a1 1 0 0 0-1-1z" />
                            </svg></button>
                            {!isNewNote ? (<button onClick={() => setIsNewNote(true)} title="Add Note" className="scale-100 active:scale-90"><svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" className="bi bi-journal-plus" viewBox="0 0 16 16">
                                <path fillRule="evenodd" d="M8 5.5a.5.5 0 0 1 .5.5v1.5H10a.5.5 0 0 1 0 1H8.5V10a.5.5 0 0 1-1 0V8.5H6a.5.5 0 0 1 0-1h1.5V6a.5.5 0 0 1 .5-.5" />
                                <path d="M3 0h10a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2v-1h1v1a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H3a1 1 0 0 0-1 1v1H1V2a2 2 0 0 1 2-2" />
                                <path d="M1 5v-.5a.5.5 0 0 1 1 0V5h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1zm0 3v-.5a.5.5 0 0 1 1 0V8h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1zm0 3v-.5a.5.5 0 0 1 1 0v.5h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1z" />
                            </svg></button>) : (<button onClick={() => throwNote()} title="Close new Note" className="scale-100 active:scale-90">
                                <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" className="bi bi-x-lg" viewBox="0 0 16 16">
                                    <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8z" />
                                </svg>
                            </button>)}
                            <div>
                                <h1>You are in Category <span className="font-bold underline">{dataCategory?.category}</span></h1>
                            </div>
                        </div>
                        <div className="flex  items-center flex-row gap-3 mr-6">
                            <span className="font-bold">Let's see:</span>
                            <button onClick={() => setFilter(null)} className={`p-2 box-border rounded-lg border border-black ${filter === null && "bg-black text-white"}`}>All Notes</button>
                            <button onClick={() => setFilter(true)} className={`p-2 box-border rounded-lg border border-black ${filter && "bg-black text-white"}`}>Important Notes</button>
                            <button onClick={() => setFilter(false)} className={`p-2 box-border rounded-lg border border-black ${filter === false && "bg-black text-white"}`}>No Important Notes</button>
                        </div>
                    </div>
                </div>
                {isNewNote && <NewNote AddNote={AddNote} dataCategory={dataCategory} />}
                <ul className="h-fit list gap-4 p-2 pr-12">
                    {filteredArray?.length > 0 && filteredArray.map(note => <Note key={note._id} note={note} />)}
                </ul>
            </section>
        </>
    )
}