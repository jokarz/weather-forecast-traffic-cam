import React from "react";
import { render } from "@testing-library/react";
import Locationpicker from "../../components/organisms/locationpicker";

test("renders default", async () => {
  const { findByText } = render(<Locationpicker />);
  const ele = findByText(/No location found/i);
  expect(ele).toBeTruthy();
});

test("renders with location data", async () => {
  const { findByText } = render(
    <Locationpicker
      data={{
        "Marine Parade Drive": [{}]
      }}
    />
  );
  const ele = findByText(/Marine Parade Drive/i);
  expect(ele).toBeTruthy();
});

test("renders with random location data", async () => {
  const rdm = Math.random();
  const { findByText } = render(
    <Locationpicker
      data={{
        [`Marine Parade Drive${rdm}`]: [{}]
      }}
    />
  );
  const ele = findByText(new RegExp(`Marine Parade Drive${rdm}`, "i"));
  expect(ele).toBeTruthy();
});
