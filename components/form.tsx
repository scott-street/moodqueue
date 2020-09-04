import React, { FunctionComponent, useState, useEffect } from 'react';
import {
  Box,
  Heading,
  Avatar,
  Header,
  Text,
  RangeInput,
  Button,
  ResponsiveContext,
  CheckBox,
  TextInput
} from 'grommet';
import { Spotify, User, Subtract, Add, Emoji } from 'grommet-icons';
import { UserInfo, defaultUser } from '../types/UserInfo';

const icons = ['happy', 'euphoric', 'excited', 'sad', 'depressed', 'angry'];

interface FormProps {
  user: UserInfo;
}

const Form: FunctionComponent<FormProps> = (props) => {
  const [numSongs, setNumSongs] = useState(20);
  const name = props.user.name ? props.user.name.toLowerCase() : 'stranger';

  return (
    <ResponsiveContext.Consumer>
      {(size) => (
        <Box fill justify={size !== 'small' ? 'evenly' : 'center'}>
          <Header
            justify={size !== 'small' ? 'evenly' : 'center'}
            direction={size !== 'small' ? 'row' : 'column'}
          >
            <Box border="between" gap="small">
              <Heading textAlign="start" size="large" margin="none">
                moodqueue
              </Heading>
              <Text
                weight={size !== 'small' ? 'bold' : 'normal'}
                textAlign={size !== 'small' ? 'start' : 'center'}
                size="large"
              >
                let your mood inspire you
              </Text>
            </Box>
            {size !== 'small' && (
              <Box direction="row" align="center" gap="small">
                <Heading textAlign="center" margin="none">
                  {name}
                </Heading>
                {props.user.profileImages[0] ? (
                  <Avatar
                    src={props.user.profileImages[0].url}
                    size="xlarge"
                    border={{ size: 'small', side: 'all', color: 'accent-1' }}
                    onClick={() => window.open(props.user.profileUrl, '_blank')}
                    title="click to open your spotify profile"
                  />
                ) : (
                  <Avatar
                    background="accent-2"
                    border={{ size: 'small', side: 'all', color: 'accent-1' }}
                    size="large"
                    onClick={() => window.open(props.user.profileUrl, '_blank')}
                    title="click to open your spotify profile"
                  >
                    <User color="accent-1" size="large" />
                  </Avatar>
                )}
              </Box>
            )}
          </Header>
          <Box align="center" margin="large">
            <Box
              flex
              gap="medium"
              justify="center"
              align="center"
              border={{
                side: 'all',
                size: 'xlarge',
                style: 'outset',
                color: 'accent-1'
              }}
              background={{ color: '#2F3E4D' }}
              round="large"
              pad="medium"
            >
              <Box align="center">
                <TextInput
                  title="click to edit"
                  plain
                  placeholder="new queue"
                  style={{
                    textAlign: 'center',
                    fontSize:
                      size === 'large' ? 64 : size === 'medium' ? 56 : 48
                  }}
                />
              </Box>
              <Box gap="medium" align="center">
                <Text textAlign="center" weight="bold">
                  your mood...
                </Text>
                <Box direction="row" gap="small">
                  {icons.map((icon) => (
                    <Box
                      hoverIndicator="accent-1"
                      round="small"
                      pad={{ horizontal: 'small', vertical: 'xsmall' }}
                      align="center"
                      background="light-2"
                      direction={size !== 'small' ? 'row' : 'column'}
                      gap="xsmall"
                      onClick={() => {}}
                      key={icon}
                    >
                      <Text size="xsmall" weight="bold" textAlign="center">
                        {icon}
                      </Text>
                      <Emoji color="brand" />
                    </Box>
                  ))}
                </Box>
              </Box>
              <Box gap="small" fill="horizontal">
                <Text textAlign="center" weight="bold">
                  number of songs:{' '}
                  <Text textAlign="center" color="accent-1">
                    {numSongs}
                  </Text>
                </Text>
                <Box direction="row" align="center" gap="small">
                  <Button
                    icon={<Subtract />}
                    style={{ borderRadius: 30 }}
                    onClick={() => {
                      let num = numSongs;
                      num--;
                      setNumSongs(num);
                    }}
                  />
                  <RangeInput
                    max={50}
                    min={1}
                    step={1}
                    name="number of songs:"
                    value={numSongs}
                    onChange={(event) => setNumSongs(+event.target.value)}
                  />
                  <Button
                    icon={<Add />}
                    style={{ borderRadius: 30 }}
                    onClick={() => {
                      let num = numSongs;
                      num++;
                      setNumSongs(num);
                    }}
                  />
                </Box>
              </Box>
              <Box
                direction="row"
                align="start"
                fill="horizontal"
                justify="evenly"
              >
                <Text textAlign="center" weight="bold">
                  choose from your:
                </Text>
                <Box gap="small">
                  <CheckBox label="saved songs" />
                  <CheckBox label="top tracks" />
                  <CheckBox label="top artists" />
                  <CheckBox label="recommended" />
                </Box>
              </Box>
              <Button
                margin="small"
                hoverIndicator="accent-1"
                alignSelf="center"
                label="queue it"
                size={size === 'small' ? 'medium' : 'large'}
                icon={<Spotify size="large" />}
              />
            </Box>
            {size === 'small' && (
              <Box align="center" pad={{ top: 'large' }}>
                {props.user.profileImages[0] ? (
                  <Avatar
                    src={props.user.profileImages[0].url}
                    size="xlarge"
                    border={{ size: 'small', side: 'all', color: 'accent-1' }}
                    onClick={() => window.open(props.user.profileUrl, '_blank')}
                    title="click to open your spotify profile"
                  />
                ) : (
                  <Avatar
                    background="accent-2"
                    border={{ size: 'small', side: 'all', color: 'accent-1' }}
                    size="large"
                    onClick={() => window.open(props.user.profileUrl, '_blank')}
                    title="click to open your spotify profile"
                  >
                    <User color="accent-1" size="large" />
                  </Avatar>
                )}
              </Box>
            )}
          </Box>
        </Box>
      )}
    </ResponsiveContext.Consumer>
  );
};

export default Form;

export async function getStaticProps() {
  return {
    props: {
      user: defaultUser
    }
  };
}
