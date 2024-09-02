import React from "react";
import ExperienceListItem from "./ExperienceListItem";

const ExperiencesGrid = ({ experiences }) => {
  const experiencesByYear = experiences.reduce((acc, experience) => {
    const endDate = experience.todate ? new Date(experience.todate) : new Date();
    const year = endDate.getFullYear();

    if (!acc[year]) {
      acc[year] = [];
    }
    acc[year].push(experience);
    return acc;
  }, {});

  const presentYear = "Present";

  // Collect ongoing experiences (without `todate`) under "Present"
  const ongoingExperiences = experiences.filter(experience => !experience.todate);
  if (ongoingExperiences.length > 0) {
    experiencesByYear[presentYear] = ongoingExperiences;
  }

  return (
    <div className="py-4">
      {Object.keys(experiencesByYear)
        .sort((a, b) => (a === presentYear ? -1 : b === presentYear ? 1 : b - a))
        .map((year) => (
          <div key={year} className="mb-8">
            <h2 className="text-3xl font-bold text-white mb-4">{year}</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {experiencesByYear[year]
                .sort((a, b) => {
                  const dateA = new Date(b.todate || b.fromdate);
                  const dateB = new Date(a.todate || a.fromdate);
                  return dateA - dateB; // Sort by most recent date first
                })
                .map((experience) => (
                  <ExperienceListItem
                    key={experience.id}
                    title={experience.title}
                    subtitle={experience.subtitle}
                    description={experience.description}
                    fromdate={experience.fromdate}
                    todate={experience.todate}
                    imageSrc={experience.imageSrc}
                    altText={experience.altText}
                    tags={experience.tags}
                  />
                ))}
            </div>
          </div>
        ))}
    </div>
  );
};

export default ExperiencesGrid;