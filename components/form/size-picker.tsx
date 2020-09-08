import React, { FunctionComponent } from 'react';
import { Box, Text, Button, RangeInput } from 'grommet';
import { Subtract, Add } from 'grommet-icons';
import { motion } from 'framer-motion';
import { useForm } from '../../common/hooks/useForm';

interface SizePickerProps {
  size: string;
}

const SizePicker: FunctionComponent<SizePickerProps> = (props) => {
  const { size } = props;
  const { numSongs, setNumSongs, progress, setProgress } = useForm();

  return (
    <Box gap="small" align="center" flex justify="center">
      {size === 'small' ? (
        <Text textAlign="center" weight="bold" size={size}>
          pick a number between 1 - 50
        </Text>
      ) : (
        <Text textAlign="center" size={size}>
          number of songs:{' '}
          <Text weight="bold" textAlign="center" color="accent-1" size={size}>
            {numSongs}
          </Text>
        </Text>
      )}
      <Box
        direction="row"
        gap="small"
        width={size === 'medium' ? 'medium' : undefined}
        fill={size === 'large' ? 'horizontal' : undefined}
        align="center"
        margin={{ vertical: size !== 'large' ? 'small' : undefined }}
      >
        {size !== 'small' && (
          <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
            <Button
              disabled={numSongs === 0}
              icon={<Subtract size={size !== 'large' ? size : 'medium'} />}
              style={{ borderRadius: 30 }}
              onClick={() => {
                let num = numSongs;
                let prog = progress;
                if (num - 1 === 0) prog--;
                num--;
                setProgress(prog);
                setNumSongs(num);
              }}
            />
          </motion.div>
        )}
        <RangeInput
          max={50}
          min={0}
          step={1}
          name="number of songs:"
          value={numSongs}
          onChange={(event) => {
            let prog = progress;
            const value = +event.target.value;
            if (value > 0 && numSongs === 0) prog++;
            else if (value === 0) prog--;
            setProgress(prog);
            setNumSongs(value);
          }}
        />
        {size !== 'small' && (
          <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
            <Button
              disabled={numSongs === 50}
              icon={<Add size={size !== 'large' ? size : 'medium'} />}
              style={{ borderRadius: 30 }}
              onClick={() => {
                let num = numSongs;
                let prog = progress;
                if (num === 0) prog++;
                num++;
                setProgress(prog);
                setNumSongs(num);
              }}
            />
          </motion.div>
        )}
      </Box>
      {size === 'small' && (
        <Text textAlign="center" size={size}>
          number of songs:{' '}
          <Text weight="bold" textAlign="center" color="accent-1" size={size}>
            {numSongs}
          </Text>
        </Text>
      )}
    </Box>
  );
};

export default SizePicker;
