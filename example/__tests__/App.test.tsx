/**
 * @format
 */

import React from 'react';
import { act, create } from 'react-test-renderer';
import App from '../src/App';

describe('App', () => {
  it('renders correctly', async () => {
    await act(() => {
      create(<App />);
    });
  });
});
