import React from "react";
import "./tailwind.css";
import "./global.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import About from "./screens/About";

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/about" element={<About />} />
      </Routes>
    </Router>
  );
}

export default App;