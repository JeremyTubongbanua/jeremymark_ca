import React, { useEffect, useState } from "react";
import "./Header.css"; // Your custom CSS file

function Header() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50); // Adjust this value based on when you want to hide the header text
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <header className={`w-full transition-all duration-300 ${isScrolled ? "header-scrolled" : ""}`}>
      <div className={`container mx-auto px-4 py-4 ${isScrolled ? "hidden" : ""}`}>
        <h1 className="text-5xl font-bold mb-4 font-jockey">
          JEREMY MARK TUBONGBANUA
        </h1>
      </div>
      <nav className="sticky-nav">
        <div className="container mx-auto px-4">
          <ul className="flex space-x-10 text-lg py-2">
            <li className="hover:text-blue-300">
              <a href="/about">ABOUT</a>
            </li>
            <li className="hover:text-blue-300">
              <a href="/resume">RESUME</a>
            </li>
            <li className="hover:text-blue-300">
              <a href="/projects">PROJECTS</a>
            </li>
            <li className="hover:text-blue-300">
              <a href="/experiences">EXPERIENCES</a>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
}

export default Header;
