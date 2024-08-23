import React, { useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import "react-pdf/dist/esm/Page/AnnotationLayer.css";

// Ensure the worker version matches the library version
pdfjs.GlobalWorkerOptions.workerSrc = `/pdfjs/pdf.worker.min.mjs`;

const Resume = () => {
  const pdfUrl = "/assets/JeremyTubongbanua_Resume.pdf";
  const [numPages, setNumPages] = useState(null);

  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
  };

  return (
    <div className="min-h-screen flex flex-col items-center p-8">
      <h1 className="text-4xl font-bold mb-8">Resume</h1>
      <p>Last updated August 23, 2024</p>
      <a href={"/assets/JeremyTubongbanua_Resume.pdf"}>
        <u>JeremyTubongbanua_Resume.pdf</u>
      </a>
    </div>
  );
};

export default Resume;
