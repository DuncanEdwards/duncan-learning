import booksJson from "../data/books.json";

const BOOKS_PAGE_SIZE = 9;

export type Book = {
  id: number;
  title: string;
  imageUrl: string;
  genres: string[];
  author: string;
};

export type BooksResponse = {
  books: Book[];
  totalBooks: number;
};

export const getBooks = async (
  page: number,
  genres: string[]
): Promise<BooksResponse> => {
  const filteredJson =
    genres.length > 0
      ? booksJson.filter((book) => doArraysIntersect(genres, book.genres))
      : booksJson;

  const books = filteredJson.slice(
    (page - 1) * BOOKS_PAGE_SIZE,
    BOOKS_PAGE_SIZE
  );
  return new Promise<BooksResponse>((resolve) =>
    resolve({ books: books, totalBooks: filteredJson.length })
  );
};

const doArraysIntersect = (filterGenres: string[], bookGenres: string[]) =>
  bookGenres.filter((genre) => filterGenres.includes(genre)).length > 0;
