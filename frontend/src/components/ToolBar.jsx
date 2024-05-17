import { useState } from "react"
import { useUserContext } from "../context/userContext"
import AuthServices from "../services/login"
import { NoteColors } from "../constants/Colors.d"



export const ToolBar = ({ setIsNewNote }) => {

    const { setUser } = useUserContext()

    const logout = async () => {
        await AuthServices.GetLogout()
        setUser({
            username: null,
            id: null,
            token: null
        })
        window.localStorage.removeItem('user')
    }

    const [isSelectedColor, setIsSelectedColor] = useState(false)

    return (
        <><section className="w-full h-[100px] border-b p-6 flex gap-6 items-center justify-between">
            <div className="gap-6 flex items-center">
                <button title="Add Note" onClick={() => setIsSelectedColor(!isSelectedColor)} className="scale-100 active:scale-90"><svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" className="bi bi-journal-plus" viewBox="0 0 16 16">
                    <path fillRule="evenodd" d="M8 5.5a.5.5 0 0 1 .5.5v1.5H10a.5.5 0 0 1 0 1H8.5V10a.5.5 0 0 1-1 0V8.5H6a.5.5 0 0 1 0-1h1.5V6a.5.5 0 0 1 .5-.5" />
                    <path d="M3 0h10a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2v-1h1v1a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H3a1 1 0 0 0-1 1v1H1V2a2 2 0 0 1 2-2" />
                    <path d="M1 5v-.5a.5.5 0 0 1 1 0V5h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1zm0 3v-.5a.5.5 0 0 1 1 0V8h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1zm0 3v-.5a.5.5 0 0 1 1 0v.5h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1z" />
                </svg></button>
                {isSelectedColor && <div className="flex flex-row gap-3 items-center">
                    {NoteColors.map((color, i) => <button key={i} className={`size-4 rounded-full ${color}`} onClick={() => {
                        setIsNewNote({ background: color })
                        setIsSelectedColor(false)
                    }}></button>)}
                </div>}
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