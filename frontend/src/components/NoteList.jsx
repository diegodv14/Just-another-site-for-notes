import { useState, useEffect } from "react"
import noteServices from "../services/notes"
import { useUserContext } from "../context/userContext"
import { ToolBar } from "./ToolBar"
import { useForm } from "react-hook-form"
import { useNavigate } from "react-router-dom"
import { Note } from "./Note"
import { useNoteContext } from "../context/notesContext"


export const NoteList = () => {

    const [isNewNote, setIsNewNote] = useState("")
    const { notes, setNotes, addNote } = useNoteContext()
    const { user, setUser } = useUserContext()
    const navigate = useNavigate()
    const { register, handleSubmit, formState: { errors }, setValue, clearErrors } = useForm({
        defaultValues: {
            importance: false
        }
    })


    useEffect(() => {
        noteServices.getAll(user.token).then(response => {
            if (response.error === "The token is deprecated") {
                setUser({
                    username: null,
                    id: null,
                    token: null
                })
                window.localStorage.removeItem('user')
                navigate('/')
            }
            else {
                setNotes(response)
            }
        }
        )
    }, [])

    const AddNote = async data => {
        const newNote = {
            content: data.content,
            important: data.important,
            color: isNewNote.background
        }
        const response = await noteServices.create(newNote, user.token)
        addNote(response)
        clearErrors()
        setValue("content", "")
        setValue("important", false)
        setIsNewNote(null)
    }

    const throwNote = () => {
        clearErrors()
        setValue("content", "")
        setValue("important", false)
        setIsNewNote(null)
    }
    return (
        <>
            <div className="flex flex-col w-full gap-2">
                <ToolBar setIsNewNote={setIsNewNote} />
                <section className="flex-1 pl-6 pr-6 pb-6 shadow-xl">
                    <ul className="p-6 overflow-y-auto pb-24 justify-center list">
                        {isNewNote && <form onSubmit={handleSubmit(AddNote)} className={`shadow-xl size-64 rounded-md p-4 flex items-center flex-col justify-between ${isNewNote.background}`}>
                            <div className="flex flex-col
                             items-center  gap-4">
                                <input type="text" {...register("content", {
                                    required: true
                                })} />
                                {errors?.content?.type === "required" && <span className='text-[10px] text-white pt-2 error'>The note cannot be empty</span>}
                                <select {...register("important")}>
                                    <option value={false}>Not important</option>
                                    <option value={true}>Important</option>
                                </select>
                            </div>
                            <div className="flex flex-row items-center gap-4">
                                <button type="submit"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="white" className="bi bi-send-fill" viewBox="0 0 16 16">
                                    <path d="M15.964.686a.5.5 0 0 0-.65-.65L.767 5.855H.766l-.452.18a.5.5 0 0 0-.082.887l.41.26.001.002 4.995 3.178 3.178 4.995.002.002.26.41a.5.5 0 0 0 .886-.083zm-1.833 1.89L6.637 10.07l-.215-.338a.5.5 0 0 0-.154-.154l-.338-.215 7.494-7.494 1.178-.471z" />
                                </svg></button>
                                <button onClick={throwNote}><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="white" className="bi bi-x-lg" viewBox="0 0 16 16">
                                    <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8z" />
                                </svg></button>
                            </div>
                        </form>}
                        {notes.length === 0 && <span className="self-center text-4xl">There are no notes</span>}
                        {notes.map(note =>
                            <Note key={String(note._id)} note={note} />
                        )}
                    </ul>
                </section>
            </div>
        </>
    )
}