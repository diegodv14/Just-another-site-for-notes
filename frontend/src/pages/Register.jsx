import { useForm } from "react-hook-form"
import AuthServices from "../services/login"
import { useEffect, useState } from "react"
import { useNavigate } from 'react-router-dom'
import { useUserContext } from "../context/userContext"
import { useNoteContext } from "../context/notesContext"
export const Register = () => {

    const [FormState, setFormState] = useState("login")
    const [errorMessage, setErrorMessage] = useState(null)
    const [confirmMessage, setConfirmMessage] = useState(null)
    const { user, setUser } = useUserContext()
    const { setNotes } = useNoteContext()
    const { register, handleSubmit, formState: { errors } } = useForm()
    const navigate = useNavigate()

    useEffect(() => {
        setNotes([])
    }, [])

    useEffect(() => {
        if (user.username && user.id && user.token) {
            navigate('/notes')
        }
    }, [user])

    const onSubmit = (data) => {
        if (FormState === "register") AuthServices.GetRegister(data).then(response => {
            if (response.error) {
                setErrorMessage(response.error)
                setTimeout(() => setErrorMessage(null), 5000)
            }
            else {
                setConfirmMessage("User create. Now you can login")
                setTimeout(() => setConfirmMessage(null), 5000)
            }

        })
        else if (FormState === "login") AuthServices.GetLogin(data).then(response => {
            if (response.error) {
                setErrorMessage(response.error)
                setTimeout(() => setErrorMessage(null), 5000)
            }
            if (response.username) {
                setUser(response)
                const SavedUser = JSON.stringify({
                    id: String(response.id),
                    username: response.username,
                    token: response.token
                })
                window.localStorage.setItem('user', SavedUser)
            }
        })
        else {
            setErrorMessage("An internal error has been ocurred, please refresh the page.")
        }
    }

    return (
        <>
            <div className="flex auth flex-col gap-7 justify-center relative items-center w-screen h-screen text-white">
                <div className="top-[5%] shadow-2xl left-[42%] absolute  flex flex-row gap-6 text-white rounded-full p-3">
                    <button className={`flex flex-row gap-2 justify-center items-center p-1 opacity-80 ${FormState === "register" && "opacity-100 border-b-2"}`} onClick={() => setFormState("register")}>Register <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" fill="currentColor" className="bi bi-clipboard-fill" viewBox="0 0 16 16">
                        <path fillRule="evenodd" d="M10 1.5a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h3a.5.5 0 0 0 .5-.5zm-5 0A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5v1A1.5 1.5 0 0 1 9.5 4h-3A1.5 1.5 0 0 1 5 2.5zm-2 0h1v1A2.5 2.5 0 0 0 6.5 5h3A2.5 2.5 0 0 0 12 2.5v-1h1a2 2 0 0 1 2 2V14a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V3.5a2 2 0 0 1 2-2" />
                    </svg></button>
                    <button className={`flex flex-row gap-2 justify-center items-center p-1 opacity-80 ${FormState === "login" && "opacity-100 border-b-2"}`} onClick={() => setFormState("login")}>Login<svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" fill="currentColor" className="bi bi-door-open-fill" viewBox="0 0 16 16">
                        <path d="M1.5 15a.5.5 0 0 0 0 1h13a.5.5 0 0 0 0-1H13V2.5A1.5 1.5 0 0 0 11.5 1H11V.5a.5.5 0 0 0-.57-.495l-7 1A.5.5 0 0 0 3 1.5V15zM11 2h.5a.5.5 0 0 1 .5.5V15h-1zm-2.5 8c-.276 0-.5-.448-.5-1s.224-1 .5-1 .5.448.5 1-.224 1-.5 1" />
                    </svg></button>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className="flex mt-14  text-black flex-col gap-6 p-8 rounded-lg justify-center transform: rotate-[3deg]">
                    <h1 style={{ userSelect: "none" }} className="self-center text-3xl flex gap-4 justify-center items-center">Just another site for notes <span className="animate-bounce"><svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" className="bi bi-pencil" viewBox="0 0 16 16">
                        <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325" />
                    </svg></span>
                    </h1>
                    {errorMessage !== null && <span className="text-[15px] text-red-700 h-fit pt-2 self-center">{errorMessage}</span>}
                    {confirmMessage !== null && <span className="text-[15px] text-green-700 h-fit pt-2 self-center">{confirmMessage}</span>}

                    <div className="flex flex-col self-center">
                        <div className="flex gap-2">
                            <label htmlFor="user" className="label">
                                <input type="text" id="user" placeholder="" className="text-black input" autoComplete="off" {...register("username", { required: true })} />
                                <span className="label_name" style={{ userSelect: "none" }}>Enter your Username</span>
                            </label>
                        </div>
                        {errors?.username?.type === "required" && <span className='text-[10px] text-red-700 pt-2 error'>the username is required</span>}
                    </div>
                    <div className="flex flex-col self-center">
                        <div className="flex gap-2">
                            <label htmlFor="password" className="label">
                                <input type="password" id="password" placeholder="" className="text-black input" autoComplete="off" {...register("password", { required: true })} />
                                <span className="label_name" style={{ userSelect: "none" }}>Enter your password</span>
                            </label>
                        </div>

                        {errors?.password?.type === "required" && <span className="text-[10px] text-red-700 pt-2 error">the password is required</span>}
                    </div>
                    <button type="submit" className="rounded-full self-center w-fit h-fit opacity-80 hover:opacity-100 active:scale-110"><svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="currentColor" className="bi bi-arrow-right-circle-fill" viewBox="0 0 16 16">
                        <path d="M8 0a8 8 0 1 1 0 16A8 8 0 0 1 8 0M4.5 7.5a.5.5 0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5z" />
                    </svg></button>
                </form >
            </div >
        </>
    )
}