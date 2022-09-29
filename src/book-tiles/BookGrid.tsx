import { useEffect, useState } from "react";

import { Book } from "../books-api/booksApi";
import { BookTile } from "./BookTile";
import { getBooks as apiGetBooks } from "../books-api/booksApi";
import styles from "./BookGrid.module.css";

type BooksGridState = {
  books: Book[];
  currentPage: number;
  totalBooks: number;
};

const initialValue = {
  books: [],
  currentPage: 1,
  totalBooks: 0,
};

export const BookGrid = ({ activeFilters }: { activeFilters: string[] }) => {
  const [booksGridState, setBooksGridState] =
    useState<BooksGridState>(initialValue);

  const { books, currentPage, totalBooks } = booksGridState;

  useEffect(() => {
    async function getBooks() {
      const response = await apiGetBooks(currentPage, activeFilters);

      console.log("1", activeFilters, response);

      setBooksGridState({
        ...response,
        currentPage: 1,
      });
    }
    getBooks();
  }, [currentPage, activeFilters]);

  return (
    <div>
      <div className={styles.bookgrid}>
        {books.map((book) => (
          <BookTile {...book} key={book.id} />
        ))}
      </div>
      <div className={styles.bookmore}>
        Showing {books.length} of {totalBooks} books
      </div>
    </div>
  );
};
