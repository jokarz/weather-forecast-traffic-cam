import React from "react";
import { render } from "@testing-library/react";
import Datepicker from "../../components/molecules/datepicker";

test("renders default", async () => {
  const { findByText } = render(<Datepicker />);
  const ele = findByText(/Select date/i);
  expect(ele).toBeTruthy();
});

test("renders date", () => {
  const { getByText } = render(<Datepicker date={new Date("2020-02-20")} />);
  const ele = getByText(/02\/20\/2020/i);
  expect(ele).toBeTruthy();
});
