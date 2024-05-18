import { useState, useEffect } from "react"
import noteServices from "../services/notes"
import { useUserContext } from "../context/userContext"
import { useForm } from "react-hook-form"
import { Note } from "./Note"
import { useNoteContext } from "../context/notesContext"
import { Categories } from "../constants/Categories"


export const NoteList = ({ dataCategory, setType }) => {

    const { user } = useUserContext()
    const { addNote } = useNoteContext()
    const [isNewNote, setIsNewNote] = useState(false)
    const { register, handleSubmit, clearErrors } = useForm()

    useEffect(() => {
        console.log(dataCategory)
    }, [])

    const AddNote = async data => {
        const newNote = {
            content: data.content,
            important: data.important,
            category: data.category
        }
        const response = await noteServices.create(newNote, user.token)
        addNote(response)
        clearErrors()
        setIsNewNote(null)
    }

    const throwNote = () => {
        clearErrors()
        setIsNewNote(false)

    }
    return (
        <>

            <section className="flex flex-col gap-6 p-6">
                <div className="flex gap-4">
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
                </div>
                <ul>
                    {isNewNote && <form onSubmit={handleSubmit(AddNote)} className="w-full p-4 flex gap-4 bg-slate-200 rounded-lg">
                        <div className="flex gap-2">
                            <label htmlFor="title" className="font-semibold">Title:</label>
                            <input type="text" className="bg-white border" {...register("title")} />
                        </div>
                        <div className="flex gap-2">
                            <label htmlFor="title" className="font-semibold">Content:</label>
                            <input type="text" className="bg-white border" {...register("content")} />
                        </div>
                        <div className="flex gap-2">
                            <label htmlFor="" className="font-semibold">Importance:</label>
                            <select {...register("important")}>
                                <option value={false}>No Important</option>
                                <option value={true}>Important</option>
                            </select>
                        </div>
                        <div className="flex gap-2">
                            {dataCategory.category === "All" ? (<>
                                <label htmlFor="" className="font-semibold">Category:</label>
                                <select>
                                    {Categories.filter(category => category.category !== "All").map((category, i) => <option key={i} value={category.category}>{category.category}</option>)}
                                </select></>) : (<h1><span className="font-semibold">Category:</span>{dataCategory.category}</h1>)}
                        </div>
                        <button className="">
                            <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="green" className="bi bi-check-circle-fill" viewBox="0 0 16 16">
                                <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0m-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z" />
                            </svg>
                        </button>
                    </form>}
                    {dataCategory?.array?.length > 0 && dataCategory?.array.map(note => <Note key={note._id} note={note} />)}
                </ul>
            </section>
        </>
    )
}