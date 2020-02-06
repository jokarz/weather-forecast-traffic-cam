test('renders default', async () => {
  const { findByText } = render(<Locationpicker />);
  const ele = findByText(/No location found/i);
  expect(ele).toBeTruthy();
});


test('renders with location data', async () => {
  const { findByText } = render(<Locationpicker data={
    [
      {
        "name": "Marine Parade Drive",
        "area": "City",
        "forecast": "Fair (Night)"
      }
    ]
  } />);
  const ele = findByText(/Marine Parade Drive/i);
  expect(ele).toBeTruthy();
});