import React from "react";
import styles from "./BookGenre.module.css";

export const BookGenres = ({ genres }: { genres: string[] }) => (
  <div>
    {genres.map((genre, index) => (
      <span className={styles.genre} key={index}>
        {genre}
      </span>
    ))}
  </div>
);
