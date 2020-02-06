test('renders default', async () => {
  const { findByText } = render(<Datepicker />);
  const ele = findByText(/Select a time/i);
  expect(ele).toBeTruthy();
});

test('renders AM', () => {
  const { getByText } = render(<Datepicker date={new Date('2020-02-20T00:00')}/>);
  const ele = getByText(/12:00 AM/i);
  expect(ele).toBeTruthy();
});

test('renders PM', () => {
  const { getByText } = render(<Datepicker date={new Date('2020-02-20T12:00')}/>);
  const ele = getByText(/12:00 PM/i);
  expect(ele).toBeTruthy();
});