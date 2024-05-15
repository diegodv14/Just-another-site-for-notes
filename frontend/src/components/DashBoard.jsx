import { useEffect } from "react"
import { useUserContext } from "../context/userContext"
import { NoteList } from "./NoteList"
import { useNavigate } from "react-router-dom"
import { NoteForm } from "./NoteForm"
import { NavBar } from "./NavBar"

export const DashBoard = () => {

    const { user } = useUserContext()

    const navigate = useNavigate()

    useEffect(() => {
        if (!user.username && !user.id) navigate('/')
    }, [user])

    return (
        <div className="w-screen h-screen font-[Kalam]  p-8 ">
            <NavBar />
            <div className="">
                <NoteForm />
                <NoteList />

            </div>
        </div>
    )
}