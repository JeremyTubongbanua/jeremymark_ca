import React, { useState, useEffect } from "react";
import { getTagColor } from "../utils/tagColors.js";
import { LANGUAGE_OPTIONS, TECH_OPTIONS, FIELD_OPTIONS, ASSOCIATION_OPTIONS, PROGRESS_OPTIONS } from "../constants";
import { useSearchParams } from "react-router-dom";

function ProjectsFilter({ onFilterChange }) {
  const initialFilters = {
    search: "",
    languages: [],
    field: [],
    tech: [],
    progress: "", // Initialize as a string to ensure only one can be selected
    association: "", // Single selection for association
  };

  const [filters, setFilters] = useState(initialFilters);
  const [isVisible, setIsVisible] = useState(true);
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    // Update the filters based on URL query parameters
    setFilters({
      search: searchParams.get("search") || "",
      languages: searchParams.get("languages")?.split(",") || [],
      field: searchParams.get("field")?.split(",") || [],
      tech: searchParams.get("tech")?.split(",") || [],
      progress: searchParams.get("progress") || "",
      association: searchParams.get("association") || "",
    });

    // Set the visibility state based on the URL parameter
    const visibilityParam = searchParams.get("filtersVisible");
    setIsVisible(visibilityParam !== "false");
  }, [searchParams]);

  const toggleVisibility = () => {
    const newVisibility = !isVisible;
    setIsVisible(newVisibility);

    // Update the URL with the new visibility state
    searchParams.set("filtersVisible", newVisibility);
    setSearchParams(searchParams);
  };

  const toggleFilter = (name, value) => {
    setFilters((prev) => {
      let newFilters;
      if (name === "progress" || name === "association") {
        // Ensure only one progress or association filter is selected at a time
        newFilters = { ...prev, [name]: prev[name] === value ? "" : value };
      } else {
        const isActive = prev[name].includes(value);
        const newValues = isActive
          ? prev[name].filter((item) => item !== value)
          : [...prev[name], value];

        newFilters = { ...prev, [name]: newValues };
      }

      onFilterChange(newFilters);
      return newFilters;
    });
  };

  const handleSingleSelectChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => {
      const newFilters = { ...prev, [name]: value };
      onFilterChange(newFilters);
      return newFilters;
    });
  };

  const handleClearFilters = () => {
    setFilters(initialFilters);
    onFilterChange(initialFilters);
  };

  return (
    <div className="bg-gray-800 p-6 shadow-lg">
      <div className="mb-4 flex justify-between items-center">
        <h2 className="text-2xl text-white">Filter Projects</h2>
        <div className="flex space-x-2">
          <button
            onClick={handleClearFilters}
            className="text-white text-xl bg-red-500 py-2 px-4"
          >
            Clear
          </button>
          <button
            onClick={toggleVisibility}
            className="text-white text-xl bg-gray-700 py-2 px-4"
          >
            {isVisible ? "Hide" : "Show"}
          </button>
        </div>
      </div>

      {isVisible && (
        <div>
          <div className="mb-6">
            <input
              type="text"
              id="search"
              name="search"
              value={filters.search}
              onChange={handleSingleSelectChange}
              placeholder="SEARCH"
              className="w-full p-4 bg-gray-300 text-gray-800 text-2xl"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-6">
            {/* Languages Filter */}
            <div className="flex flex-col">
              <label className="text-white text-xl mb-2">Languages</label>
              <div className="space-y-2">
                {LANGUAGE_OPTIONS.map((lang) => (
                  <button
                    key={lang}
                    onClick={() => toggleFilter("languages", lang)}
                    className={`w-full py-2 px-4 ${
                      filters.languages.includes(lang)
                        ? `${getTagColor("language")} text-white`
                        : "bg-gray-600 text-gray-300"
                    } text-lg`}
                  >
                    {lang}
                  </button>
                ))}
              </div>
            </div>

            {/* Field Filter */}
            <div className="flex flex-col">
              <label className="text-white text-xl mb-2">Field</label>
              <div className="space-y-2">
                {FIELD_OPTIONS.map((field) => (
                  <button
                    key={field}
                    onClick={() => toggleFilter("field", field)}
                    className={`w-full py-2 px-4 ${
                      filters.field.includes(field)
                        ? `${getTagColor("field")} text-white`
                        : "bg-gray-600 text-gray-300"
                    } text-lg`}
                  >
                    {field}
                  </button>
                ))}
              </div>
            </div>

            {/* Tech Filter */}
            <div className="flex flex-col">
              <label className="text-white text-xl mb-2">Tech</label>
              <div className="space-y-2">
                {TECH_OPTIONS.map((tech) => (
                  <button
                    key={tech}
                    onClick={() => toggleFilter("tech", tech)}
                    className={`w-full py-2 px-4 ${
                      filters.tech.includes(tech)
                        ? `${getTagColor("tech")} text-white`
                        : "bg-gray-600 text-gray-300"
                    } text-lg`}
                  >
                    {tech}
                  </button>
                ))}
              </div>
            </div>

            {/* Progress Filter */}
            <div className="flex flex-col">
              <label className="text-white text-xl mb-2">Progress</label>
              <div className="space-y-2">
                {PROGRESS_OPTIONS.map((progress) => (
                  <button
                    key={progress}
                    onClick={() => toggleFilter("progress", progress)}
                    className={`w-full py-2 px-4 ${
                      filters.progress === progress
                        ? `${getTagColor("progress")} text-white`
                        : "bg-gray-600 text-gray-300"
                    } text-lg`}
                  >
                    {progress}
                  </button>
                ))}
              </div>
            </div>

            {/* Association Filter */}
            <div className="flex flex-col">
              <label className="text-white text-xl mb-2">Association</label>
              <div className="space-y-2">
                {ASSOCIATION_OPTIONS.map((association) => (
                  <button
                    key={association}
                    onClick={() => toggleFilter("association", association)}
                    className={`w-full py-2 px-4 ${
                      filters.association === association
                        ? `${getTagColor("association")} text-white`
                        : "bg-gray-600 text-gray-300"
                    } text-lg`}
                  >
                    {association}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ProjectsFilter;
