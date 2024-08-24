import React from "react";

function ProjectListItem({ title, subtitle, description, imageSrc, altText, tags }) {
  const getTagColor = (category) => {
    switch (category) {
      case "language":
        return "bg-green-500 text-white";
      case "field":
        return "bg-yellow-400 text-black";
      case "tech":
        return "bg-purple-500 text-white";
      case "progress":
        return "bg-orange-500 text-white";
      case "association":
        return "bg-red-500 text-white";
      default:
        return "bg-gray-400 text-white";
    }
  };

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
        <div className="bg-yellow-400 text-black font-semibold text-sm px-2">
          {subtitle}
        </div>
      </div>

      <div className="mt-2">
        <p className="text-sm text-gray-400">
          {description}
        </p>
      </div>

      {/* Tag Collection */}
      <div className="mt-4 flex flex-wrap gap-1">
        {tags.map((tag, index) => (
          <span
            key={index}
            className={`text-xs px-1 py-0.5 rounded ${getTagColor(tag.category)}`}
          >
            {tag.name}
          </span>
        ))}
      </div>
    </div>
  );
}

export default ProjectListItem;