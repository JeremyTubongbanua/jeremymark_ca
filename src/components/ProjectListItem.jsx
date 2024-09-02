import React from "react";
import { getTagColor } from "../utils/tagColors";

function ProjectListItem({
  title,
  subtitle,
  description,
  date,
  imageSrc,
  altText,
  tags,
}) {
  return (
    <div className="bg-black p-4 shadow-lg flex flex-col items-start min-h-[400px]">
      <div className="w-full mb-2">
        <img
          src={imageSrc}
          alt={altText}
          className="w-full h-32 sm:h-40 object-cover"
        />
      </div>

      <div className="flex justify-between items-center w-full mb-2">
        <h2
          className={`text-lg sm:text-3xl font-bold text-white w-full ${
            title.length > 20 ? "text-base sm:text-2xl" : "text-lg sm:text-3xl"
          }`}
        >
          {title}
        </h2>
        {subtitle && (
          <div
            className={`bg-yellow-400 text-black font-semibold px-2 ${
              title.length > 20 ? "text-xs" : "text-sm"
            } ml-2`}
          >
            {subtitle}
          </div>
        )}
      </div>

      <div className="flex-1">
        <p className="text-xs sm:text-sm text-gray-400">{description}</p>
      </div>

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