import React, { FunctionComponent, Reducer, useReducer } from 'react';
import { Box, Heading, Avatar, Header, Text, ResponsiveContext } from 'grommet';
import { User } from 'grommet-icons';
import { UserInfo, defaultUser } from '../../types/UserInfo';
import MobileForm from './mobile';
import CompactForm from './compact';
import { motion } from 'framer-motion';
import { baseContainer, baseItem } from '../../common/motion';
import {
  FormState,
  FormAction,
  formReducer,
  initialFormState,
  resetFormState
} from './hooks/reducer';
import Results from '../results';

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

  return (
    <ResponsiveContext.Consumer>
      {(size) => (
        <motion.div
          style={{ width: '100%', height: '100%' }}
          className="container"
          variants={baseContainer}
          initial="hidden"
          animate="visible"
        >
          <Box fill justify="between">
            <Header
              justify={size !== 'small' ? 'evenly' : 'center'}
              direction={size !== 'small' ? 'row' : 'column'}
            >
              <Box border="between" gap="small">
                <Heading
                  textAlign={size !== 'small' ? 'start' : 'center'}
                  size={size}
                  margin="none"
                >
                  moodqueue
                </Heading>
                <Text
                  textAlign={size !== 'small' ? 'start' : 'center'}
                  size={size}
                >
                  let your mood inspire you
                </Text>
              </Box>
              {size !== 'small' && (
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <Box direction="row" align="center" gap="small">
                    <Heading textAlign="center" margin="none" size="small">
                      {name}
                    </Heading>
                    {props.user.profileImages[0] ? (
                      <Avatar
                        src={props.user.profileImages[0].url}
                        size={size !== 'large' ? 'large' : 'xlarge'}
                        border={{
                          size: 'small',
                          side: 'all',
                          color: 'accent-1'
                        }}
                        onClick={() =>
                          window.open(props.user.profileUrl, '_blank')
                        }
                        title="click to open your spotify profile"
                      />
                    ) : (
                      <Avatar
                        background="accent-2"
                        border={{
                          size: 'small',
                          side: 'all',
                          color: 'accent-1'
                        }}
                        size={size !== 'large' ? 'large' : 'xlarge'}
                        onClick={() =>
                          window.open(props.user.profileUrl, '_blank')
                        }
                        title="click to open your spotify profile"
                      >
                        <User color="accent-1" size="large" />
                      </Avatar>
                    )}
                  </Box>
                </motion.div>
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
                <motion.div
                  className="item"
                  variants={baseItem}
                  style={{ width: '100%', height: '100%' }}
                >
                  {showResults ? (
                    <Results size={size} {...state} resetForm={resetForm} />
                  ) : (
                    <Box
                      align="center"
                      fill
                      pad={size === 'large' ? 'none' : 'xsmall'}
                    >
                      {size !== 'large' ? (
                        <MobileForm
                          size={size}
                          moodIndex={state.mood}
                          numSongs={state.numSongs}
                          source={state.source}
                          progress={progress}
                          setProgress={(prog) => setProgress(prog)}
                          submitForm={submitForm}
                          resetForm={resetForm}
                          dispatch={(value) => dispatch(value)}
                        />
                      ) : (
                        <CompactForm
                          moodIndex={state.mood}
                          numSongs={state.numSongs}
                          source={state.source}
                          progress={progress}
                          setProgress={(prog) => setProgress(prog)}
                          submitForm={submitForm}
                          dispatch={(value) => dispatch(value)}
                        />
                      )}
                    </Box>
                  )}
                </motion.div>
              </Box>
            </Box>
            {size === 'small' && (
              <Box align="center">
                {props.user.profileImages[0] ? (
                  <Avatar
                    src={props.user.profileImages[0].url}
                    border={{ size: 'xsmall', side: 'all', color: 'accent-1' }}
                    onClick={() => window.open(props.user.profileUrl, '_blank')}
                    title="click to open your spotify profile"
                  />
                ) : (
                  <Avatar
                    background="accent-2"
                    border={{ size: 'xsmall', side: 'all', color: 'accent-1' }}
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
        </motion.div>
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
