import React, { FunctionComponent } from 'react';
import { Box, Text } from 'grommet';
import { Emoji } from 'grommet-icons';
import { useForm } from '../../common/hooks/useForm';

const icons = ['happy', 'euphoric', 'excited', 'sad', 'depressed', 'angry'];

interface MoodSelectionProps {
  size: string;
}

const MoodSelection: FunctionComponent<MoodSelectionProps> = (props) => {
  const { size } = props;
  const { moodIndex, setMood, progress, setProgress } = useForm();

  return (
    <Box gap="medium" align="center">
      <Text textAlign="center" weight="bold" size={size}>
        your mood...
      </Text>
      <Box
        direction={size === 'small' ? 'column' : 'row'}
        gap="small"
        overflow={
          size === 'small'
            ? { vertical: 'auto', horizontal: 'hidden' }
            : { vertical: 'hidden', horizontal: 'auto' }
        }
      >
        {icons.map((icon, i) => (
          <Box
            hoverIndicator={moodIndex === i ? 'accent-3' : 'accent-1'}
            round
            pad={{ horizontal: 'small', vertical: 'xsmall' }}
            align="center"
            background={moodIndex === i ? 'accent-1' : 'light-2'}
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
            <Text size="xsmall" weight="bold" textAlign="center">
              {icon}
            </Text>
            <Emoji color="brand" size={size !== 'large' ? size : 'medium'} />
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default MoodSelection;
