import React from "react";
import "./tailwind.css";
import "./global.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import About from "./screens/About";
import Projects from "./screens/Projects";
import Experiences from "./screens/Experiences";
import ProjectPage from "./components/ProjectPage";
import Awards from "./screens/Awards"; // Import the Awards component

function App() {
   return (
      <Router>
         <Header />
         <Routes>
            <Route path="/" element={<About />} />
            <Route path="/about" element={<About />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/projects/:projectId" element={<ProjectPage />} />
            <Route path="/experiences" element={<Experiences />} />
            <Route path="/awards" element={<Awards />} /> {/* Add Awards route */}
         </Routes>
      </Router>
   );
}

export default App;
