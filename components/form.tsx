import React, { FunctionComponent } from 'react';
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
import { Spotify, User, Subtract, Add } from 'grommet-icons';
import { EmotionHappy as Happy } from '@styled-icons/remix-fill/EmotionHappy';
import { EmotionSad as Sad } from '@styled-icons/remix-fill/EmotionSad';
import { UserInfo, defaultUser } from '../types/UserInfo';
import { Mood } from '../types/Mood';
import { useForm } from '../common/hooks/useForm';
import Results from './results';

interface FormProps {
  user: UserInfo;
}

const Form: FunctionComponent<FormProps> = (props) => {
  const name = props.user.name ? props.user.name.toLowerCase() : 'stranger';
  const {
    queueTitle,
    moodIndex,
    numSongs,
    sourceSelection,
    progress,
    showResults
  } = useForm();
  const {
    setQueueTitle,
    setMood,
    setNumSongs,
    handleSouceSelectionOnChange,
    setProgress
  } = useForm();
  const { submitForm } = useForm();

  return (
    <ResponsiveContext.Consumer>
      {(size) => (
        <Box fill justify="between" overflow={{ horizontal: 'hidden' }}>
          <Header
            justify={size !== 'small' ? 'evenly' : 'center'}
            direction={size !== 'small' ? 'row' : 'column'}
          >
            <Box border="between" gap="small">
              <Heading
                textAlign={size !== 'small' ? 'start' : 'center'}
                size={size !== 'small' ? 'large' : 'medium'}
                margin="none"
              >
                moodqueue
              </Heading>
              <Text
                weight={size !== 'small' ? 'bold' : 'normal'}
                textAlign={size !== 'small' ? 'start' : 'center'}
                size={size !== 'small' ? 'large' : 'medium'}
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
          <Box
            align="center"
            margin={size !== 'small' ? 'medium' : 'small'}
            fill="vertical"
            flex
          >
            <Box
              flex
              border={{
                side: 'all',
                size: 'xlarge',
                style: 'outset',
                color: 'accent-1'
              }}
              background={{ color: '#2F3E4D', opacity: 0.7 }}
              round="large"
              pad={{
                horizontal: 'medium'
              }}
            >
              {showResults ? (
                <Results size={size} />
              ) : (
                <Box
                  justify="between"
                  align="center"
                  flex
                  fill={size === 'small'}
                >
                  <TextInput
                    title="click to edit"
                    plain
                    onChange={(event) => {
                      let prog = progress;
                      const name = event.target.value;
                      if (name.length === 1 && queueTitle.length === 0) prog++;
                      else if (name.length === 0) prog--;
                      setQueueTitle(name);
                      setProgress(prog);
                    }}
                    placeholder="new queue"
                    style={{
                      textAlign: 'center',
                      fontSize:
                        size === 'large' ? 48 : size === 'medium' ? 40 : 32
                    }}
                  />
                  <Box
                    fill
                    justify="evenly"
                    align="center"
                    gap={size === 'small' ? 'large' : 'medium'}
                  >
                    <Box gap="small" align="center">
                      <Text
                        textAlign="center"
                        weight="bold"
                        size={size !== 'small' ? 'medium' : 'small'}
                      >
                        what music are you in the mood for?
                      </Text>
                      <Box direction="row" gap="small">
                        {Object.keys(Mood).map(
                          (mood, i) =>
                            isNaN(Number(Mood[mood])) && (
                              <Box
                                hoverIndicator={
                                  moodIndex === i ? 'accent-3' : 'accent-1'
                                }
                                style={{
                                  borderTopLeftRadius: 30,
                                  borderTopRightRadius: 30,
                                  borderBottomLeftRadius: 30
                                }}
                                pad={{
                                  horizontal: 'medium',
                                  vertical: 'xsmall'
                                }}
                                align="center"
                                background={
                                  moodIndex === i ? 'accent-1' : 'light-2'
                                }
                                gap="xsmall"
                                onClick={() => {
                                  let prog = progress;
                                  let index = i;
                                  if (moodIndex === -1) prog++;
                                  if (moodIndex === i) {
                                    prog--;
                                    index = -1;
                                  }
                                  setMood(index);
                                  setProgress(prog);
                                }}
                                key={i}
                              >
                                {size !== 'small' && (
                                  <Text
                                    size="xsmall"
                                    weight="bold"
                                    textAlign="center"
                                  >
                                    {Mood[mood].toLowerCase()}
                                  </Text>
                                )}
                                {mood === Mood.HAPPY.toString() ? (
                                  <Happy width="32px" height="32px" />
                                ) : (
                                  <Sad width="32px" height="32px" />
                                )}
                              </Box>
                            )
                        )}
                      </Box>
                    </Box>
                    <Box gap="xsmall" fill="horizontal">
                      <Text
                        textAlign="center"
                        weight="bold"
                        size={size !== 'small' ? 'medium' : 'small'}
                      >
                        number of songs:{' '}
                        <Text
                          textAlign="center"
                          color="accent-1"
                          size={size !== 'small' ? 'medium' : 'small'}
                        >
                          {numSongs}
                        </Text>
                      </Text>
                      <Box direction="row" align="center" gap="small">
                        <Button
                          icon={
                            <Subtract
                              size={size !== 'small' ? 'medium' : 'small'}
                            />
                          }
                          style={{ borderRadius: 30 }}
                          onClick={() => {
                            let num = numSongs;
                            let prog = progress;
                            if (num - 1 === 0) prog--;
                            if (num - 1 >= 0) num--;
                            setProgress(prog);
                            setNumSongs(num);
                          }}
                        />
                        <RangeInput
                          max={50}
                          min={0}
                          step={1}
                          name="number of songs:"
                          value={numSongs}
                          onChange={(event) => {
                            let prog = progress;
                            const value = +event.target.value;
                            if (value > 0 && numSongs === 0) prog++;
                            else if (value === 0) prog--;
                            setProgress(prog);
                            setNumSongs(value);
                          }}
                        />
                        <Button
                          icon={
                            <Add size={size !== 'small' ? 'medium' : 'small'} />
                          }
                          style={{ borderRadius: 30 }}
                          onClick={() => {
                            let num = numSongs;
                            let prog = progress;
                            if (num === 0) prog++;
                            if (num + 1 <= 50) num++;
                            setProgress(prog);
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
                      <Text
                        textAlign="center"
                        weight="bold"
                        size={size !== 'small' ? 'medium' : 'small'}
                      >
                        choose from your:
                      </Text>
                      <Box gap="small">
                        <CheckBox
                          label={
                            <Box>
                              <Text
                                size={size !== 'small' ? 'medium' : 'small'}
                              >
                                saved songs
                              </Text>
                            </Box>
                          }
                          checked={sourceSelection.saved}
                          onChange={(event) =>
                            handleSouceSelectionOnChange(
                              0,
                              event.target.checked
                            )
                          }
                        />
                        <CheckBox
                          label={
                            <Box>
                              <Text
                                size={size !== 'small' ? 'medium' : 'small'}
                              >
                                top tracks
                              </Text>
                            </Box>
                          }
                          checked={sourceSelection.tracks}
                          onChange={(event) =>
                            handleSouceSelectionOnChange(
                              1,
                              event.target.checked
                            )
                          }
                        />
                        <CheckBox
                          label={
                            <Box>
                              <Text
                                size={size !== 'small' ? 'medium' : 'small'}
                              >
                                top artists
                              </Text>
                            </Box>
                          }
                          checked={sourceSelection.artists}
                          onChange={(event) =>
                            handleSouceSelectionOnChange(
                              2,
                              event.target.checked
                            )
                          }
                        />
                        <CheckBox
                          label={
                            <Box>
                              <Text
                                size={size !== 'small' ? 'medium' : 'small'}
                              >
                                recommended
                              </Text>
                            </Box>
                          }
                          checked={sourceSelection.recommended}
                          onChange={(event) =>
                            handleSouceSelectionOnChange(
                              3,
                              event.target.checked
                            )
                          }
                        />
                      </Box>
                    </Box>
                  </Box>
                  <Button
                    margin="small"
                    hoverIndicator={size !== 'small' ? 'accent-1' : false}
                    alignSelf="center"
                    primary={size === 'small'}
                    disabled={progress !== 4}
                    label="continue"
                    onClick={submitForm}
                    size={size === 'small' ? 'medium' : 'large'}
                    icon={
                      <Spotify size={size !== 'large' ? 'medium' : 'large'} />
                    }
                  />
                </Box>
              )}
            </Box>
          </Box>
          {size === 'small' && (
            <Box align="center" margin={{ bottom: 'small' }}>
              {props.user.profileImages[0] ? (
                <Avatar
                  src={props.user.profileImages[0].url}
                  size={size !== 'small' ? 'xlarge' : 'large'}
                  border={{ size: 'small', side: 'all', color: 'accent-1' }}
                  onClick={() => window.open(props.user.profileUrl, '_blank')}
                  title="click to open your spotify profile"
                />
              ) : (
                <Avatar
                  background="accent-2"
                  border={{ size: 'small', side: 'all', color: 'accent-1' }}
                  size={size !== 'small' ? 'large' : 'medium'}
                  onClick={() => window.open(props.user.profileUrl, '_blank')}
                  title="click to open your spotify profile"
                >
                  <User
                    color="accent-1"
                    size={size !== 'small' ? 'large' : 'medium'}
                  />
                </Avatar>
              )}
            </Box>
          )}
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
