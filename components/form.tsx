import React, { FunctionComponent, useState } from 'react';
import {
  Box,
  Heading,
  Avatar,
  Header,
  Text,
  RangeInput,
  Button,
  RadioButtonGroup
} from 'grommet';
import { Spotify, User, Subtract, Add } from 'grommet-icons';
import { UserInfo, defaultUser } from '../types/UserInfo';
import { size } from 'cypress/types/lodash';

const icons = ['happy', 'euphoric', 'excited', 'sad', 'depressed', 'tired'];

interface FormProps {
  user: UserInfo;
}

/**
 * the ui of this component should obviously be altered, i just quickly threw some components at the screen
 * @param props
 */
const Form: FunctionComponent<FormProps> = (props) => {
  const [numSongs, setNumSongs] = useState(20);
  const [selection, setSelection] = useState('saved songs');

  const greeting =
    'hello, ' + (props.user.name ? props.user.name.toLowerCase() : 'friend');

  return (
    <Box fill pad="medium">
      <Header justify="evenly">
        <Box border="between" gap="small">
          <Heading textAlign="start" size="large" margin="none">
            mood queue
          </Heading>
          <Text weight="bold" textAlign="start" size="large">
            let your mood inspire you
          </Text>
        </Box>
        <Box direction="row" align="center" gap="small">
          <Heading textAlign="center" margin="none">
            {greeting}
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
      </Header>
      <Box align="center" justify="evenly" fill>
        <Box
          gap="large"
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
          pad="large"
        >
          <Heading textAlign="center" size="medium" margin="none">
            your mood...
          </Heading>
          <Box direction="row" gap="small">
            {icons.map((icon) => (
              <Box
                hoverIndicator="accent-1"
                round="small"
                pad="small"
                background="light-2"
                onClick={() => {}}
              >
                <Text size="small" weight="bold" textAlign="center">
                  {icon}
                </Text>
              </Box>
            ))}
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
          <Box direction="row" align="start" fill="horizontal" justify="evenly">
            <Text textAlign="center" weight="bold">
              choose from your:
            </Text>
            <RadioButtonGroup
              name="selector"
              options={[
                'saved songs',
                'top tracks',
                'top artists',
                'recommended'
              ]}
              value={selection}
              onChange={(event: any) => setSelection(event.target.value)}
            />
          </Box>
        </Box>
        <Button
          hoverIndicator="accent-1"
          alignSelf="center"
          label="create"
          size="large"
          icon={<Spotify size="large" />}
        />
      </Box>
    </Box>
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
