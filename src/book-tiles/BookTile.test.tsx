import { fireEvent, render, screen } from "@testing-library/react";

import { BookTile } from "./BookTile";

test("Tile renders correctly", () => {
  const view = render(
    <BookTile
      id={1}
      author="Joe Abercrombie"
      imageUrl="http://myimage"
      title="Last Argument of Kings"
      genres={["fantasy", "epic fantasy", "dark fantasy"]}
    />
  );
  expect(view).toMatchSnapshot();
});
