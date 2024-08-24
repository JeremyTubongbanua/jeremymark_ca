import React, { useState, useEffect } from "react";
import ProjectsFilter from "../components/ProjectsFilter";
import ProjectsGrid from "../components/ProjectsGrid";
import yaml from "js-yaml";
import {
  LANGUAGE_OPTIONS,
  TECH_OPTIONS,
  FIELD_OPTIONS,
  ASSOCIATION_OPTIONS,
  PROGRESS_OPTIONS
} from "../constants";

const Projects = () => {
  const [filteredProjects, setFilteredProjects] = useState([]);
  const [allProjects, setAllProjects] = useState([]); // Store all projects

  useEffect(() => {
    const validateTag = (tag, category, projectId) => {
      const isValid = {
        language: LANGUAGE_OPTIONS.includes(tag),
        field: FIELD_OPTIONS.includes(tag),
        tech: TECH_OPTIONS.includes(tag),
        association: ASSOCIATION_OPTIONS.includes(tag),
        progress: PROGRESS_OPTIONS.includes(tag),
      }[category];

      if (!isValid) {
        console.error(
          `Project ID ${projectId}: Tag "${tag}" in category "${category}" is not valid.`
        );
      }
    };

    const loadProjectData = async () => {
      const projectIds = [
        1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26
      ]; // Add more project IDs here

      const loadedProjects = await Promise.all(
        projectIds.map(async (projectId) => {
          const response = await fetch(
            `/assets/projects/${projectId}/metadata.yml`
          );
          const text = await response.text();

          // Parse the YAML content
          const metadata = yaml.load(text);

          // Validate and create the tags array from the metadata
          const tags = [
            ...metadata.languages.map((lang) => {
              validateTag(lang, "language", projectId);
              return { name: lang, category: "language" };
            }),
            ...metadata.field.map((field) => {
              validateTag(field, "field", projectId);
              return { name: field, category: "field" };
            }),
            ...metadata.tech.map((tech) => {
              validateTag(tech, "tech", projectId);
              return { name: tech, category: "tech" };
            }),
            { name: metadata.association, category: "association" },
            { name: metadata.progress, category: "progress" },
          ];

          // Validate single tags
          validateTag(metadata.association, "association", projectId);
          validateTag(metadata.progress, "progress", projectId);

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

      // Sort projects by date ascending by default and then by newest within each year
      const sortedProjects = loadedProjects.sort((a, b) => {
        const yearDifference = a.date.getFullYear() - b.date.getFullYear();
        if (yearDifference === 0) {
          return b.date - a.date; // Sort within the same year by newest first
        }
        return yearDifference;
      });

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

    // Apply languages filter
    if (filters.languages.length > 0) {
      projects = projects.filter((project) =>
        filters.languages.every((lang) =>
          project.tags.some((tag) => tag.category === "language" && tag.name === lang)
        )
      );
    }

    // Apply field filter
    if (filters.field.length > 0) {
      projects = projects.filter((project) =>
        filters.field.every((field) =>
          project.tags.some((tag) => tag.category === "field" && tag.name === field)
        )
      );
    }

    // Apply tech filter
    if (filters.tech.length > 0) {
      projects = projects.filter((project) =>
        filters.tech.every((tech) =>
          project.tags.some((tag) => tag.category === "tech" && tag.name === tech)
        )
      );
    }

    // Apply progress filter
    if (filters.progress) {
      projects = projects.filter((project) =>
        project.tags.some((tag) => tag.category === "progress" && tag.name === filters.progress)
      );
    }

    // Apply association filter
    if (filters.association) {
      projects = projects.filter((project) =>
        project.tags.some((tag) => tag.category === "association" && tag.name === filters.association)
      );
    }

    // Apply date sorting
    if (filters.date === "ascending") {
      projects.sort((a, b) => {
        const yearDifference = a.date.getFullYear() - b.date.getFullYear();
        if (yearDifference === 0) {
          return b.date - a.date; // Sort within the same year by newest first
        }
        return yearDifference;
      });
    } else if (filters.date === "descending") {
      projects.sort((a, b) => {
        const yearDifference = b.date.getFullYear() - a.date.getFullYear();
        if (yearDifference === 0) {
          return a.date - b.date; // Sort within the same year by oldest first
        }
        return yearDifference;
      });
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
