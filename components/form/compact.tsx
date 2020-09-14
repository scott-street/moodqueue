import React, { FunctionComponent } from 'react';
import { Box, Button, Heading, Meter } from 'grommet';
import { Spotify } from 'grommet-icons';
import MoodSelection from './components/mood-selection';
import SizePicker from './components/size-picker';
import SourceSelection from './components/source-selection';
import { FormAction } from './hooks/reducer';
import { Mood } from '../../types/Mood';
import { FormSelection } from '../../types/FormSelection';

interface CompactFormProps {
  moodIndex: Mood;
  numSongs: number;
  source: FormSelection;
  progress: number;
  setProgress(prog: number): void;
  submitForm(): void;
  dispatch(value: FormAction): void;
}

const CompactForm: FunctionComponent<CompactFormProps> = (props) => {
  const {
    moodIndex,
    numSongs,
    source,
    progress,
    setProgress,
    submitForm,
    dispatch
  } = props;

  return (
    <Box justify="evenly" align="center" fill>
      <Heading textAlign="center" margin="none">
        new queue
      </Heading>
      <Box gap="small" align="center">
        <MoodSelection
          size="large"
          moodIndex={moodIndex}
          progress={progress}
          setProgress={(prog) => setProgress(prog)}
          dispatch={(value) => dispatch(value)}
        />
        <Box fill="horizontal">
          <SizePicker
            size="large"
            numSongs={numSongs}
            progress={progress}
            setProgress={(prog) => setProgress(prog)}
            dispatch={(value) => dispatch(value)}
          />
        </Box>
        <Box direction="row" align="start" fill="horizontal" justify="evenly">
          <SourceSelection
            size="large"
            source={source}
            progress={progress}
            setProgress={(prog) => setProgress(prog)}
            dispatch={(value) => dispatch(value)}
          />
        </Box>
      </Box>
      <Box
        animation={
          progress === 3 ? { type: 'pulse', duration: 500 } : undefined
        }
      >
        {progress === 3 ? (
          <Button
            margin="xsmall"
            hoverIndicator="accent-1"
            alignSelf="center"
            disabled={progress !== 3}
            label="continue"
            onClick={submitForm}
            icon={<Spotify />}
          />
        ) : (
          <Meter
            margin="small"
            thickness="medium"
            alignSelf="center"
            round
            values={[
              {
                value: Math.ceil((progress / 3) * 100)
              }
            ]}
          />
        )}
      </Box>
    </Box>
  );
};

export default CompactForm;
