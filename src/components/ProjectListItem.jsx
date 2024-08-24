import React from "react";

function ProjectListItem({ title, subtitle, description, imageSrc, altText }) {
  return (
    <div className="bg-black p-4 shadow-lg flex flex-col items-start">
      <div className="w-full mb-2">
        <img
          src={imageSrc}
          alt={altText}
          className="w-full h-40 object-cover"
        />
      </div>

      <div className="flex justify-between items-center w-full">
        <h2 className="text-3xl font-bold text-white">{title}</h2>
        <div className="bg-yellow-400 text-black font-semibold text-lg px-2">
          {subtitle}
        </div>
      </div>

      <div className="mt-2">
        <p className="text-sm text-gray-400">
          {description}
        </p>
      </div>
    </div>
  );
}

export default ProjectListItem;
