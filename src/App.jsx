import React from "react"
import { Routes, Route, Navigate } from "react-router-dom"
import Layout from "./Layout.jsx"
import Home from "./pages/Home.jsx"
import About from "./pages/About.jsx"
import Industries from "./pages/Industries.jsx"
import Services from "./pages/Services.jsx"
import Projects from "./pages/Projects.jsx"
import Certifications from "./pages/Certifications.jsx"
import Contact from "./pages/Contact.jsx"

function Wrap({ name, Page }) {
  return (
    <Layout currentPageName={name}>
      <Page />
    </Layout>
  )
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/Home" replace />} />
      <Route path="/Home" element={<Wrap name="Home" Page={Home} />} />
      <Route path="/About" element={<Wrap name="About" Page={About} />} />
      <Route path="/Industries" element={<Wrap name="Industries" Page={Industries} />} />
      <Route path="/Services" element={<Wrap name="Services" Page={Services} />} />
      <Route path="/Projects" element={<Wrap name="Projects" Page={Projects} />} />
      <Route path="/Certifications" element={<Wrap name="Certifications" Page={Certifications} />} />
      <Route path="/Contact" element={<Wrap name="Contact" Page={Contact} />} />
      <Route path="*" element={<Navigate to="/Home" replace />} />
    </Routes>
  )
}
