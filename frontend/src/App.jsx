import { useEffect } from "react"
import { DashBoard } from "./pages/DashBoard"
import { Register } from "./pages/Register"
import { BrowserRouter, Route, Routes } from 'react-router-dom'

const App = () => {


  useEffect(() => {
    console.log("Developed by ihide14/Diego Benavides - My website: https://diegoportfolioweb.vercel.app/#Home")

  }, [])

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