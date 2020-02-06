test('renders default', async () => {
  const { findByText } = render(<Datetime />);
  const ele = findByText(/Select a date/i);
  expect(ele).toBeTruthy();
  ele = findByText(/Select a time/i);
  expect(ele).toBeTruthy();
});

test('renders Date and Time', async () => {
  const { findByText } = render(<Datetime 
    date={new Date('2020-03-20T12:00:00')} 
    time={new Date('2020-03-21T04:00:10')} 
    />);
  const ele = findByText(/2020-03-20/i);
  expect(ele).toBeTruthy();
  ele = findByText(/4:00 AM/i);
  expect(ele).toBeTruthy();
});