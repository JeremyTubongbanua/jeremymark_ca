import React from "react";
import AwardListItem from "./AwardListItem";

const AwardsGrid = ({ awards }) => {
  const awardsByYear = awards.reduce((acc, award) => {
    const year = new Date(award.date).getFullYear();
    if (!acc[year]) {
      acc[year] = [];
    }
    acc[year].push(award);
    return acc;
  }, {});

  return (
    <div className="py-4">
      {Object.keys(awardsByYear)
        .sort((a, b) => b - a) // Sort by year in descending order
        .map((year) => (
          <div key={year} className="mb-8">
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">
              {year}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
              {awardsByYear[year].map((award) => (
                <AwardListItem
                  key={award.id}
                  title={award.title}
                  description={award.description}
                  date={award.date}
                  imageSrc={award.imageSrc}
                  altText={award.altText}
                />
              ))}
            </div>
          </div>
        ))}
    </div>
  );
};

export default AwardsGrid;
