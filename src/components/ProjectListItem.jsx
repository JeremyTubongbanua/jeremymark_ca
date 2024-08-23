import React from "react";

function ProjectListItem({ title, subtitle, date, imageSrc, altText }) {
  return (
    <div className="bg-gray-900 p-4 shadow-lg flex flex-col items-center">
      <div className="w-full mb-4">
        <img
          src={imageSrc}
          alt={altText}
          className="w-full h-48 object-cover"
        />
      </div>
      <div className="text-center">
        <h2 className="text-2xl font-bold text-white">{title}</h2>
        <p className="text-xl text-gray-400">{subtitle}</p>
        <p className="text-md text-gray-500 mt-2">
          {new Date(date).toLocaleDateString()}
        </p>
      </div>
    </div>
  );
}

export default ProjectListItem;
