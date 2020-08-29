import React from 'react';
import { shallow } from 'enzyme';
import ResultsPage from '../components/results';

describe('Results', () => {
  it('renders without crashing', () => {
    shallow(<ResultsPage />);
  });
});
