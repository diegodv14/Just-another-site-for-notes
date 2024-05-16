import { useEffect } from "react"
import { useUserContext } from "../context/userContext"
import { useNavigate } from "react-router-dom"
import { NoteList } from "../components/NoteList"
import { SideBar } from "../components/SideBar"


export const DashBoard = () => {

    const { user } = useUserContext()

    const navigate = useNavigate()

    useEffect(() => {
        if (!user.username && !user.id && !user.token) navigate('/')
    }, [user])




    return (
        <div className="w-screen h-screen font-[Kalam] flex flex-row text-black bg-white">
            <SideBar />
            <NoteList />
        </div >
    )
}