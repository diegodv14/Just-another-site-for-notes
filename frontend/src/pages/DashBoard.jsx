import { useEffect, useState } from "react"
import { useUserContext } from "../context/userContext"
import { useNavigate } from "react-router-dom"
import { NoteList } from "../components/NoteList"
import { Categories } from "../components/Categories"
import { ToolBar } from "../components/ToolBar"
import { useNoteContext } from "../context/notesContext"
import noteServices from "../services/notes"
import { Note } from "../components/Note"


export const DashBoard = () => {

    const { user, setUser } = useUserContext()
    const [category, setCategory] = useState(null)
    const { notes, setNotes } = useNoteContext()
    const [search, setSearch] = useState("")
    const [foundedNotes, setFoundedNotes] = useState([])


    const navigate = useNavigate()

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

    const normalizeString = (str) => str.replace(/\s+/g, '').toLowerCase();

    useEffect(() => {
        if (search) {
            const filteredNotes = notes.filter(note =>
                normalizeString(note.title).includes(normalizeString(search))
            );
            setFoundedNotes(filteredNotes)
        }
    }, [search])

    useEffect(() => {
        if (!user.username && !user.id && !user.token) navigate('/')
    }, [user, category])


    return (
        <div className="w-screen h-screen font-[Kalam] text-black bg-white">
            <div className="flex flex-col w-full gap-2 relative font-[Poppins]">
                <ToolBar setSearch={setSearch} search={search} />
                {category === null && !search && <Categories setType={setCategory} />}
                {category?.category && !search && <NoteList dataCategory={category} setType={setCategory} />}
                {search && <section className="h-[425px] list p-6 pb-36 pr-12 overflow-y-auto">
                    {foundedNotes.map(note => <Note key={note.id} note={note} />)}
                </section>}
            </div>
        </div >
    )
}