import { Routes, Route, useLocation } from "react-router-dom"
import { useEffect } from "react"
import Navbar from './components/Navbar'
import Index from "./Pages/Index"
import About from "./Pages/About"
import initJQuery from "./utils/initJQuery"

function App() {
  const location = useLocation()

  useEffect(() => {
    setTimeout(() => {
      initJQuery()
    }, 500)
  }, [location])

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/about-us" element={<About />} />
      </Routes>
    </>
  )
}

export default App