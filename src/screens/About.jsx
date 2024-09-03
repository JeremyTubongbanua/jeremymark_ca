import React from "react";
import CurrentlyPlaying from "../components/CurrentlyPlaying";

function About() {
  return (
    <div className="min-h-screen flex flex-col items-center p-24">
      <div className="flex flex-col md:flex-row items-center justify-center max-w-5xl space-y-8 md:space-y-0 md:space-x-8">
        <div className="flex flex-col items-start max-w-lg">
          <h2 className="text-4xl sm:text-6xl md:text-9xl font-bold text-white mb-6">
            Incoming New Grad
          </h2>
          <p className="text-lg sm:text-xl md:text-2xl text-white mb-6">
            A 4th-year Software Engineering Student at Ontario Tech University
            and a contracted Software Engineer at Atsign.
          </p>
          <div className="flex flex-col space-y-4">
            <a
              href="https://github.com/JeremyTubongbanua"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white flex items-center text-base sm:text-lg md:text-xl"
            >
              <img
                src={"/assets/github_logo.png"}
                alt="GitHub"
                className="w-5 h-5 sm:w-6 sm:h-6 mr-3 object-cover"
              />
              github.com/JeremyTubongbanua
            </a>
            <a
              href="https://www.linkedin.com/in/jeremy-tubongbanua"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white flex items-center text-base sm:text-lg md:text-xl"
            >
              <img
                src={"/assets/linkedin_logo.png"}
                alt="LinkedIn"
                className="w-5 h-5 sm:w-6 sm:h-6 mr-3 object-cover"
              />
              linkedin.com/in/jeremy-tubongbanua
            </a>
            <a
              href="mailto:jeremy.tubongbanua@gmail.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white flex items-center text-base sm:text-lg md:text-xl"
            >
              <img
                src={"/assets/gmail_logo.png"}
                alt="Email"
                className="w-5 h-5 sm:w-6 sm:h-6 mr-3 object-cover"
              />
              jeremy.tubongbanua@gmail.com
            </a>
            <a
              href="/assets/JeremyTubongbanua_Resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white flex items-center text-base sm:text-lg md:text-xl"
            >
              <img
                src={"/assets/pdf_icon.png"}
                alt="Resume"
                className="w-5 h-5 sm:w-6 sm:h-6 mr-3 object-cover"
              />
              Resume
            </a>
          </div>
        </div>
        <div className="mt-8 md:mt-0 md:ml-8 w-full max-w-sm sm:max-w-md md:max-w-2xl">
          <img
            src={"/assets/sunset.jpg"}
            alt="Jeremy at sunset in Banff"
            className="rounded-lg shadow-lg w-full h-auto"
          />
        </div>
      </div>
      <div className="mt-12 w-full max-w-5xl">
        <h3 className="text-2xl text-white font-bold mb-4">Currently Listening To</h3>
        <CurrentlyPlaying />
      </div>
    </div>
  );
}

export default About;
