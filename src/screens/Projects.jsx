import React, { useState, useEffect } from "react";
import ProjectsFilter from "../components/ProjectsFilter";
import ProjectsGrid from "../components/ProjectsGrid";
import yaml from "js-yaml";
import { useSearchParams } from "react-router-dom";
import {
  LANGUAGE_OPTIONS,
  TECH_OPTIONS,
  FIELD_OPTIONS,
  ASSOCIATION_OPTIONS,
  PROGRESS_OPTIONS,
  projectIds
} from "../constants";

const Projects = () => {
  const [filteredProjects, setFilteredProjects] = useState([]);
  const [allProjects, setAllProjects] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    const filtersFromURL = {
      search: searchParams.get("search") || "",
      languages: searchParams.getAll("languages"),
      field: searchParams.getAll("field"),
      tech: searchParams.getAll("tech"),
      progress: searchParams.get("progress") || "",
      association: searchParams.get("association") || "",
    };

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
      const loadedProjects = await Promise.all(
        projectIds.map(async (projectId) => {
          const response = await fetch(
            `/assets/projects/${projectId}/metadata.yml`
          );
          const text = await response.text();

          const metadata = yaml.load(text);

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

          validateTag(metadata.association, "association", projectId);
          validateTag(metadata.progress, "progress", projectId);

          return {
            id: projectId,
            title: metadata.title,
            subtitle: metadata.subtitle,
            description: metadata.description,
            date: new Date(metadata.date),
            imageSrc: `/assets/projects/${projectId}/thumbnail.png`,
            tags,
          };
        })
      );

      const sortedProjects = loadedProjects.sort((a, b) => {
        const yearDifference = a.date.getFullYear() - b.date.getFullYear();
        if (yearDifference === 0) {
          return b.date - a.date;
        }
        return yearDifference;
      });

      setAllProjects(sortedProjects);
      applyFilters(filtersFromURL, sortedProjects);
    };

    loadProjectData();
  }, []);

  const applyFilters = (filters, projects) => {
    let filtered = [...projects];

    if (filters.search) {
      filtered = filtered.filter((project) =>
        project.title.toLowerCase().includes(filters.search.toLowerCase())
      );
    }

    if (filters.languages.length > 0) {
      filtered = filtered.filter((project) =>
        filters.languages.every((lang) =>
          project.tags.some((tag) => tag.category === "language" && tag.name === lang)
        )
      );
    }

    if (filters.field.length > 0) {
      filtered = filtered.filter((project) =>
        filters.field.every((field) =>
          project.tags.some((tag) => tag.category === "field" && tag.name === field)
        )
      );
    }

    if (filters.tech.length > 0) {
      filtered = filtered.filter((project) =>
        filters.tech.every((tech) =>
          project.tags.some((tag) => tag.category === "tech" && tag.name === tech)
        )
      );
    }

    if (filters.progress) {
      filtered = filtered.filter((project) =>
        project.tags.some((tag) => tag.category === "progress" && tag.name === filters.progress)
      );
    }

    if (filters.association) {
      filtered = filtered.filter((project) =>
        project.tags.some((tag) => tag.category === "association" && tag.name === filters.association)
      );
    }

    setFilteredProjects(filtered);
  };

  const handleFilterChange = (filters) => {
    const params = new URLSearchParams();

    if (filters.search) params.set("search", filters.search);
    filters.languages.forEach(lang => params.append("languages", lang));
    filters.field.forEach(field => params.append("field", field));
    filters.tech.forEach(tech => params.append("tech", tech));
    if (filters.progress) params.set("progress", filters.progress);
    if (filters.association) params.set("association", filters.association);

    setSearchParams(params);

    applyFilters(filters, allProjects);
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
