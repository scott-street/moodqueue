import { Box, Text } from 'grommet';
import { EmotionHappy as Happy } from '@styled-icons/remix-fill/EmotionHappy';
import { EmotionSad as Sad } from '@styled-icons/remix-fill/EmotionSad';
import { Bed as Sleepy } from '@styled-icons/boxicons-regular/Bed';
import { GlassCheers as Party } from '@styled-icons/fa-solid/GlassCheers';
import React, { FunctionComponent } from 'react';
import { Mood } from '../../../types/Mood';
import { FormAction, update } from '../reducer';

interface MoodSelectionProps {
  progress: number;
  moodIndex: number;
  size: string;
  setProgress(prog: number): void;
  dispatch(value: FormAction): void;
}

const MoodSelection: FunctionComponent<MoodSelectionProps> = (props) => {
  const { size, moodIndex, progress, setProgress, dispatch } = props;
  return (
    <Box gap="small" align="center">
      <Text textAlign="center" size={size !== 'small' ? 'medium' : 'small'}>
        what music are you in the mood for?
      </Text>
      <Box direction="row" gap="small" overflow={{ horizontal: 'auto' }}>
        {Object.keys(Mood).map(
          (mood, i) =>
            isNaN(Number(Mood[mood])) && (
              <Box
                hoverIndicator={moodIndex === i ? 'accent-3' : 'accent-1'}
                style={{
                  borderTopLeftRadius: 30,
                  borderTopRightRadius: 30,
                  borderBottomLeftRadius: 30,
                  outline: 'none'
                }}
                pad={{
                  horizontal: 'medium',
                  vertical: 'xsmall'
                }}
                align="center"
                background={moodIndex === i ? 'accent-1' : 'light-2'}
                gap="xsmall"
                focusIndicator={false}
                onClick={() => {
                  let prog = progress;
                  let index = i;
                  if (moodIndex === -1) prog++;
                  if (moodIndex === i) {
                    prog--;
                    index = -1;
                  }
                  dispatch(update('mood', index));
                  setProgress(prog);
                }}
                key={i}
              >
                {size !== 'small' && (
                  <Text size="xsmall" weight="bold" textAlign="center">
                    {Mood[mood].toLowerCase()}
                  </Text>
                )}
                {mood === Mood.HAPPY.toString() ? (
                  <Happy width="32px" height="32px" />
                ) : mood === Mood.SLEEPY.toString() ? (
                  <Sleepy width="32px" height="32px" />
                ) : mood === Mood.PARTY.toString() ? (
                  <Party width="32px" height="32px" />
                ) : (
                  <Sad width="32px" height="32px" />
                )}
              </Box>
            )
        )}
      </Box>
    </Box>
  );
};

export default MoodSelection;
