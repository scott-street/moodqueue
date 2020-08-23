import React, { FunctionComponent, useState, useEffect } from 'react';
import {
  Box,
  Button,
  Grommet,
  grommet,
  Heading,
  Text,
  ResponsiveContext
} from 'grommet';
import { Spotify } from 'grommet-icons';
import Form from './form';
import { UserInfo } from '../types/UserInfo';
import { SpotifyHelper } from '../helpers/spotify/login';

const defaultUser: UserInfo = {
  id: '',
  name: '',
  email: '',
  profileUrl: '',
  profileImages: []
};

const Login: FunctionComponent = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [accessToken, setAccessToken] = useState('');
  // have to figure out a smart way of using this refresh token to prevent timed log out
  const [refreshToken, setRefreshToken] = useState('');
  const [user, setUser] = useState(defaultUser);

  useEffect(() => {
    // hopefully this only gets called on page load like you said
    // or else we'll be getting a 429 error from spotify
    const params = new URLSearchParams(window.location.search);
    if (
      params.has('access_token') &&
      params.has('refresh_token') &&
      user.id.length === 0
    ) {
      setAccessToken(params.get('access_token'));
      setRefreshToken(params.get('refresh_token'));
      SpotifyHelper.getUserInfo(params.get('access_token')).then((newUser) => {
        console.log(newUser);
        setUser(newUser);
        setLoggedIn(true);
      });
    }
  }, []);

  return (
    <Grommet theme={grommet} full>
      <ResponsiveContext.Consumer>
        {(size) => (
          <Box
            align="center"
            justify="center"
            fill
            style={{
              background:
                'linear-gradient(215deg, rgba(63,94,251,1) 30%, rgba(252,70,107,1) 100%)'
            }}
            background="#1F2730" // this is to force the dark theme
          >
            {loggedIn ? (
              <Form user={user} />
            ) : (
              <Box
                align="center"
                round="large"
                pad="xlarge"
                gap="large"
                border={{
                  side: 'all',
                  size: 'xlarge',
                  style: 'outset',
                  color: 'accent-1'
                }}
                background={{ color: '#2F3E4D' }}
              >
                <Box align="center">
                  <Heading textAlign="center" size="large">
                    mood queue
                  </Heading>
                  <Text
                    textAlign="center"
                    size={size !== 'small' ? 'large' : 'medium'}
                  >
                    create playlists, update your queue, and get inspired
                  </Text>
                </Box>
                <Button
                  style={
                    size !== 'small'
                      ? { borderRadius: 50, padding: '20px 30px 20px 30px' }
                      : undefined
                  }
                  size="large"
                  alignSelf="center"
                  onClick={SpotifyHelper.openSpotifyAccountLogin}
                  label={size !== 'small' ? 'Login to Spotify' : 'Login'}
                  icon={<Spotify color="plain" size="large" />}
                  hoverIndicator="accent-1"
                  primary={size === 'small'}
                />
              </Box>
            )}
          </Box>
        )}
      </ResponsiveContext.Consumer>
    </Grommet>
  );
};

export default Login;
