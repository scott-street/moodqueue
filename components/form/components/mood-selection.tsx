import React, { FunctionComponent } from 'react';
import { Box, Text } from 'grommet';
import { EmotionHappy as Happy } from '@styled-icons/remix-fill/EmotionHappy';
import { EmotionSad as Sad } from '@styled-icons/remix-fill/EmotionSad';
import { Mood } from '../../../types/Mood';
import { FormAction, update } from '../hooks/reducer';
import { motion } from 'framer-motion';

interface MoodSelectionProps {
  size: string;
  moodIndex: Mood;
  progress: number;
  dispatch(value: FormAction): void;
  setProgress(prog: number): void;
}

const MoodSelection: FunctionComponent<MoodSelectionProps> = (props) => {
  const { size, moodIndex, progress, setProgress, dispatch } = props;

  return (
    <Box gap="medium" align="center">
      <Text textAlign="center" size={size}>
        what music are you in the mood for?
      </Text>
      <Box direction="row" gap="small" overflow="hidden" pad="small">
        {Object.keys(Mood).map(
          (mood, i) =>
            isNaN(Number(Mood[mood])) && (
              <motion.div
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                key={i}
              >
                <Box
                  hoverIndicator={moodIndex === i ? 'accent-3' : 'accent-1'}
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
                  background={moodIndex === i ? 'accent-1' : 'light-2'}
                  gap="xsmall"
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
                >
                  {size !== 'small' && (
                    <Text size="xsmall" weight="bold" textAlign="center">
                      {Mood[mood].toLowerCase()}
                    </Text>
                  )}
                  {mood === Mood.HAPPY.toString() ? (
                    <Happy width="32px" height="32px" />
                  ) : (
                    <Sad width="32px" height="32px" />
                  )}
                </Box>
              </motion.div>
            )
        )}
      </Box>
    </Box>
  );
};

export default MoodSelection;
