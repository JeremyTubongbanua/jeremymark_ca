import React, { useState } from "react";

const LANGUAGE_OPTIONS = [
  "C",
  "Dart",
  "Java",
  "JavaScript",
  "MySQL",
  "Python",
];

const FIELD_OPTIONS = [
  "AI/ML",
  "App Development",
  "DevOps",
  "Electrical Engineering",
  "IoT/Embedded",
  "Robotics",
  "Web Development",
];

const TECH_OPTIONS = [
  "CMake",
  "Docker",
  "Espressif (ESP-IDF)",
  "Flutter",
  "Fusion360",
  "KiCad",
  "Linux",
  "Node.js",
  "Spigot",
];

const PROGRESS_OPTIONS = [
  "In-Progress",
  "Finished"
];
const ASSOCIATION_OPTIONS = [
  "Hackathon",
  "Hobby",
  "High School",
  "Ontario Tech",
  "Atsign",
];

function ProjectsFilter({ onFilterChange, primaryColor = "bg-blue-500" }) {
  const [filters, setFilters] = useState({
    search: "",
    languages: [],
    field: [],
    tech: [],
    progress: "", // Initialize as a string to ensure only one can be selected
    association: [],
  });

  const [isVisible, setIsVisible] = useState(true);

  const toggleVisibility = () => {
    setIsVisible((prev) => !prev);
  };

  const toggleFilter = (name, value) => {
    setFilters((prev) => {
      let newFilters;
      if (name === "progress") {
        // Ensure only one progress filter is selected at a time
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

  return (
    <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
      <div className="mb-4 flex justify-between items-center">
        <h2 className="text-2xl text-white">Filter Projects</h2>
        <button
          onClick={toggleVisibility}
          className="text-white text-xl bg-gray-700 py-2 px-4 rounded"
        >
          {isVisible ? "Hide Filters" : "Show Filters"}
        </button>
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
              className="w-full p-4 rounded bg-gray-300 text-gray-800 text-2xl"
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
                    className={`w-full py-2 px-4 rounded ${
                      filters.languages.includes(lang)
                        ? `${primaryColor} text-white`
                        : "bg-gray-600 text-gray-300"
                    } text-lg`}
                  >
                    {lang}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex flex-col">
              <label className="text-white text-xl mb-2">Field</label>
              <div className="space-y-2">
                {FIELD_OPTIONS.map((field) => (
                  <button
                    key={field}
                    onClick={() => toggleFilter("field", field)}
                    className={`w-full py-2 px-4 rounded ${
                      filters.field.includes(field)
                        ? `${primaryColor} text-white`
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
                    className={`w-full py-2 px-4 rounded ${
                      filters.tech.includes(tech)
                        ? `${primaryColor} text-white`
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
                    className={`w-full py-2 px-4 rounded ${
                      filters.progress === progress
                        ? `${primaryColor} text-white`
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
                    className={`w-full py-2 px-4 rounded ${
                      filters.association.includes(association)
                        ? `${primaryColor} text-white`
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
