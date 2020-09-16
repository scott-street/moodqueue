import React, { FunctionComponent, Reducer, useReducer } from 'react';
import {
  Box,
  Heading,
  Avatar,
  Header,
  Text,
  RangeInput,
  Button,
  ResponsiveContext,
  CheckBox
} from 'grommet';
import { Spotify, User, Subtract, Add } from 'grommet-icons';
import { EmotionHappy as Happy } from '@styled-icons/remix-fill/EmotionHappy';
import { EmotionSad as Sad } from '@styled-icons/remix-fill/EmotionSad';
import { UserInfo, defaultUser } from '../../types/UserInfo';
import { Mood } from '../../types/Mood';
import Results from '../results';
import {
  formReducer,
  initialFormState,
  update,
  FormState,
  FormAction,
  updateSourceSelection,
  resetFormState
} from './reducer';
import { FormSelection } from '../../types/FormSelection';

interface FormProps {
  user: UserInfo;
}

const Form: FunctionComponent<FormProps> = (props) => {
  const name = props.user.name ? props.user.name.toLowerCase() : 'stranger';
  const [progress, setProgress] = React.useState(0);
  const [showResults, setShowResults] = React.useState(false);

  const [state, dispatch] = useReducer<Reducer<FormState, FormAction>>(
    formReducer,
    initialFormState
  );

  const submitForm = () => {
    setShowResults(true);
  };

  const resetForm = () => {
    dispatch(resetFormState());
    setProgress(0);
    setShowResults(false);
  };

  const updateProgressAfterCheckboxChange = (
    index: number,
    checked: boolean
  ) => {
    const current = state.source;
    let prog = progress;
    let selected: FormSelection = {
      saved: index === 0 ? checked : state.source.saved,
      tracks: index === 1 ? checked : state.source.tracks,
      artists: index === 2 ? checked : state.source.artists,
      recommended: index === 3 ? checked : state.source.recommended
    };
    if (
      selected.artists === false &&
      selected.recommended === false &&
      selected.tracks === false &&
      selected.saved === false
    ) {
      prog--;
    } else if (
      current.artists === false &&
      current.recommended === false &&
      current.tracks === false &&
      current.saved === false
    ) {
      prog++;
    }
    setProgress(prog);
  };

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
                size={size}
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
            margin="small"
            fill="vertical"
            flex
            justify="center"
            overflow="auto"
          >
            <Box
              fill
              flex
              justify={size !== 'large' ? 'between' : 'evenly'}
              align="center"
              border={{
                side: 'all',
                size: 'xlarge',
                style: 'outset',
                color: 'accent-1'
              }}
              background={{ color: '#2F3E4D', opacity: 0.7 }}
              round="large"
              margin={size === 'small' ? 'small' : undefined}
              pad={{
                horizontal: size !== 'small' ? 'medium' : 'small'
              }}
            >
              {showResults ? (
                <Results size={size} {...state} resetForm={resetForm} />
              ) : (
                <Box justify="between" align="center" flex fill>
                  <Heading
                    textAlign="center"
                    margin="none"
                    size={size !== 'small' ? 'medium' : 'small'}
                  >
                    new queue
                  </Heading>
                  <Box fill justify="evenly" align="center" gap="medium">
                    <Box gap="small" align="center">
                      <Text
                        textAlign="center"
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
                                  state.mood === i ? 'accent-3' : 'accent-1'
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
                                  state.mood === i ? 'accent-1' : 'light-2'
                                }
                                gap="xsmall"
                                onClick={() => {
                                  let prog = progress;
                                  let index = i;
                                  if (state.mood === -1) prog++;
                                  if (state.mood === i) {
                                    prog--;
                                    index = -1;
                                  }
                                  dispatch(update('mood', index));
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
                        size={size !== 'small' ? 'medium' : 'small'}
                      >
                        number of songs:{' '}
                        <Text
                          textAlign="center"
                          color="accent-1"
                          size={size !== 'small' ? 'medium' : 'small'}
                        >
                          {state.numSongs}
                        </Text>
                      </Text>
                      <Box direction="row" align="center" gap="small">
                        {size !== 'small' && (
                          <Button
                            icon={
                              <Subtract
                                size={size !== 'small' ? 'medium' : 'small'}
                              />
                            }
                            style={{ borderRadius: 30 }}
                            onClick={() => {
                              let num = state.numSongs;
                              let prog = progress;
                              if (num - 1 === 0) prog--;
                              if (num - 1 >= 0) num--;
                              setProgress(prog);
                              dispatch(update('numSongs', num));
                            }}
                          />
                        )}
                        <RangeInput
                          max={50}
                          min={0}
                          step={1}
                          name="number of songs:"
                          value={state.numSongs}
                          onChange={(event) => {
                            let prog = progress;
                            const value = +event.target.value;
                            if (value > 0 && state.numSongs === 0) prog++;
                            else if (value === 0) prog--;
                            setProgress(prog);
                            dispatch(update('numSongs', value));
                          }}
                        />
                        {size !== 'small' && (
                          <Button
                            icon={
                              <Add
                                size={size !== 'small' ? 'medium' : 'small'}
                              />
                            }
                            style={{ borderRadius: 30 }}
                            onClick={() => {
                              let num = state.numSongs;
                              let prog = progress;
                              if (num === 0) prog++;
                              if (num + 1 <= 50) num++;
                              setProgress(prog);
                              dispatch(update('numSongs', num));
                            }}
                          />
                        )}
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
                        size={size !== 'small' ? 'medium' : 'small'}
                      >
                        choose from your:
                      </Text>
                      <Box gap="small">
                        <CheckBox
                          label={
                            <Box>
                              <Text
                                size={size !== 'small' ? 'medium' : 'xsmall'}
                              >
                                saved songs
                              </Text>
                            </Box>
                          }
                          checked={state.source.saved}
                          onChange={(event) => {
                            updateProgressAfterCheckboxChange(
                              0,
                              event.target.checked
                            );
                            dispatch(
                              updateSourceSelection(
                                'saved',
                                event.target.checked
                              )
                            );
                          }}
                        />
                        <CheckBox
                          label={
                            <Box>
                              <Text
                                size={size !== 'small' ? 'medium' : 'xsmall'}
                              >
                                top tracks
                              </Text>
                            </Box>
                          }
                          checked={state.source.tracks}
                          onChange={(event) => {
                            updateProgressAfterCheckboxChange(
                              1,
                              event.target.checked
                            );
                            dispatch(
                              updateSourceSelection(
                                'tracks',
                                event.target.checked
                              )
                            );
                          }}
                        />
                        <CheckBox
                          label={
                            <Box>
                              <Text
                                size={size !== 'small' ? 'medium' : 'xsmall'}
                              >
                                top artists
                              </Text>
                            </Box>
                          }
                          checked={state.source.artists}
                          onChange={(event) => {
                            updateProgressAfterCheckboxChange(
                              2,
                              event.target.checked
                            );
                            dispatch(
                              updateSourceSelection(
                                'artists',
                                event.target.checked
                              )
                            );
                          }}
                        />
                        <CheckBox
                          label={
                            <Box>
                              <Text
                                size={size !== 'small' ? 'medium' : 'xsmall'}
                              >
                                recommended
                              </Text>
                            </Box>
                          }
                          checked={state.source.recommended}
                          onChange={(event) => {
                            updateProgressAfterCheckboxChange(
                              3,
                              event.target.checked
                            );
                            dispatch(
                              updateSourceSelection(
                                'recommended',
                                event.target.checked
                              )
                            );
                          }}
                        />
                      </Box>
                    </Box>
                  </Box>
                  <Button
                    margin="small"
                    hoverIndicator={size !== 'small' ? 'accent-1' : false}
                    alignSelf="center"
                    primary={size === 'small'}
                    disabled={progress !== 3}
                    label="continue"
                    onClick={submitForm}
                    size={size}
                    icon={
                      <Spotify size={size !== 'large' ? 'medium' : 'large'} />
                    }
                  />
                </Box>
              )}
            </Box>
          </Box>
          {size === 'small' && (
            <Box align="center">
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
