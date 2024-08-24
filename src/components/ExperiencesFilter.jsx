import React, { useState, useEffect } from "react";
import { getTagColor } from "../utils/tagColors.js";
import { ROLE_OPTIONS, INDUSTRY_OPTIONS } from "../constants";
import { useSearchParams } from "react-router-dom";

function ExperiencesFilter({ onFilterChange }) {
  const initialFilters = {
    search: "",
    roles: [],
    industries: [],
  };

  const [filters, setFilters] = useState(initialFilters);
  const [isVisible, setIsVisible] = useState(true);
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    setFilters({
      search: searchParams.get("search") || "",
      roles: searchParams.get("roles")?.split(",") || [],
      industries: searchParams.get("industries")?.split(",") || [],
    });

    const visibilityParam = searchParams.get("filtersVisible");
    setIsVisible(visibilityParam !== "false");
  }, [searchParams]);

  const toggleVisibility = () => {
    const newVisibility = !isVisible;
    setIsVisible(newVisibility);

    searchParams.set("filtersVisible", newVisibility);
    setSearchParams(searchParams);
  };

  const toggleFilter = (name, value) => {
    setFilters((prev) => {
      let newFilters;
      if (["roles", "industries"].includes(name)) {
        const isActive = prev[name].includes(value);
        const newValues = isActive
          ? prev[name].filter((item) => item !== value)
          : [...prev[name], value];

        newFilters = { ...prev, [name]: newValues };
      } else {
        newFilters = { ...prev, [name]: prev[name] === value ? "" : value };
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
        <h2 className="text-2xl text-white">Filter Experiences</h2>
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
            <div className="flex flex-col">
              <label className="text-white text-xl mb-2">Roles</label>
              <div className="space-y-2">
                {ROLE_OPTIONS.map((role) => (
                  <button
                    key={role}
                    onClick={() => toggleFilter("roles", role)}
                    className={`w-full py-2 px-4 ${
                      filters.roles.includes(role)
                        ? `${getTagColor("roles")} text-white`
                        : "bg-gray-600 text-gray-300"
                    } text-lg`}
                  >
                    {role}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex flex-col">
              <label className="text-white text-xl mb-2">Industries</label>
              <div className="space-y-2">
                {INDUSTRY_OPTIONS.map((industry) => (
                  <button
                    key={industry}
                    onClick={() => toggleFilter("industries", industry)}
                    className={`w-full py-2 px-4 ${
                      filters.industries.includes(industry)
                        ? `${getTagColor("industries")} text-white`
                        : "bg-gray-600 text-gray-300"
                    } text-lg`}
                  >
                    {industry}
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

export default ExperiencesFilter;
