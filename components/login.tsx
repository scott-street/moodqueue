import React from 'react';
import { Box, Heading, Text, Button } from 'grommet';
import { Spotify } from 'grommet-icons';
import { useAuth } from '../common/hooks/useAuth';

interface LoginProps {
  size: string;
}
export const Login: React.FunctionComponent<LoginProps> = (props) => {
  const { size } = props;
  const { openSpotifyAccountLogin, redirect } = useAuth();
  return (
    <>
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
        background={{ color: '#2F3E4D', opacity: 0.7 }}
      >
        <Box align="center">
          <Heading textAlign="center" size="large">
            moodqueue
          </Heading>
          <Text textAlign="center" size={size !== 'small' ? 'large' : 'medium'}>
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
          onClick={() => openSpotifyAccountLogin(redirect)}
          label={size !== 'small' ? 'Login to Spotify' : 'Login'}
          icon={<Spotify color="plain" size="large" />}
          hoverIndicator="accent-1"
          primary={size === 'small'}
        />
      </Box>
    </>
  );
};
