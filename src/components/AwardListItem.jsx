import React from "react";

function AwardListItem({ title, description, date, imageSrc, altText }) {
  const formatDate = (dateString) => {
    const dateObj = new Date(dateString);
    return dateObj.toLocaleDateString('en-US', { year: 'numeric', month: 'short' });
  };

  return (
    <div className="bg-black p-4 shadow-lg flex flex-col items-start min-h-[300px]">
      <div className="w-full mb-2">
        <img
          src={imageSrc}
          alt={altText}
          className="w-full h-32 sm:h-40 object-cover"
        />
      </div>

      <h2 className="text-lg sm:text-3xl font-bold text-white mb-2">
        {title}
      </h2>

      {date && (
        <p className="text-xs sm:text-sm text-gray-400 mb-2">
          {formatDate(date)}
        </p>
      )}

      <p className="text-xs sm:text-sm text-gray-400">{description}</p>
    </div>
  );
}

export default AwardListItem;
