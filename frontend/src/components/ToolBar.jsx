import { useEffect, useState } from "react"
import { useUserContext } from "../context/userContext"
import AuthServices from "../services/login"
import noteServices from "../services/notes"



export const ToolBar = () => {

    const { user, setUser } = useUserContext()
    const [profile, setProfile] = useState(null)

    useEffect(() => {
        noteServices.getProfile(user.token).then(response => {
            setProfile(response[0])
        })
    }, [])

    const logout = async () => {
        await AuthServices.GetLogout()
        setUser({
            username: null,
            id: null,
            token: null
        })
        window.localStorage.removeItem('user')
    }

    return (
        <><section className="w-full h-[100px] border-b p-6 flex gap-6 items-center justify-between">
            <div className="flex flex-row gap-4 items-center">
                <img src="/profile.png" alt="You" className="size-10 rounded-full" />
                <div className=" flex flex-col">
                    <h1>Something do you want to remember?</h1>
                    <span className="font-bold">{profile?.username}</span>
                </div>
            </div>
            <div className="">
                <input type="text" className="border-b w-[350px] border-black focus:border-b" />
            </div>
            <div className="flex items-center">
                <button title="Logout" onClick={() => logout()} className="scale-100 active:scale-90">
                    <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" className="bi bi-box-arrow-left" viewBox="0 0 16 16">
                        <path fillRule="evenodd" d="M6 12.5a.5.5 0 0 0 .5.5h8a.5.5 0 0 0 .5-.5v-9a.5.5 0 0 0-.5-.5h-8a.5.5 0 0 0-.5.5v2a.5.5 0 0 1-1 0v-2A1.5 1.5 0 0 1 6.5 2h8A1.5 1.5 0 0 1 16 3.5v9a1.5 1.5 0 0 1-1.5 1.5h-8A1.5 1.5 0 0 1 5 12.5v-2a.5.5 0 0 1 1 0z" />
                        <path fillRule="evenodd" d="M.146 8.354a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L1.707 7.5H10.5a.5.5 0 0 1 0 1H1.707l2.147 2.146a.5.5 0 0 1-.708.708z" />
                    </svg>
                </button>
            </div>
        </section></>
    )
}