import { useEffect } from "react"
import { DashBoard } from "./components/DashBoard"
import { Register } from "./components/Register"
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { useUserContext } from "./context/userContext"

const App = () => {

  const { user } = useUserContext()


  useEffect(() => {
    console.log("Developed by ihide14/Diego Benavides - My website: https://diegoportfolioweb.vercel.app/#Home")
    console.log(user)

  }, [user])

  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Register />} />
        <Route path="/notes" element={<DashBoard />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App