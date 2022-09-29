import { BOOKS_PAGE_SIZE, Book } from "../books-api/booksApi";
import { useEffect, useState } from "react";

import { BookTile } from "./BookTile";
import { getBooks as apiGetBooks } from "../books-api/booksApi";
import styles from "./BookGrid.module.css";

type BooksGridState = {
  books: Book[];
  totalBooks: number;
};

type PageAndFiltersState = {
  currentPage: number;
  activeFilters: string[];
};

const initialValue = {
  books: [],
  totalBooks: 0,
};

export const BookGrid = ({ activeFilters }: { activeFilters: string[] }) => {
  const [booksGridState, setBooksGridState] =
    useState<BooksGridState>(initialValue);
  const [pageAndFiltersState, setPageAndFiltersState] =
    useState<PageAndFiltersState>({ currentPage: 1, activeFilters: [] });

  const { books, totalBooks } = booksGridState;

  useEffect(() => {
    async function getBooksForFilterChange() {
      const { currentPage, activeFilters } = pageAndFiltersState;
      const response = await apiGetBooks(currentPage, activeFilters);
      if (currentPage === 1) {
        setBooksGridState({ ...response });
      } else {
        setBooksGridState((state) => ({
          ...state,
          books: state.books.concat(response.books),
        }));
      }
    }
    getBooksForFilterChange();
  }, [pageAndFiltersState]);

  useEffect(
    () => setPageAndFiltersState({ currentPage: 1, activeFilters }),
    [activeFilters]
  );

  return (
    <div>
      <div className={styles.bookgrid}>
        {books.map((book) => (
          <BookTile {...book} key={book.id} />
        ))}
      </div>
      <div className={styles.bookmore}>
        <div>
          Showing {books.length} of {totalBooks} books
        </div>
        {books.length !== totalBooks && (
          <button
            className={styles.loadmore}
            onClick={() =>
              setPageAndFiltersState((state) => ({
                ...state,
                currentPage: state.currentPage + 1,
              }))
            }
          >
            Load books {Math.min(books.length + 1, totalBooks)}-
            {Math.min(books.length + BOOKS_PAGE_SIZE, totalBooks)}
          </button>
        )}
      </div>
    </div>
  );
};
