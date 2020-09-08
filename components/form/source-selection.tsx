import React, { FunctionComponent } from 'react';
import { Box, Text, CheckBox } from 'grommet';
import { motion } from 'framer-motion';
import { FormSelection } from '../../types/FormSelection';
import { useForm } from '../../common/hooks/useForm';

interface SourceSelectionProps {
  size: string;
}

const SourceSelection: FunctionComponent<SourceSelectionProps> = (props) => {
  const { size } = props;
  const { selection, setSelection, progress, setProgress } = useForm();

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
            onChange={(event) => {
              const current = selection;
              let prog = progress;
              let selected: FormSelection = {
                saved: event.target.checked,
                artists: selection.artists,
                tracks: selection.tracks,
                recommended: selection.recommended
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
              setSelection(selected);
            }}
            checked={selection.saved}
            label={
              <Box>
                <Text size={size}>saved songs</Text>
              </Box>
            }
          />
        </motion.div>
        <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
          <CheckBox
            checked={selection.recommended}
            onChange={(event) => {
              const current = selection;
              let prog = progress;
              let selected: FormSelection = {
                saved: selection.saved,
                artists: selection.artists,
                tracks: selection.tracks,
                recommended: event.target.checked
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
              setSelection(selected);
            }}
            label={
              <Box>
                <Text size={size}>recommended</Text>
              </Box>
            }
          />
        </motion.div>
        <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
          <CheckBox
            onChange={(event) => {
              const current = selection;
              let prog = progress;
              let selected: FormSelection = {
                saved: selection.saved,
                artists: selection.artists,
                tracks: event.target.checked,
                recommended: selection.recommended
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
              setSelection(selected);
            }}
            checked={selection.tracks}
            label={
              <Box>
                <Text size={size}>top tracks</Text>
              </Box>
            }
          />
        </motion.div>
        <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
          <CheckBox
            onChange={(event) => {
              const current = selection;
              let prog = progress;
              let selected: FormSelection = {
                saved: selection.saved,
                artists: event.target.checked,
                tracks: selection.tracks,
                recommended: selection.recommended
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
              setSelection(selected);
            }}
            checked={selection.artists}
            label={
              <Box>
                <Text size={size}>top artists</Text>
              </Box>
            }
          />
        </motion.div>
      </Box>
    </Box>
  );
};

export default SourceSelection;
