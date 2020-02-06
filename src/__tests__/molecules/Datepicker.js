test('renders default', async () => {
  const { findByText } = render(<Datepicker />);
  const ele = findByText(/Select a date/i);
  expect(ele).toBeTruthy();
});

test('renders date', () => {
  const { getByText } = render(<Datepicker date={new Date('2020-02-20')}/>);
  const ele = getByText(/2020-02-20/i);
  expect(ele).toBeTruthy();
});
