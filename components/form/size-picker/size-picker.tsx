import { Box, Button, RangeInput, Text } from 'grommet';
import { Add, Subtract } from 'grommet-icons';
import React, { FunctionComponent } from 'react';
import { FormAction, update } from '../reducer';

interface SizePickerProps {
  progress: number;
  numSongs: number;
  size: string;
  setProgress(prog: number): void;
  dispatch(value: FormAction): void;
}

const SizePicker: FunctionComponent<SizePickerProps> = (props) => {
  const { size, numSongs, progress, setProgress, dispatch } = props;
  return (
    <Box gap="xsmall" fill="horizontal">
      <Text textAlign="center" size={size !== 'small' ? 'medium' : 'small'}>
        number of songs:{' '}
        <Text
          textAlign="center"
          color="accent-1"
          size={size !== 'small' ? 'medium' : 'small'}
        >
          {numSongs}
        </Text>
      </Text>
      <Box direction="row" align="center" gap="small">
        {size !== 'small' && (
          <Button
            icon={<Subtract size={size !== 'small' ? 'medium' : 'small'} />}
            style={{ borderRadius: 30 }}
            onClick={() => {
              let num = numSongs;
              let prog = progress;
              if (num - 1 === 0) prog--;
              if (num - 1 >= 0) num--;
              setProgress(prog);
              dispatch(update('numSongs', num));
            }}
          />
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
            dispatch(update('numSongs', value));
          }}
        />
        {size !== 'small' && (
          <Button
            icon={<Add size={size !== 'small' ? 'medium' : 'small'} />}
            style={{ borderRadius: 30 }}
            onClick={() => {
              let num = numSongs;
              let prog = progress;
              if (num === 0) prog++;
              if (num + 1 <= 50) num++;
              setProgress(prog);
              dispatch(update('numSongs', num));
            }}
          />
        )}
      </Box>
    </Box>
  );
};

export default SizePicker;
