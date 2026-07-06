import { Routes, Route, useLocation } from "react-router-dom"
import { useEffect } from "react"
import Navbar from './components/Navbar'
import Footer from "./components/Footer"
import Index from "./Pages/Index"
import About from "./Pages/About"
import initJQuery from "./utils/initJQuery"
import Classesdetails from "./Pages/Classesdetails"
import ClassTimetable from "./Pages/ClassTimetable"
import BmiCalculator from "./Pages/BmiCalculator"
import NotFound from "./Pages/NotFound"
import Services from "./Pages/Services"
import Team from "./Pages/Ourteam"
import Contact from "./Pages/Contact"
import Gallery from "./Pages/Gallery"
import Ourblog from "./Pages/Ourblog"
import Blogdetails from "./Pages/Blogdetails"
import Login from "./Pages/Login"
import Signup from "./Pages/Signup"
import ForgotPassword from "./Pages/ForgotPassword"
import ResetPassword from "./Pages/ResetPassword"
import Dashboard from "./Pages/Dashboard";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  const location = useLocation()

  // Layout kin pages par hide karna hai
  const noLayoutRoutes = ['/login', '/signup', '/member/dashboard', '/owner/dashboard']
  // Layout kin pages par hide karna hai
  const hideLayout =
    location.pathname === '/login' ||
    location.pathname === '/signup' ||
    location.pathname === '/forgot-password' ||
    location.pathname === '/reset-password' ||
    location.pathname.startsWith('/member') ||
    location.pathname.startsWith('/owner') ||
    location.pathname.startsWith('/admin')

  useEffect(() => {
    setTimeout(() => {
      initJQuery()
    }, 500)
  }, [location])

  return (
    <>
      {/* Agar layout hide nahi karna, toh Navbar dikhao */}
      {!hideLayout && <Navbar />}

      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/about-us" element={<About />} />
        <Route path="/class-details" element={<Classesdetails />} />
        <Route path="/classes" element={<Classesdetails />} />
        <Route path="/class-timetable" element={<ClassTimetable />} />
        <Route path="/bmi-calculator" element={<BmiCalculator />} />
        <Route path="/404" element={<NotFound />} />
        <Route path="*" element={<NotFound />} />
        <Route path="/services" element={<Services />} />
        <Route path="/team" element={<Team />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/blog" element={<Ourblog />} />
        <Route path="/blog-details" element={<Blogdetails />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        
        <Route
          path="/member/dashboard"
          element={
            <ProtectedRoute allowedRoles={["member", "admin"]}>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/owner/dashboard"
          element={
            <ProtectedRoute allowedRoles={["owner", "admin"]}>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/dashboard"
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <Dashboard />
            </ProtectedRoute>
          }
        />
      </Routes>

      {/* Agar layout hide nahi karna, toh Footer dikhao */}
      {!hideLayout && <Footer />}
    </>
  )
}

export default App
