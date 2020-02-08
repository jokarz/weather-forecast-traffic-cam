import React from 'react';
import { render } from '@testing-library/react';
import Datetime from '../../components/organisms/datetime';

test('renders default', async () => {
  const { findByText } = render(<Datetime />);
  let ele = await findByText(/Select date/i);
  expect(ele).toBeTruthy();
  ele = await findByText(/Select time/i);
  expect(ele).toBeTruthy();
});

test('renders Date and Time', async() => {
  const { findByText } = render(<Datetime
    date={new Date('2020-03-20T12:00:00')}
    time={new Date('2020-03-21T04:00:10')}
  />);
  let ele = await findByText(/03\/20\/2020/i);
  expect(ele).toBeTruthy();
  ele = await findByText(/4:00 AM/i);
  expect(ele).toBeTruthy();
});