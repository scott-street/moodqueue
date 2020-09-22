import React from 'react';
import { expect } from 'chai';
import { render, mount } from 'enzyme';
import { MoodSelection } from '../mood-selection';

describe('<MoodSelection />', () => {
  it('renders without crashing', () => {
    render(
      <MoodSelection
        size={'large'}
        moodIndex={-1}
        progress={0}
        dispatch={jest.fn()}
      />
    );
  });

  it('renders the happy mood', () => {
    const wrapper = render(
      <MoodSelection
        size={'large'}
        moodIndex={-1}
        progress={0}
        dispatch={jest.fn()}
      />
    );

    expect(wrapper.find('#mood-box-0')).to.have.length(1);
  });

  it('renders the sad mood', () => {
    const wrapper = render(
      <MoodSelection
        size={'large'}
        moodIndex={-1}
        progress={0}
        dispatch={jest.fn()}
      />
    );

    expect(wrapper.find('#mood-box-1')).to.have.length(1);
  });

  it('renders the sleepy mood', () => {
    const wrapper = render(
      <MoodSelection
        size={'large'}
        moodIndex={-1}
        progress={0}
        dispatch={jest.fn()}
      />
    );

    expect(wrapper.find('#mood-box-2')).to.have.length(1);
  });

  it('renders the party mood', () => {
    const wrapper = render(
      <MoodSelection
        size={'large'}
        moodIndex={-1}
        progress={0}
        dispatch={jest.fn()}
      />
    );

    expect(wrapper.find('#mood-box-3')).to.have.length(1);
  });

  it('renders mood text for large screens', () => {
    const wrapper = render(
      <MoodSelection
        size={'large'}
        moodIndex={-1}
        progress={0}
        dispatch={jest.fn()}
      />
    );

    expect(wrapper.find('#mood-txt')).to.have.length(1);
  });

  it("doesn't render mood name for small screens", () => {
    const wrapper = render(
      <MoodSelection
        size={'small'}
        moodIndex={-1}
        progress={0}
        dispatch={jest.fn()}
      />
    );

    expect(wrapper.find('#mood-txt')).to.have.length(0);
  });

  it('renders mood box with different color when it is selected by user', () => {
    const wrapper = render(
      <MoodSelection
        size={'large'}
        moodIndex={0}
        progress={0}
        dispatch={jest.fn()}
      />
    );

    expect(wrapper.find('#mood-box-0').get(0).props.style).to.have.property(
      'backgroundColor',
      '#6FFFB0'
    );
  });

  it("triggers prop 'dispatch' on happy mood box click", () => {
    const dispatchMock = jest.fn();
    const wrapper = mount(
      <MoodSelection
        size={'large'}
        moodIndex={-1}
        progress={0}
        dispatch={dispatchMock}
      />
    );

    const moodBox = wrapper.find('#mood-box-0').hostNodes();
    moodBox.simulate('click');
    expect(dispatchMock.mock.calls.length).to.be.eql(1);
  });
});
