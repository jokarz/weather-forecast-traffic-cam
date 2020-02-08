import React from "react";
import { render } from "@testing-library/react";
import Timepicker from "../../components/molecules/timepicker";

test("renders default", async () => {
  const { findByText } = render(<Timepicker />);
  const ele = findByText(/Select time/i);
  expect(ele).toBeTruthy();
});

test("renders AM", () => {
  const { getByText } = render(
    <Timepicker time={new Date("2020-02-20T00:00")} />
  );
  const ele = getByText(/12:00 AM/i);
  expect(ele).toBeTruthy();
});

test("renders PM", () => {
  const { getByText } = render(
    <Timepicker time={new Date("2020-02-20T12:00")} />
  );
  const ele = getByText(/12:00 PM/i);
  expect(ele).toBeTruthy();
});
