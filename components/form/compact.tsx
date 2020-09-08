import React, { FunctionComponent } from 'react';
import { Box, Button, Meter } from 'grommet';
import { Spotify } from 'grommet-icons';
import QueueTitle from './queue-title';
import MoodSelection from './mood-selection';
import SizePicker from './size-picker';
import SourceSelection from './source-selection';
import { useForm } from '../../common/hooks/useForm';

interface CompactFormProps {
  size: string;
}

const CompactForm: FunctionComponent<CompactFormProps> = (props) => {
  const { size } = props;
  const { progress } = useForm();

  return (
    <Box justify={size !== 'large' ? 'between' : 'evenly'} align="center" fill>
      <QueueTitle size={size} />
      <Box gap="small" align="center">
        <MoodSelection size={size} />
        <Box fill="horizontal">
          <SizePicker size={size} />
        </Box>
        <Box direction="row" align="start" fill="horizontal" justify="evenly">
          <SourceSelection size={size} />
        </Box>
      </Box>
      <Box
        animation={
          progress === 4 ? { type: 'pulse', duration: 500 } : undefined
        }
      >
        {progress === 4 ? (
          <Button
            hoverIndicator="accent-1"
            alignSelf="center"
            label="continue"
            size="large"
            icon={<Spotify size="medium" />}
          />
        ) : (
          <Meter
            margin="small"
            thickness="medium"
            alignSelf="center"
            round
            values={[
              {
                value: Math.ceil((progress / 4) * 100)
              }
            ]}
          />
        )}
      </Box>
    </Box>
  );
};

export default CompactForm;
