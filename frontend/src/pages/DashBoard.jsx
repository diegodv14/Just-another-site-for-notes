import { useEffect, useState } from "react"
import { useUserContext } from "../context/userContext"
import { useNavigate } from "react-router-dom"
import { NoteList } from "../components/NoteList"
import { Categories } from "../components/Categories"
import { ToolBar } from "../components/ToolBar"
import { useNoteContext } from "../context/notesContext"
import noteServices from "../services/notes"


export const DashBoard = () => {

    const { user, setUser } = useUserContext()
    const [category, setCategory] = useState(null)
    const { setNotes } = useNoteContext()

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

    useEffect(() => {
        if (!user.username && !user.id && !user.token) navigate('/')
    }, [user])


    return (
        <div className="w-screen h-screen font-[Kalam] text-black bg-white">
            <div className="flex flex-col w-full gap-2 font-[Poppins]">
                <ToolBar />
                {category === null && <Categories setType={setCategory} />}
                {category && <NoteList category={category} setType={setCategory} />}
            </div>
        </div >
    )
}