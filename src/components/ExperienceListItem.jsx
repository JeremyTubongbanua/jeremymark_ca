import React from "react";
import { getTagColor } from "../utils/tagColors";
import { format, differenceInDays, isValid, parseISO, differenceInYears, differenceInMonths } from "date-fns";

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
    let startDate = fromdate ? parseISO(fromdate) : null;
    const endDate = todate && todate !== "" ? parseISO(todate) : new Date();

    // Handle the case where `fromdate` is blank and `todate` exists (1-day event)
    if (!fromdate && todate) {
      startDate = parseISO(todate); // Treat it as a one-day event
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
    const from = startDate ? format(startDate, "MMM d, yyyy") : format(endDate, "MMM d, yyyy");
    const to = todate && todate !== "" ? format(endDate, "MMM d, yyyy") : "Present";

    // Handle one-day events
    if (differenceInDays(endDate, startDate) === 0) {
      return `${from} (1 day)`;
    }

    // Calculate the difference in years and months
    const totalYears = differenceInYears(endDate, startDate);
    const totalMonths = differenceInMonths(endDate, startDate) % 12;

    // Format the duration
    const duration = `${totalYears > 0 ? `${totalYears} yr${totalYears > 1 ? 's' : ''}` : ''}${
      totalYears > 0 && totalMonths > 0 ? ', ' : ''
    }${totalMonths > 0 ? `${totalMonths} mo` : ''}`;

    return `${from} - ${to} (${duration})`;
  };

  return (
    <div className="bg-black p-4 shadow-lg flex flex-col items-start">
      <div className="w-full mb-2">
        <img
          src={imageSrc}
          alt={altText}
          className="w-full h-32 sm:h-40 object-cover"
        />
      </div>

      <div className="flex justify-between items-center w-full mb-2">
        <h2 className="text-lg sm:text-xl font-bold text-white">{title}</h2>
        <div className="text-sm sm:text-base text-gray-400 ml-4">{formatDateRange(fromdate, todate)}</div>
      </div>

      <div className="text-xs sm:text-sm text-gray-400 mb-2">{description}</div>

      <div className="flex flex-wrap gap-1">
        {tags.map((tag, index) => (
          <span
            key={index}
            className={`text-xs sm:text-xs px-2 py-1 rounded ${getTagColor(tag.category)}`}
          >
            {tag.name}
          </span>
        ))}
      </div>
    </div>
  );
}

export default ExperienceListItem;