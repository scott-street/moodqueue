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
import Form from '../components/form';
import { UserInfo, defaultUser } from '../types/UserInfo';
import { SpotifyHelper } from '../helpers/spotify/login';
import Redirect from '../components/redirect';
import { NotificationType, defaultNotification } from '../types/notification';
import Notification from '../components/notification';
import { BounceLoader } from 'react-spinners';
import Head from 'next/head';

const Login: FunctionComponent = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [accessToken, setAccessToken] = useState('');
  // have to figure out a smart way of using this refresh token to prevent timed log out
  const [refreshToken, setRefreshToken] = useState('');
  const [user, setUser] = useState<UserInfo>(defaultUser);
  const [redirect, setRedirect] = useState('');
  const [loadForRedirect, setLoadForRedirect] = useState(false);
  const [notification, setNotification] = useState<NotificationType>(
    defaultNotification
  );
  const [refresh, setRefresh] = useState(true);

  useEffect(() => {
    if (user.id.length === 0) {
      // sets appropriate redirect depending on where the app is being deployed
      const hostname = new URL(window.location.href).hostname;
      console.log(hostname);
      setRedirect(SpotifyHelper.setRedirect(hostname));

      const params = new URLSearchParams(window.location.search);
      if ((params.has('code') && params.has('state')) || params.has('error')) {
        // spotify redirects back to / with either a code or error message
        // either way, process it with redirect.tsx and set screen to load
        setRefresh(false);
        setLoadForRedirect(true);
      } else if (params.has('access_token') && params.has('refresh_token')) {
        // user has successfully logged in and given moodqueue permission
        setUpHome(params);
      } else setRefresh(false);
    } else setRefresh(false);
  }, []);

  /**
   * sets up home for current user upon successful sign in
   * @param params
   */
  const setUpHome = (params: URLSearchParams) => {
    setAccessToken(params.get('access_token'));
    setRefreshToken(params.get('refresh_token'));
    SpotifyHelper.getUserInfo(params.get('access_token')).then((newUser) => {
      let n: NotificationType = {
        success: true,
        show: true,
        text: 'welcome to moodqueue'
      };
      setNotification(n);
      setTimeout(() => {
        n = {
          success: true,
          show: false,
          text: ''
        };
        setNotification(n);
      }, 4000);
      setUser(newUser);
      setLoggedIn(true);
      setRefresh(false);
    });
  };

  /**
   * handles any login error by sending the user
   * an error message and logging them out
   */
  const handleError = () => {
    let n: NotificationType = {
      success: false,
      show: true,
      text: 'login failed!'
    };
    setNotification(n);
    setTimeout(() => {
      n = {
        success: false,
        show: false,
        text: ''
      };
      setNotification(n);
    }, 4000);
    setLoadForRedirect(false);
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
            <Head>
              <link rel="shortcut icon" href="/favicon.ico" key={0} />
              <title key={1}>
                {user.id.length > 0 ? 'home | moodqueue' : 'login | moodqueue'}
              </title>
            </Head>
            {loadForRedirect ? (
              <Redirect redirect={redirect} handleError={handleError} />
            ) : loggedIn ? (
              <Form user={user} />
            ) : (
              <Box align="center" justify="center">
                {refresh ? (
                  <BounceLoader size={300} color="#6FFFB0" />
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
                      onClick={() =>
                        SpotifyHelper.openSpotifyAccountLogin(redirect)
                      }
                      label={size !== 'small' ? 'Login to Spotify' : 'Login'}
                      icon={<Spotify color="plain" size="large" />}
                      hoverIndicator="accent-1"
                      primary={size === 'small'}
                    />
                  </Box>
                )}
              </Box>
            )}

            {notification.show && (
              <Notification
                notification={notification}
                onNotificationClose={() => {
                  const n: NotificationType = {
                    success: true,
                    show: false,
                    text: ''
                  };
                  setNotification(n);
                }}
              />
            )}
          </Box>
        )}
      </ResponsiveContext.Consumer>
    </Grommet>
  );
};

export default Login;
