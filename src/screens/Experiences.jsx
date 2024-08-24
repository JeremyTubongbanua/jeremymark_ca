import React, { useState, useEffect } from "react";
import ExperiencesFilter from "../components/ExperiencesFilter";
import ExperiencesGrid from "../components/ExperiencesGrid";
import yaml from "js-yaml";
import { useSearchParams } from "react-router-dom";
import {
  ROLE_OPTIONS,
  INDUSTRY_OPTIONS,
  experienceIds,
} from "../constants";

const Experiences = () => {
  const [filteredExperiences, setFilteredExperiences] = useState([]);
  const [allExperiences, setAllExperiences] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const filtersFromURL = {
      search: searchParams.get("search") || "",
      roles: searchParams.get("roles")?.split(",") || [],
      industries: searchParams.get("industries")?.split(",") || [],
    };

    const validateTag = (tag, category, experienceId) => {
      const isValid = {
        role: ROLE_OPTIONS.includes(tag),
        industry: INDUSTRY_OPTIONS.includes(tag),
      }[category];

      if (!isValid) {
        console.error(
          `Experience ID ${experienceId}: Tag "${tag}" in category "${category}" is not valid.`
        );
      }
    };

    const loadExperienceData = async () => {
      const loadedExperiences = await Promise.all(
        experienceIds.map(async (experienceId) => {
          const response = await fetch(
            `/assets/experiences/${experienceId}/metadata.yml`
          );
          const text = await response.text();

          const metadata = yaml.load(text);

          const tags = [
            ...metadata.roles.map((role) => {
              validateTag(role, "role", experienceId);
              return { name: role, category: "role" };
            }),
            ...metadata.industries.map((industry) => {
              validateTag(industry, "industry", experienceId);
              return { name: industry, category: "industry" };
            }),
          ];

          return {
            id: experienceId,
            title: metadata.title,
            subtitle: metadata.subtitle,
            description: metadata.description,
            fromdate: metadata.fromdate,  // Use consistent prop name
            todate: metadata.todate,      // Use consistent prop name
            imageSrc: `/assets/experiences/${experienceId}/thumbnail.png`,
            tags,
          };
        })
      );

      const sortedExperiences = loadedExperiences.sort((a, b) => {
        const yearDifference = new Date(a.fromdate).getFullYear() - new Date(b.fromdate).getFullYear();
        if (yearDifference === 0) {
          return new Date(b.fromdate) - new Date(a.fromdate);
        }
        return yearDifference;
      });

      setAllExperiences(sortedExperiences);
      applyFilters(filtersFromURL, sortedExperiences);
    };

    loadExperienceData();
  }, []);

  const applyFilters = (filters, experiences) => {
    let filtered = [...experiences];

    if (filters.search) {
      filtered = filtered.filter((experience) =>
        experience.title.toLowerCase().includes(filters.search.toLowerCase())
      );
    }

    if (filters.roles.length > 0) {
      filtered = filtered.filter((experience) =>
        filters.roles.every((role) =>
          experience.tags.some((tag) => tag.category === "role" && tag.name === role)
        )
      );
    }

    if (filters.industries.length > 0) {
      filtered = filtered.filter((experience) =>
        filters.industries.every((industry) =>
          experience.tags.some((tag) => tag.category === "industry" && tag.name === industry)
        )
      );
    }

    setFilteredExperiences(filtered);
  };

  const handleFilterChange = (filters) => {
    const params = new URLSearchParams();

    if (filters.search) params.set("search", filters.search);
    filters.roles.forEach(role => params.append("roles", role));
    filters.industries.forEach(industry => params.append("industries", industry));
    
    params.set("filtersVisible", isVisible.toString());

    setSearchParams(params);

    applyFilters(filters, allExperiences);
  };

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-4xl font-bold text-white mb-8">Experiences</h1>
      <ExperiencesFilter
        primaryColor="bg-blue-500"
        onFilterChange={handleFilterChange}
      />
      <ExperiencesGrid experiences={filteredExperiences} />
    </div>
  );
};

export default Experiences;
