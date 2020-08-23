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

// might want to make a separate file for types in the future
// i'm just putting this here for now
export type UserInfo = {
  id: string;
  name: string;
  email: string;
  profileUrl: string;
  profileImage: string;
};

const defaultUser: UserInfo = {
  id: '',
  name: '',
  email: '',
  profileUrl: '',
  profileImage: ''
};

const Login: FunctionComponent = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [accessToken, setAccessToken] = useState('');
  // have to figure out a smart way of using this refresh token to prevent timed log out
  const [refreshToken, setRefreshToken] = useState('');
  const [user, setUser] = useState(defaultUser);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    // since this is called on every update of the component, there is only one call
    // to retrieve all query params and fetch user info
    if (
      params.has('access_token') &&
      params.has('refresh_token') &&
      user.id.length === 0
    ) {
      setAccessToken(params.get('access_token'));
      setRefreshToken('refresh_token');
      getUserInfo();
      setLoggedIn(true);
    }
  });

  /**
   * spotify required this for their login flow for some reason
   * @param length
   */
  const generateRandomString = (length: number) => {
    let text = '';
    const possible =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    for (let i = 0; i < length; i++) {
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
  };

  /**
   * redirect user to spotify's login service
   *
   * also
   * there has to be a better way to do this than force changing the url
   */
  const openSpotifyAccountLogin = () => {
    const rand = generateRandomString(16);
    const redirect_uri = 'http://localhost:3000/api/login';
    const scopes =
      'user-read-private user-read-email user-modify-playback-state playlist-modify-private playlist-modify-public user-library-read';
    //make sure to change show_dialog to false if we don't want to show the spotify login redirect anymore
    const url = `https://accounts.spotify.com/authorize?response_type=code&client_id=${process.env.CLIENT_ID}&scope=${scopes}&redirect_uri=${redirect_uri}&state=${rand}&show_dialog=true`;
    window.location.href = url;
  };

  /**
   * retrieves the user profile of the currently signed in user
   */
  const getUserInfo = async () => {
    const response = await fetch('https://api.spotify.com/v1/me', {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + accessToken
      },
      method: 'GET'
    });
    const data = await response.json();
    const newUser: UserInfo = {
      id: data.id,
      name: data.display_name,
      email: data.email,
      profileImage: data.images[0].url,
      profileUrl: data.external_urls.spotify
    };
    setUser(newUser);
  };

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
                  onClick={openSpotifyAccountLogin}
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
