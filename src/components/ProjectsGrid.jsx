import React from "react";
import { Link } from "react-router-dom";
import ProjectListItem from "./ProjectListItem";

const ProjectsGrid = ({ projects }) => {
  // Filter in-progress projects
  const inProgressProjects = projects.filter((project) =>
    project.tags.some((tag) => tag.category === "progress" && tag.name === "In-Progress")
  );

  // Filter out in-progress projects from the remaining projects
  const completedProjects = projects.filter(
    (project) =>
      !project.tags.some((tag) => tag.category === "progress" && tag.name === "In-Progress")
  );

  // Group completed projects by year
  const projectsByYear = completedProjects.reduce((acc, project) => {
    const year = new Date(project.date).getFullYear();
    if (!acc[year]) {
      acc[year] = [];
    }
    acc[year].push(project);
    return acc;
  }, {});

  return (
    <div className="py-4">
      {/* In-Progress Projects Section */}
      {inProgressProjects.length > 0 && (
        <div className="mb-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
            {inProgressProjects.map((project) => (
              <Link
                key={project.id}
                to={`/projects/${project.id}`}
                rel="noopener noreferrer"
              >
                <ProjectListItem
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
      )}

      {/* Completed Projects Section sorted by Year */}
      {Object.keys(projectsByYear)
        .sort((a, b) => b - a)
        .map((year) => (
          <div key={year} className="mb-8">
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">{year}</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
              {projectsByYear[year].map((project) => (
                <Link
                  key={project.id}
                  to={`/projects/${project.id}`}
                  rel="noopener noreferrer"
                >
                  <ProjectListItem
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
