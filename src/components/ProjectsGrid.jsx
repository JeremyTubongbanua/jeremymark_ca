import React from "react";
import ProjectListItem from "./ProjectListItem"; // Assuming this path is correct

const ProjectsGrid = ({ projects }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-4">
      {projects.map((project) => (
        <ProjectListItem
          key={project.id}
          title={project.title}
          subtitle={project.subtitle}
          date={project.date}
          imageSrc={project.imageSrc}
          altText={project.altText}
        />
      ))}
    </div>
  );
};

export default ProjectsGrid;
