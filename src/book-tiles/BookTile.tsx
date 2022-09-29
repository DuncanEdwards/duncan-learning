import { Book } from "../books-api/booksApi";
import { BookGenres } from "./BookGenres";
import styles from "./BookTile.module.css";

export const BookTile = ({ title, imageUrl, genres, author }: Book) => (
  <div className={styles.tile}>
    <img src={imageUrl} alt={title} />
    <div className={styles.body}>
      <div>
        <h2>{title}</h2>
        <div>{author}</div>
      </div>
      <BookGenres genres={genres} />
    </div>
  </div>
);
