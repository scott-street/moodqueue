import React from 'react';
import { shallow } from 'enzyme';
import Form from '../pages/form';
import { UserInfo } from '../pages/index';

const testUser: UserInfo = {
  name: 'test',
  id: 'test123',
  email: 'test123@gmail.com',
  profileUrl: 'spotify.com',
  profileImage: 'some-image.png'
};

describe('Form', () => {
  it('renders without crashing', () => {
    shallow(<Form user={testUser} />);
  });
});
