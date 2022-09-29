import { BookGrid } from "../book-tiles";
import { FilterBar } from "../filter-bar/FilterBar";
import genresJson from "../data/genres.json";
import styles from "./BookPage.module.css";
import { useState } from "react";

export const BookPage = () => {
  const [activeFilters, setActiveFilters] = useState<string[]>([]);

  const genres = genresJson.sort();
  return (
    <div className={styles.container}>
      <FilterBar filters={genres} filterChanged={setActiveFilters} />
      <BookGrid activeFilters={activeFilters} />
    </div>
  );
};
