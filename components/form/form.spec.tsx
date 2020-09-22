import React from 'react';
import { shallow } from 'enzyme';
import Form from './form';
import { UserInfo } from '../../types/UserInfo';

const testUser: UserInfo = {
  name: 'test',
  id: 'test123',
  email: 'test123@gmail.com',
  profileUrl: 'spotify.com',
  profileImages: [
    {
      url:
        'https://i.pinimg.com/originals/1d/1b/0f/1d1b0f072bb652298e747dd02e8809fc.jpg'
    }
  ]
};

describe('Form', () => {
  it('renders without crashing', () => {
    shallow(<Form user={testUser} />);
  });
});
