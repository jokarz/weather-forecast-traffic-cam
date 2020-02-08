import React from 'react';
import { render } from '@testing-library/react';
import ImagePlaceholder from '../../components/atoms/imageplaceholder';

test('renders default', async () => {
  const { container } = render(<ImagePlaceholder />);
  const ele = container.querySelector('.rounded-lg');
  expect(ele).toBeTruthy();
});
