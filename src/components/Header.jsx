import React, { useEffect, useState } from "react";
// import "./Header.css"; // Your custom CSS file
import { Link } from "react-router-dom";

function Header() {
   //  const [isScrolled, setIsScrolled] = useState(false);

   //  useEffect(() => {
   //     const handleScroll = () => {
   //        setIsScrolled(window.scrollY > 50); // Adjust this value based on when you want to hide the header text
   //     };

   //     window.addEventListener("scroll", handleScroll);
   //     return () => {
   //        window.removeEventListener("scroll", handleScroll);
   //     };
   //  }, []);

   return (
      <header className="sticky top-0 block bg-purple-700 w-full">
         <div>
            <h1 className="text-5xl font-bold mb-4 font-jockey">
               JEREMY MARK TUBONGBANUA
            </h1>
         </div>
         <nav className="">
            <div className="container mx-auto px-4">
               <ul className="flex space-x-10 text-lg py-2">
                  <li className="hover:text-blue-300">
                     <Link to="/about">ABOUT</Link>
                  </li>
                  <li className="hover:text-blue-300">
                     <Link to="/resume">RESUME</Link>
                  </li>
                  <li className="hover:text-blue-300">
                     <Link to="/projects">PROJECTS</Link>
                  </li>
                  <li className="hover:text-blue-300">
                     <Link to="/experiences">EXPERIENCES</Link>
                  </li>
               </ul>
            </div>
         </nav>
      </header>
   );
}

export default Header;
