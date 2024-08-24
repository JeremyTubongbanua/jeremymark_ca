import React from "react";
import "./tailwind.css";
import "./global.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import About from "./screens/About";
import Resume from "./screens/Resume";
import Projects from "./screens/Projects";
import Experiences from "./screens/Experiences";

function App() {
   return (
      <Router>
         <Header />
         <Routes>
            <Route path="/" element={<About />} />
            <Route path="/about" element={<About />} />
            <Route path="/resume" element={<Resume />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/experiences" element={<Experiences />} />
         </Routes>
      </Router>
   );
}

export default App;
