test('renders default', async () => {
  const { findByText } = render(<Locationpicker />);
  const ele = findByText(/No location found/i);
  expect(ele).toBeTruthy();
});


test('renders with location data', async () => {
  const { findByText } = render(<Locationpicker locations={
    [
      {
        name: 'Marine Parade Drive'
      }
    ]
  } />);
  const ele = findByText(/Marine Parade Drive/i);
  expect(ele).toBeTruthy();
});