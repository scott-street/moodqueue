import React from 'react';
import { shallow } from 'enzyme';
import Results from '../components/results';
import { FormSelection } from '../types/FormSelection';

const source: FormSelection = {
  saved: true,
  artists: false,
  tracks: false,
  recommended: false
};

describe('Results', () => {
  it('renders without crashing', () => {
    shallow(
      <Results
        size={'large'}
        mood={0}
        numSongs={10}
        source={source}
        resetForm={() => console.log('reset')}
      />
    );
  });
});
