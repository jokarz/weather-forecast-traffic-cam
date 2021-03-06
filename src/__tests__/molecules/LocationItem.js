import React from "react";
import { render } from "@testing-library/react";
import LocationItem from "../../components/molecules/locationitem";

test("renders default", async () => {
  const { container } = render(<LocationItem />);
  const ele = container.querySelector(".list-group-item");
  expect(ele).toBeTruthy();
});

test("renders with name", async () => {
  const { getByText } = render(<LocationItem name="Testing" />);
  const ele = getByText(/Testing/i);
  expect(ele).toBeTruthy();
});
