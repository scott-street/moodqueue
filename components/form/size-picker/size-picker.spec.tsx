import React from 'react';
import { expect } from 'chai';
import { render, mount } from 'enzyme';
import { SizePicker } from '../size-picker';

describe('<SizePicker />', () => {
  it('renders without crashing', () => {
    render(
      <SizePicker
        size={'large'}
        numSongs={0}
        progress={0}
        dispatch={jest.fn()}
      />
    );
  });

  it('renders the number of songs', () => {
    const wrapper = render(
      <SizePicker
        size={'large'}
        numSongs={10}
        progress={0}
        dispatch={jest.fn()}
      />
    );

    expect(wrapper.text()).to.contain('10');
  });

  it('renders +/- buttons for large screens', () => {
    const wrapper = render(
      <SizePicker
        size={'large'}
        numSongs={0}
        progress={0}
        dispatch={jest.fn()}
      />
    );

    expect(wrapper.find('#add-btn')).to.have.length(1);
    expect(wrapper.find('#subtract-btn')).to.have.length(1);
  });

  it("doesn't render +/- buttons for small screens", () => {
    const wrapper = render(
      <SizePicker
        size={'small'}
        numSongs={0}
        progress={0}
        dispatch={jest.fn()}
      />
    );

    expect(wrapper.find('#add-btn')).to.have.length(0);
    expect(wrapper.find('#subtract-btn')).to.have.length(0);
  });

  it("triggers prop two 'dispatch' calls on + button click", () => {
    const dispatchMock = jest.fn();
    const wrapper = mount(
      <SizePicker
        size={'large'}
        numSongs={0}
        progress={0}
        dispatch={dispatchMock}
      />
    );

    const moreBtn = wrapper.find('#add-btn').hostNodes();
    moreBtn.simulate('click');
    expect(dispatchMock.mock.calls.length).to.be.eql(2);
  });

  it("triggers prop two 'dispatch' calls on - button click", () => {
    const dispatchMock = jest.fn();
    const wrapper = mount(
      <SizePicker
        size={'large'}
        numSongs={0}
        progress={0}
        dispatch={dispatchMock}
      />
    );

    const moreBtn = wrapper.find('#subtract-btn').hostNodes();
    moreBtn.simulate('click');
    expect(dispatchMock.mock.calls.length).to.be.eql(2);
  });

  it("triggers prop two 'dispatch' calls on range input change", () => {
    const dispatchMock = jest.fn();
    const wrapper = mount(
      <SizePicker
        size={'large'}
        numSongs={0}
        progress={0}
        dispatch={dispatchMock}
      />
    );

    const picker = wrapper.find('#size-picker').hostNodes();
    const event = { target: { value: 1 } };
    picker.simulate('change', event);
    expect(dispatchMock.mock.calls.length).to.be.eql(2);
  });

  it('num songs does not go below 0 when subtract button is clicked', () => {
    const dispatchMock = jest.fn();
    const wrapper = mount(
      <SizePicker
        size={'large'}
        numSongs={0}
        progress={0}
        dispatch={dispatchMock}
      />
    );

    const moreBtn = wrapper.find('#add-btn').hostNodes();
    moreBtn.simulate('click');
    expect(wrapper.text()).to.contain('0');
  });

  it('num songs does not go above 50 when add button is clicked', () => {
    const dispatchMock = jest.fn();
    const wrapper = mount(
      <SizePicker
        size={'large'}
        numSongs={50}
        progress={0}
        dispatch={dispatchMock}
      />
    );

    const moreBtn = wrapper.find('#add-btn').hostNodes();
    moreBtn.simulate('click');
    expect(wrapper.text()).to.contain('50');
  });
});
