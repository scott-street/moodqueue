import React, { FunctionComponent, Reducer, useReducer } from 'react';
import {
  Box,
  Heading,
  Avatar,
  Header,
  Text,
  Button,
  ResponsiveContext
} from 'grommet';
import { Spotify, User } from 'grommet-icons';
import { UserInfo, defaultUser } from '../../types/UserInfo';
import { Results } from '../results';
import {
  formReducer,
  initialFormState,
  FormState,
  FormAction,
  resetFormState,
  update
} from './reducer';
import { MoodSelection } from './mood-selection';
import { SizePicker } from './size-picker';
import { SourceSelection } from './souce';

interface FormProps {
  user: UserInfo;
}

const Form: FunctionComponent<FormProps> = (props) => {
  const name = props.user.name ? props.user.name.toLowerCase() : 'stranger';

  const [state, dispatch] = useReducer<Reducer<FormState, FormAction>>(
    formReducer,
    initialFormState
  );

  const submitForm = () => {
    dispatch(update('showResults', true));
  };

  const resetForm = () => {
    dispatch(resetFormState());
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
              {state.showResults ? (
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
                    <MoodSelection
                      size={size}
                      moodIndex={state.mood}
                      progress={state.progress}
                      dispatch={(value) => dispatch(value)}
                    />
                    <SizePicker
                      size={size}
                      numSongs={state.numSongs}
                      progress={state.progress}
                      dispatch={(value) => dispatch(value)}
                    />
                    <SourceSelection
                      size={size}
                      source={state.source}
                      progress={state.progress}
                      dispatch={(value) => dispatch(value)}
                    />
                  </Box>
                  <Button
                    margin="small"
                    hoverIndicator={size !== 'small' ? 'accent-1' : false}
                    alignSelf="center"
                    primary={size === 'small' || state.progress === 3}
                    disabled={state.progress !== 3}
                    label="continue"
                    onClick={submitForm}
                    size={
                      size === 'large'
                        ? 'large'
                        : size === 'medium'
                        ? 'medium'
                        : 'small'
                    }
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
