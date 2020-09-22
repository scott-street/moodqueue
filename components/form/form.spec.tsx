import React from 'react';
import { render, shallow } from 'enzyme';
import { Form } from '../form';
import { UserInfo } from '../../types/UserInfo';
import { expect } from 'chai';

const testUser: UserInfo = {
  name: 'test',
  id: 'test123',
  email: 'test123@gmail.com',
  profileUrl: 'spotify.com',
  profileImages: [
    {
      url:
        // click the url k8, follow your destiny
        'https://i.pinimg.com/originals/1d/1b/0f/1d1b0f072bb652298e747dd02e8809fc.jpg'
    }
  ]
};

describe('<Form/>', () => {
  it('renders without crashing', () => {
    shallow(<Form user={testUser} />);
  });

  it('renders new queue in title', () => {
    const wrapper = render(<Form user={testUser} />);

    expect(wrapper.find('#queue-title').text()).to.contain('new queue');
  });

  it('renders user name in header', () => {
    const wrapper = render(<Form user={testUser} />);

    expect(wrapper.find('#username-txt').text()).to.contain(testUser.name);
  });

  it('renders app name in header', () => {
    const wrapper = render(<Form user={testUser} />);

    expect(wrapper.find('#app-name-txt').text()).to.contain('moodqueue');
  });

  it('renders continue button', () => {
    const wrapper = render(<Form user={testUser} />);
    expect(wrapper.find('#submit-form-btn').length).to.be.eql(1);
  });

  it('renders avatar with profile image', () => {
    const wrapper = render(<Form user={testUser} />);
    expect(wrapper.find('#avatar-profile-image').length).to.be.eql(1);
  });

  it('renders default avatar if no profile image is present', () => {
    const userWithNoImage: UserInfo = {
      name: 'test',
      id: 'test123',
      email: 'test123@gmail.com',
      profileUrl: 'spotify.com',
      profileImages: []
    };

    const wrapper = render(<Form user={userWithNoImage} />);
    expect(wrapper.find('#avatar-default').length).to.be.eql(1);
  });
});
