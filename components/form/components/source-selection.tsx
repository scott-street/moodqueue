import React, { FunctionComponent } from 'react';
import { Box, Text, CheckBox } from 'grommet';
import { motion } from 'framer-motion';
import { FormSelection } from '../../../types/FormSelection';
import { FormAction, updateSourceSelection } from '../hooks/reducer';

interface SourceSelectionProps {
  size: string;
  source: FormSelection;
  progress: number;
  dispatch(value: FormAction): void;
  setProgress(prog: number): void;
}

const SourceSelection: FunctionComponent<SourceSelectionProps> = (props) => {
  const { size, source, progress, setProgress, dispatch } = props;

  const updateProgressAfterCheckboxChange = (
    index: number,
    checked: boolean
  ) => {
    const current = source;
    let prog = progress;
    let selected: FormSelection = {
      saved: index === 0 ? checked : source.saved,
      tracks: index === 1 ? checked : source.tracks,
      artists: index === 2 ? checked : source.artists,
      recommended: index === 3 ? checked : source.recommended
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
    <Box
      direction={size === 'medium' || size === 'large' ? 'row' : 'column'}
      align={size === 'medium' || size === 'large' ? 'start' : 'center'}
      justify={size !== 'large' ? 'center' : 'evenly'}
      flex
      gap={size !== 'large' ? 'large' : 'none'}
    >
      <Text textAlign="center" weight="bold" size={size}>
        choose from your:
      </Text>
      <Box gap="small">
        <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
          <CheckBox
            checked={source.saved}
            onChange={(event) => {
              updateProgressAfterCheckboxChange(0, event.target.checked);
              dispatch(updateSourceSelection('saved', event.target.checked));
            }}
            label={
              <Box>
                <Text size={size}>saved songs</Text>
              </Box>
            }
          />
        </motion.div>
        <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
          <CheckBox
            checked={source.tracks}
            onChange={(event) => {
              updateProgressAfterCheckboxChange(1, event.target.checked);
              dispatch(updateSourceSelection('tracks', event.target.checked));
            }}
            label={
              <Box>
                <Text size={size}>top tracks</Text>
              </Box>
            }
          />
        </motion.div>
        <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
          <CheckBox
            checked={source.artists}
            onChange={(event) => {
              updateProgressAfterCheckboxChange(2, event.target.checked);
              dispatch(updateSourceSelection('artists', event.target.checked));
            }}
            label={
              <Box>
                <Text size={size}>top artists</Text>
              </Box>
            }
          />
        </motion.div>
        <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
          <CheckBox
            checked={source.recommended}
            onChange={(event) => {
              updateProgressAfterCheckboxChange(3, event.target.checked);
              dispatch(
                updateSourceSelection('recommended', event.target.checked)
              );
            }}
            label={
              <Box>
                <Text size={size}>recommended</Text>
              </Box>
            }
          />
        </motion.div>
      </Box>
    </Box>
  );
};

export default SourceSelection;
