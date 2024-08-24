import React from "react";
import ExperienceListItem from "./ExperienceListItem";

const ExperiencesGrid = ({ experiences }) => {
  const experiencesByYear = experiences.reduce((acc, experience) => {
    const year = new Date(experience.fromDate).getFullYear();
    if (!acc[year]) {
      acc[year] = [];
    }
    acc[year].push(experience);
    return acc;
  }, {});

  return (
    <div className="py-4">
      {Object.keys(experiencesByYear)
        .sort((a, b) => b - a)
        .map((year) => (
          <div key={year} className="mb-8">
            <h2 className="text-3xl font-bold text-white mb-4">{year}</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {experiencesByYear[year].map((experience) => (
                <ExperienceListItem
                  key={experience.id}
                  title={experience.title}
                  subtitle={experience.subtitle}
                  description={experience.description}
                  fromDate={experience.fromDate}
                  toDate={experience.toDate}
                  imageSrc={experience.imageSrc}
                  altText={experience.altText}
                  tags={experience.tags}
                  experienceId={experience.id}
                />
              ))}
            </div>
          </div>
        ))}
    </div>
  );
};

export default ExperiencesGrid;
