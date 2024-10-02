import React, { useState } from "react";
import { Link } from "react-router-dom";

function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header className="w-screen font-jockey bg-bg-100">
      <div className="px-4 py-4 lg:px-48">
        <h1 className="text-5xl font-bold mb-4 lg:text-6xl">
          <Link to="/" className="hover:text-blue-300">
            JEREMY MARK TUBONGBANUA
          </Link>
        </h1>
      </div>
      <nav className="bg-secondary-100">
        <div className="flex items-center justify-between px-4 lg:px-48">
          {/* Desktop menu */}
          <ul className="hidden lg:flex space-x-10 text-xl py-4">
            <li className="hover:text-blue-300">
              <Link to="/about">ABOUT</Link>
            </li>
            <li className="hover:text-blue-300">
              <Link to="/projects">PROJECTS</Link>
            </li>
            <li className="hover:text-blue-300">
              <Link to="/experiences">EXPERIENCES</Link>
            </li>
            <li className="hover:text-blue-300">
              <Link to="/awards">AWARDS</Link> {/* Add Awards link */}
            </li>
          </ul>

          {/* Mobile menu button */}
          <button
            className="lg:hidden text-white text-3xl"
            onClick={toggleMobileMenu}
          >
            ☰
          </button>
        </div>

        {/* Mobile menu */}
        {isMobileMenuOpen && (
          <ul className="lg:hidden flex flex-col space-y-4 px-6 py-4 bg-secondary-100 text-xl">
            <li className="hover:text-blue-300">
              <Link to="/about" onClick={toggleMobileMenu}>
                ABOUT
              </Link>
            </li>
            <li className="hover:text-blue-300">
              <Link to="/projects" onClick={toggleMobileMenu}>
                PROJECTS
              </Link>
            </li>
            <li className="hover:text-blue-300">
              <Link to="/experiences" onClick={toggleMobileMenu}>
                EXPERIENCES
              </Link>
            </li>
            <li className="hover:text-blue-300">
              <Link to="/awards" onClick={toggleMobileMenu}>
                AWARDS
              </Link> {/* Add Awards link */}
            </li>
          </ul>
        )}
      </nav>
    </header>
  );
}

export default Header;
