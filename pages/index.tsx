import React, { FunctionComponent, useEffect } from 'react';
import { Box, Grommet, grommet, ResponsiveContext } from 'grommet';
import Form from '../components/form';
import Redirect from '../components/redirect';
import { BounceLoader } from 'react-spinners';
import Head from 'next/head';
import { Login } from '../components/login';
import { AuthProvider, useAuth } from '../common/hooks/useAuth';
import {
  NotificationProvider,
  useNotification
} from '../common/hooks/useNotification';
import { SpotifyProvider } from '../common/hooks/useSpotify';
import { FormProvider } from '../common/hooks/useForm';

const BaseApp: FunctionComponent = () => {
  const {
    setAuthRedirect,
    setUserInfo,
    user,
    setAccessToken,
    setRefreshToken,
    accessToken
  } = useAuth();
  const { notifySuccess } = useNotification();

  useEffect(() => {
    if (!user) {
      setAuthRedirect(new URL(window.location.href).hostname);
      const params = new URLSearchParams(window.location.search);
      if (params.has('access_token') && params.has('refresh_token')) {
        setAccessToken(params.get('access_token'));
        setRefreshToken(params.get('refresh_token'));
      }
    }
  }, []);

  useEffect(() => {
    if (accessToken) {
      setUserInfo();
      notifySuccess('welcome to moodqueue');
    }
  }, [accessToken]);

  return (
    <Grommet theme={grommet} full>
      <ResponsiveContext.Consumer>
        {(size) => (
          <Box
            align="center"
            justify="center"
            fill
            pad="medium"
            style={{
              background:
                'linear-gradient(215deg, rgba(63,94,251,1) 30%, rgba(252,70,107,1) 100%)'
            }}
            background="#1F2730" // this is to force the dark theme
          >
            <Head>
              <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
              <link rel="shortcut icon" href="/favicon.ico" key={0} />
              <title key={1}>
                {user ? 'home | moodqueue' : 'login | moodqueue'}
              </title>
            </Head>
            {accessToken ? (
              user ? (
                <Form user={user} />
              ) : (
                <BounceLoader size={300} color="#6FFFB0" />
              )
            ) : (
              <Login size={size} />
            )}
          </Box>
        )}
      </ResponsiveContext.Consumer>
    </Grommet>
  );
};

const App = () => (
  <AuthProvider>
    <NotificationProvider>
      <SpotifyProvider>
        <Redirect>
          <FormProvider>
            <BaseApp />
          </FormProvider>
        </Redirect>
      </SpotifyProvider>
    </NotificationProvider>
  </AuthProvider>
);
export default App;
