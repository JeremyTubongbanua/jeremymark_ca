import React from "react";
import { getTagColor } from "../utils/tagColors";
import { format } from "date-fns";

function ExperienceListItem({
  title,
  subtitle,
  description,
  fromDate, 
  toDate,
  imageSrc,
  altText,
  tags,
}) {
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
        <h2
          className={`text-3xl font-bold text-white w-full ${
            title.length > 20 ? "text-2xl" : "text-3xl"
          }`}
        >
          {title}
        </h2>
        <div
          className={`bg-yellow-400 text-black font-semibold px-2 ${
            subtitle.length > 20 ? "text-xs" : "text-sm"
          } ml-2`}
        >
          {subtitle}
        </div>
      </div>

      <div className="text-gray-400 text-sm mt-2">
        {`${format(new Date(fromDate), "MMM yyyy")} - ${toDate ? format(new Date(toDate), "MMM yyyy") : "Present"}`}
      </div>

      <div className="mt-2">
        <p className="text-sm text-gray-400">{description}</p>
      </div>

      <div className="mt-4 flex flex-wrap gap-1">
        {tags.map((tag, index) => (
          <span
            key={index}
            className={`text-xs px-1 py-0.5 rounded ${getTagColor(
              tag.category
            )}`}
          >
            {tag.name}
          </span>
        ))}
      </div>
    </div>
  );
}

export default ExperienceListItem;
