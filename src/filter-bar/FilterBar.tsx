import { useEffect, useState } from "react";

import styles from "./FilterBar.module.css";

type FilterBarItem = {
  text: string;
  isActivated: boolean;
};

export const FilterBar = ({
  filters,
  filterChanged,
}: {
  filters: string[];
  filterChanged: (activeFilters: string[]) => void;
}) => {
  const [activeFilters, setActiveFilters] = useState<FilterBarItem[]>(
    filters.map((filter) => ({ text: filter, isActivated: false }))
  );

  useEffect(
    () =>
      filterChanged(
        activeFilters
          .filter((filter) => filter.isActivated)
          .map((filter) => filter.text)
      ),
    [activeFilters, filterChanged]
  );

  return (
    <div className={styles.filterbar}>
      <button
        key="clear-all"
        onClick={() =>
          setActiveFilters(
            filters.map((filter) => ({ text: filter, isActivated: false }))
          )
        }
      >
        CLEAR ALL
      </button>
      {activeFilters.map((filter, index) => (
        <button
          key={index}
          onClick={() =>
            setActiveFilters(
              activeFilters.map((innerFilter) =>
                filter.text === innerFilter.text
                  ? { text: filter.text, isActivated: !filter.isActivated }
                  : innerFilter
              )
            )
          }
          className={filter.isActivated ? styles.buttonactive : ""}
        >
          {filter.text}
        </button>
      ))}
    </div>
  );
};
