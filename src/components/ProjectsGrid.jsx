import React from "react";
import { Link } from "react-router-dom";
import ProjectListItem from "./ProjectListItem";

const ProjectsGrid = ({ projects }) => {
  const projectsByYear = projects.reduce((acc, project) => {
    const year = new Date(project.date).getFullYear();
    if (!acc[year]) {
      acc[year] = [];
    }
    acc[year].push(project);
    return acc;
  }, {});

  return (
    <div className="py-4">
      {Object.keys(projectsByYear)
        .sort((a, b) => b - a)
        .map((year) => (
          <div key={year} className="mb-8">
            <h2 className="text-3xl font-bold text-white mb-4">{year}</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {projectsByYear[year].map((project) => (
                <Link to={`/projects/${project.id}`} target="_blank" rel="noopener noreferrer">
                  <ProjectListItem
                    key={project.id}
                    title={project.title}
                    subtitle={project.subtitle}
                    description={project.description}
                    date={project.date}
                    imageSrc={project.imageSrc}
                    altText={project.altText}
                    tags={project.tags}
                  />
                </Link>
              ))}
            </div>
          </div>
        ))}
    </div>
  );
};

export default ProjectsGrid;
