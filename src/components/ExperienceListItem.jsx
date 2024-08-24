import React from "react";
import { getTagColor } from "../utils/tagColors";
import { format, differenceInMonths, isValid } from "date-fns";

function ExperienceListItem({
  title,
  subtitle,
  description,
  fromdate,
  todate,
  imageSrc,
  altText,
  tags,
}) {
  const formatDateRange = (fromdate, todate) => {
    let startDate = fromdate ? new Date(fromdate) : null;
    const endDate = todate && todate !== "" ? new Date(todate) : new Date();

    // Handle the case where `fromdate` is blank and `todate` exists (1-day event)
    if (!fromdate && todate) {
      startDate = new Date(todate); // Treat it as a one-day event
    }

    // Check if the dates are valid
    if (startDate && !isValid(startDate)) {
      console.error("Invalid fromdate:", fromdate, "Parsed Date:", startDate);
      return "Invalid Start Date";
    }
    if (!isValid(endDate)) {
      console.error("Invalid todate:", todate, "Parsed Date:", endDate);
      return "Invalid End Date";
    }

    // Format the date range
    const from = startDate ? format(startDate, "MMM yyyy") : format(endDate, "MMM yyyy");
    const to = todate && todate !== "" ? format(endDate, "MMM yyyy") : "Present";

    // Handle one-day events
    if (!fromdate && todate) {
      return `${from} (1 day)`;
    }

    // Handle multi-day events in the same month and year
    if (from === to) {
      return `${from}`;
    }

    // General case
    const totalMonths = differenceInMonths(endDate, startDate);
    const years = Math.floor(totalMonths / 12);
    const months = totalMonths % 12;
    const duration = `${years > 0 ? `${years} yr ` : ""}${months > 0 ? `${months} mo` : ""}`;
    return `${from} - ${to} (${duration})`;
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

      <div className="flex justify-between items-center w-full mb-2">
        <h2 className="text-xl font-bold text-white">{title}</h2>
        <div className="text-sm text-gray-400 ml-4">{formatDateRange(fromdate, todate)}</div>
      </div>

      <div className="text-sm text-gray-400 mb-2">{description}</div>

      <div className="flex flex-wrap gap-1">
        {tags.map((tag, index) => (
          <span
            key={index}
            className={`text-xs px-2 py-1 rounded ${getTagColor(tag.category)}`}
          >
            {tag.name}
          </span>
        ))}
      </div>
    </div>
  );
}

export default ExperienceListItem;