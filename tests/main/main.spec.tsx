import React from 'react';
import { render } from '@testing-library/react-native';
import Main from '../../src/main';

test('should show voy text with success', () => {
  const { getByText } = render(<Main />);

  const text = getByText('Voy!');

  expect(text).toBeTruthy();
});
