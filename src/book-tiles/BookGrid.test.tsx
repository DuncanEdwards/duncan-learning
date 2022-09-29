import * as booksApiDependency from "../books-api/booksApi";

import { BookGrid } from "./BookGrid";
import { render } from "@testing-library/react";

jest.mock("../books-api/booksApi");
const apiGetBooksMock = booksApiDependency.getBooks as jest.Mock;
apiGetBooksMock.mockReturnValue({ books: [], totalBooks: 0 });

test("test Book Grid with no items", () => {
  apiGetBooksMock.mockClear();
  render(<BookGrid activeFilters={[]} />);
});
