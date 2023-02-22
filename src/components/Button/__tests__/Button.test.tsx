import React from 'react';
import { render } from '@testing-library/react-native';
import Button from '../Button';

jest.useFakeTimers();

describe('Button component', () => {
  it('Match Snapshot', () => {
    const { toJSON } = render(<Button text="Template" />);
    expect(toJSON()).toMatchSnapshot();
  });
});
