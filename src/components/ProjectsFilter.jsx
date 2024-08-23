import React, { useState } from "react";

// Define filter options as constants
const LANGUAGE_OPTIONS = ["C", "C++", "Dart"];
const TYPE_OPTIONS = ["Embedded", "UI"];
const PROGRESS_OPTIONS = ["In-Progress", "Finished"];
const ASSOCIATION_OPTIONS = ["Ontario Tech", "Atsign", "Hobby"]; // Updated "Side-project" to "Hobby"

function ProjectsFilter({ onFilterChange, primaryColor = "bg-blue-500" }) {
  const [filters, setFilters] = useState({
    search: "",
    languages: [],
    type: [],
    progress: "", // Initialize as a string to ensure only one can be selected
    association: [],
    date: "ascending",
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
    <div className="bg-gray-800 p-6 -lg shadow-lg">
      <div className="mb-4 flex justify-between items-center">
        <h2 className="text-2xl text-white">Filter Projects</h2>
        <button
          onClick={toggleVisibility}
          className="text-white text-xl bg-gray-700 py-2 px-4 "
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
              className="w-full p-4  bg-gray-300 text-gray-800 text-2xl"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-6">
            {/* Date Filter */}
            <div className="flex flex-col">
              <label className="text-white text-xl mb-2">Date</label>
              <div className="space-y-2">
                <button
                  name="date"
                  value="ascending"
                  onClick={handleSingleSelectChange}
                  className={`w-full py-2 px-4  ${
                    filters.date === "ascending"
                      ? `${primaryColor} text-white`
                      : "bg-gray-600 text-gray-300"
                  } text-lg`}
                >
                  Sort by Ascending
                </button>
                <button
                  name="date"
                  value="descending"
                  onClick={handleSingleSelectChange}
                  className={`w-full py-2 px-4  ${
                    filters.date === "descending"
                      ? `${primaryColor} text-white`
                      : "bg-gray-600 text-gray-300"
                  } text-lg`}
                >
                  Sort by Descending
                </button>
              </div>
            </div>

            {/* Languages Filter */}
            <div className="flex flex-col">
              <label className="text-white text-xl mb-2">Languages</label>
              <div className="space-y-2">
                {LANGUAGE_OPTIONS.map((lang) => (
                  <button
                    key={lang}
                    onClick={() => toggleFilter("languages", lang)}
                    className={`w-full py-2 px-4  ${
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

            {/* Type Filter */}
            <div className="flex flex-col">
              <label className="text-white text-xl mb-2">Type</label>
              <div className="space-y-2">
                {TYPE_OPTIONS.map((type) => (
                  <button
                    key={type}
                    onClick={() => toggleFilter("type", type)}
                    className={`w-full py-2 px-4  ${
                      filters.type.includes(type)
                        ? `${primaryColor} text-white`
                        : "bg-gray-600 text-gray-300"
                    } text-lg`}
                  >
                    {type}
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
                    className={`w-full py-2 px-4  ${
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

            <div className="flex flex-col">
              <label className="text-white text-xl mb-2">Association</label>
              <div className="space-y-2">
                {ASSOCIATION_OPTIONS.map((association) => (
                  <button
                    key={association}
                    onClick={() => toggleFilter("association", association)}
                    className={`w-full py-2 px-4 ${
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
