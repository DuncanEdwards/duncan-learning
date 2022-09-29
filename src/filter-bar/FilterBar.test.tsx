import { fireEvent, render, screen } from "@testing-library/react";

import { FilterBar } from "./FilterBar";

const allTestFilters: string[] = [
  "adventure",
  "epic fantasy",
  "fantasy",
  "young adult",
];

const doRenderFilterBar = (activeFilters: string[]) => {
  const filterChangedFn = jest.fn();
  render(<FilterBar filters={activeFilters} filterChanged={filterChangedFn} />);
  return { filterChangedFn };
};

const expectButtonsToBeCorrect = (
  expectedFilters: string[],
  activeFilters: string[] = []
) => {
  const buttons = screen.getAllByRole("button");
  expect(buttons).toHaveLength(expectedFilters.length + 1);

  let categoryIndex = 0;
  buttons.slice(1).forEach((button) => {
    expect(button.innerHTML).toBe(expectedFilters[categoryIndex++]);
    expect(button.className).toEqual(
      activeFilters.includes(button.innerHTML) ? "buttonactive" : ""
    );
  });
};

test("With an empty list of filters", () => {
  const { filterChangedFn } = doRenderFilterBar([]);

  expectButtonsToBeCorrect([]);
  expect(filterChangedFn).toBeCalledTimes(1);
  expect(filterChangedFn).toHaveBeenNthCalledWith(1, []);
});

test("With 2 filters passed to it", () => {
  const testFilters = allTestFilters.slice(0, 2);

  const { filterChangedFn } = doRenderFilterBar(testFilters);

  expectButtonsToBeCorrect(testFilters);
  expect(filterChangedFn).toBeCalledTimes(1);
  expect(filterChangedFn).toHaveBeenNthCalledWith(1, []);
});

test("With 4 filters passed to it", () => {
  const { filterChangedFn } = doRenderFilterBar(allTestFilters);

  expectButtonsToBeCorrect(allTestFilters);
  expect(filterChangedFn).toBeCalledTimes(1);
  expect(filterChangedFn).toHaveBeenNthCalledWith(1, []);
});

test("Click on one filter", () => {
  doRenderFilterBar(allTestFilters);

  fireEvent.click(screen.getByRole("button", { name: "fantasy" }));
  expectButtonsToBeCorrect(allTestFilters, ["fantasy"]);
});

test("Click on clear all button", () => {
  doRenderFilterBar(allTestFilters);

  fireEvent.click(screen.getByRole("button", { name: "fantasy" }));
  fireEvent.click(screen.getByRole("button", { name: "adventure" }));
  fireEvent.click(screen.getByRole("button", { name: /clear all/i }));
  expectButtonsToBeCorrect(allTestFilters);
});
