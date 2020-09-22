import React from 'react';
import { expect } from 'chai';
import { render, mount } from 'enzyme';
import { SourceSelection } from './source';
import { FormSelection } from '../../../types/FormSelection';

// test to see if check box is checked

const exampleFormSelection: FormSelection = {
  saved: true,
  artists: false,
  tracks: false,
  recommended: true
};

describe('<SourceSelection />', () => {
  it('renders without crashing', () => {
    render(
      <SourceSelection
        size={'large'}
        source={exampleFormSelection}
        progress={0}
        dispatch={jest.fn()}
      />
    );
  });

  it('renders saved checkbox and it is checked', () => {
    const wrapper = render(
      <SourceSelection
        size={'large'}
        source={exampleFormSelection}
        progress={0}
        dispatch={jest.fn()}
      />
    );

    expect(wrapper.find('#saved-checkbox'))
      .to.have.length(1)
      .and.prop('checked')
      .to.equal(true);
  });

  it('renders artists checkbox', () => {
    const wrapper = render(
      <SourceSelection
        size={'large'}
        source={exampleFormSelection}
        progress={0}
        dispatch={jest.fn()}
      />
    );

    expect(wrapper.find('#artists-checkbox')).to.have.length(1);
  });

  it('renders tracks checkbox', () => {
    const wrapper = render(
      <SourceSelection
        size={'large'}
        source={exampleFormSelection}
        progress={0}
        dispatch={jest.fn()}
      />
    );

    expect(wrapper.find('#tracks-checkbox')).to.have.length(1);
  });

  it('renders recommended checkbox', () => {
    const wrapper = render(
      <SourceSelection
        size={'large'}
        source={exampleFormSelection}
        progress={0}
        dispatch={jest.fn()}
      />
    );

    expect(wrapper.find('#recommended-checkbox')).to.have.length(1);
  });

  it("triggers prop 'dispatch' on check box click", () => {
    const dispatchMock = jest.fn();
    const wrapper = mount(
      <SourceSelection
        size={'large'}
        source={exampleFormSelection}
        progress={0}
        dispatch={dispatchMock}
      />
    );

    const checkbox = wrapper.find('#saved-checkbox').hostNodes();
    const event = { target: { value: true } };
    checkbox.simulate('change', event);
    expect(dispatchMock.mock.calls.length).to.be.eql(1);
  });
});
