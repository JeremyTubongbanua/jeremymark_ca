import React, { useState, useEffect } from "react";
import ProjectsFilter from "../components/ProjectsFilter";
import ProjectsGrid from "../components/ProjectsGrid";
import yaml from "js-yaml";

const Projects = () => {
  const [filteredProjects, setFilteredProjects] = useState([]);
  const [allProjects, setAllProjects] = useState([]); // Store all projects

  useEffect(() => {
    const loadProjectData = async () => {
      const projectIds = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21]; // Add more project IDs here

      const loadedProjects = await Promise.all(
        projectIds.map(async (projectId) => {
          const response = await fetch(
            `/assets/projects/${projectId}/metadata.yml`
          );
          const text = await response.text();

          // Parse the YAML content
          const metadata = yaml.load(text);

          // Create the tags array from the metadata
          const tags = [
            ...metadata.languages.map((lang) => ({ name: lang, category: "language" })),
            ...metadata.field.map((field) => ({ name: field, category: "field" })),
            ...metadata.tech.map((tech) => ({ name: tech, category: "tech" })),
            { name: metadata.association, category: "association" },
            { name: metadata.progress, category: "progress" },
          ];

          // Create the project object using the metadata
          return {
            id: projectId,
            title: metadata.title,
            subtitle: metadata.subtitle,
            description: metadata.description,
            date: new Date(metadata.date), // Convert to Date object for sorting
            imageSrc: `/assets/projects/${projectId}/thumbnail.png`,
            tags, // Add the tags array to the project object
          };
        })
      );

      // Sort projects by date ascending by default
      const sortedProjects = loadedProjects.sort((a, b) => a.date - b.date);

      setAllProjects(sortedProjects);
      setFilteredProjects(sortedProjects); // Display all projects by default
    };

    loadProjectData();
  }, []);

  const handleFilterChange = (filters) => {
    let projects = [...allProjects];

    // Apply search filter
    if (filters.search) {
      projects = projects.filter((project) =>
        project.title.toLowerCase().includes(filters.search.toLowerCase())
      );
    }

    // Apply additional filters here

    // Apply date sorting
    if (filters.date === "ascending") {
      projects.sort((a, b) => a.date - b.date);
    } else if (filters.date === "descending") {
      projects.sort((a, b) => b.date - a.date);
    }

    setFilteredProjects(projects);
  };

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-4xl font-bold text-white mb-8">Projects</h1>
      <ProjectsFilter
        primaryColor="bg-green-500"
        onFilterChange={handleFilterChange}
      />
      <ProjectsGrid projects={filteredProjects} />
    </div>
  );
};

export default Projects;
