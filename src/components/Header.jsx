import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Header() {

   return (
      <header className="w-screen font-jockey bg-bg-100 ">
         <div>
            <h1 className="text-5xl font-bold mb-4 px-48 py-4 ">
               JEREMY MARK TUBONGBANUA
            </h1>
         </div>
         <nav className="">
            <div className="bg-secondary-100 px-48">
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
