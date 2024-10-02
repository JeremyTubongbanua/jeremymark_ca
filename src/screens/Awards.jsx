import React, { useEffect, useState } from "react";
import AwardsGrid from "../components/AwardsGrid";
import yaml from "js-yaml";
import { awardIds } from "../constants"; // Assuming awardIds are predefined or fetched

const Awards = () => {
  const [allAwards, setAllAwards] = useState([]);

  useEffect(() => {
    const loadAwardData = async () => {
      const loadedAwards = await Promise.all(
        awardIds.map(async (awardId) => {
          const response = await fetch(`/assets/awards/${awardId}/metadata.yml`);
          const text = await response.text();
          const metadata = yaml.load(text);

          return {
            id: awardId,
            title: metadata.title,
            description: metadata.description,
            date: new Date(metadata.date),
            imageSrc: `/assets/awards/${awardId}/thumbnail.png`,
            altText: metadata.altText || `${metadata.title} image`,
          };
        })
      );

      const sortedAwards = loadedAwards.sort((a, b) => {
        const yearDifference = a.date.getFullYear() - b.date.getFullYear();
        if (yearDifference === 0) {
          return b.date - a.date;
        }
        return yearDifference;
      });

      setAllAwards(sortedAwards);
    };

    loadAwardData();
  }, []);

  return (
    <div className="container mx-auto p-4 sm:p-8">
      <h1 className="text-3xl sm:text-4xl font-bold text-white mb-6 sm:mb-8">
        Awards
      </h1>
      <AwardsGrid awards={allAwards} />
    </div>
  );
};

export default Awards;
