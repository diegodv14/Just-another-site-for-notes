import { useEffect, useState } from "react"
import { useUserContext } from "../context/userContext"
import noteServices from "../services/notes"
import { useNoteContext } from "../context/notesContext"
import { Filters } from "./Filters"
export const SideBar = () => {

    const { user } = useUserContext()
    const [profile, setProfile] = useState(null)
    const { notes } = useNoteContext()

    useEffect(() => {
        noteServices.getProfile(user.token).then(response => {
            setProfile(response[0])
            console.log(profile)
        })
    }, [notes])




    return (
        <>
            <nav className="w-[250px] h-full text-white bg-zinc-900 shadow-lg p-6 flex flex-col items-center font-[Poppins]">
                <div className="flex flex-col w-full items-center border-b gap-10 p-5">
                    <div className="flex justify-center items-center w-full gap-4">
                        <img src="/profile.png" className="size-12  rounded-full" alt="Your Photo" />
                        <h1>{user.username}</h1>
                    </div>
                    <div className="flex flex-col items-center gap-1 self-start">
                        <span className="flex justify-center items-center">{profile && profile?.notes?.length}</span>
                        <span>Notes</span>
                    </div>
                </div>
                <Filters />

            </nav>
        </>
    )
}