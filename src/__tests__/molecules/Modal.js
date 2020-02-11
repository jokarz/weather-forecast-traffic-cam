import React from "react";
import { render } from "@testing-library/react";
import Modal from "../../components/molecules/modal";

test("renders default", async () => {
  const { container } = render(<Modal />);
  const ele = container.querySelector(".modal").style.display;
  expect(ele).toBe("block");
});

test("renders hide", async () => {
  const { container } = render(<Modal show={false} />);
  const ele = container.querySelector(".modal").style.display;
  expect(ele).toBe("none");
});

test("renders with title", async () => {
  const { findByText } = render(<Modal show={false} title="Testing" />);
  const ele = await findByText(/Testing/i);
  expect(ele).toBeTruthy();
});

test("renders with data", async () => {
  const { findByText, container } = render(
    <Modal
      data={[
        { image: "1.jpg", area: "area1", forecast: "forecast1", name: "name1" },
        { image: "2.jpg", area: "area2", forecast: "forecast2", name: "name2" },
        { image: "3.jpg", area: "area3", forecast: "forecast3", name: "name3" }
      ]}
    />
  );
  let ele = await findByText(/area1/i);
  expect(ele).toBeTruthy();
  ele = await findByText(/forecast1/i);
  expect(ele).toBeTruthy();
  ele = container.querySelectorAll(".list-inline-item").length;
  expect(ele).toBe(3);
});
