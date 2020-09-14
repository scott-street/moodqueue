import React, { FunctionComponent, useState, useEffect } from 'react';
import { Box, Button, Meter, Layer, Heading } from 'grommet';
import {
  Previous,
  Next,
  RadialSelected,
  Radial,
  Spotify,
  FormPrevious,
  FormNext,
  FormClose,
  Erase
} from 'grommet-icons';
import { motion } from 'framer-motion';
import MoodSelection from './components/mood-selection';
import SizePicker from './components/size-picker';
import SourceSelection from './components/source-selection';
import { pageVariants } from '../../common/motion';
import { FormSelection } from '../../types/FormSelection';
import { Mood } from '../../types/Mood';
import { FormAction } from './hooks/reducer';

interface MobileFormProps {
  size: string;
  moodIndex: Mood;
  numSongs: number;
  source: FormSelection;
  progress: number;
  setProgress(prog: number): void;
  submitForm(): void;
  resetForm(): void;
  dispatch(value: FormAction): void;
}

const MobileForm: FunctionComponent<MobileFormProps> = (props) => {
  const {
    size,
    moodIndex,
    numSongs,
    source,
    progress,
    setProgress,
    submitForm,
    resetForm,
    dispatch
  } = props;
  const [pageIndex, setPageIndex] = useState(0);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (progress === 3) {
      setVisible(true);
    }
  }, [progress]);

  return (
    <Box justify="between" fill flex>
      <Heading textAlign="center" margin="none" size={size}>
        new queue
      </Heading>
      <Box align="center" justify="between" direction="row" fill="horizontal">
        <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
          <Button
            icon={
              size === 'medium' ? (
                <Previous />
              ) : (
                <FormPrevious color="accent-1" />
              )
            }
            alignSelf="center"
            hoverIndicator={size === 'medium' ? 'accent-3' : undefined}
            style={{ borderRadius: 30 }}
            primary={size === 'medium'}
            onClick={() => {
              let i = pageIndex;
              if (i !== 0) {
                i--;
                setPageIndex(i);
              }
            }}
            disabled={pageIndex === 0}
          />
        </motion.div>
        {pageIndex === 0 && (
          <motion.div
            initial="hidden"
            animate="visible"
            variants={pageVariants}
            transition={{ ease: 'easeOut', duration: 2 }}
          >
            <MoodSelection
              size={size}
              moodIndex={moodIndex}
              progress={progress}
              setProgress={(prog) => setProgress(prog)}
              dispatch={(value) => dispatch(value)}
            />
          </motion.div>
        )}
        {pageIndex === 1 && (
          <motion.div
            initial="hidden"
            animate="visible"
            variants={pageVariants}
            transition={{ ease: 'easeOut', duration: 2 }}
          >
            <SizePicker
              size={size}
              numSongs={numSongs}
              progress={progress}
              setProgress={(prog) => setProgress(prog)}
              dispatch={(value) => dispatch(value)}
            />
          </motion.div>
        )}
        {pageIndex === 2 && (
          <motion.div
            initial="hidden"
            animate="visible"
            variants={pageVariants}
            transition={{ ease: 'easeOut', duration: 2 }}
          >
            <SourceSelection
              size={size}
              source={source}
              progress={progress}
              setProgress={(prog) => setProgress(prog)}
              dispatch={(value) => dispatch(value)}
            />
          </motion.div>
        )}
        {progress === 3 && visible && (
          <Layer
            responsive={false}
            position="top"
            modal={false}
            style={{
              borderBottomRightRadius: 30,
              borderBottomLeftRadius: 30,
              background: 'transparent',
              width: '100%'
            }}
            onClickOutside={() => setVisible(false)}
          >
            <Box
              elevation="large"
              round={{ corner: 'bottom' }}
              pad="small"
              gap={size === 'small' ? 'small' : 'xsmall'}
              justify="center"
              background={{
                color: '#2F3E4D',
                opacity: size === 'medium' ? 'medium' : 'strong'
              }}
              border={{
                color: 'accent-3',
                size: 'large',
                side: 'bottom',
                style: 'groove'
              }}
              align="center"
              animation={
                progress === 3 && size === 'medium'
                  ? { type: 'pulse', duration: 500 }
                  : undefined
              }
            >
              <Button
                margin={{ top: 'xsmall' }}
                alignSelf="center"
                label="continue"
                onClick={submitForm}
                primary
                icon={<Spotify />}
              />
              <Button label="reset" icon={<Erase />} onClick={resetForm} />
              <Button
                focusIndicator={false}
                icon={<FormClose />}
                style={{ borderRadius: 30 }}
                onClick={() => setVisible(false)}
                title="cancel"
                alignSelf="center"
              />
            </Box>
          </Layer>
        )}
        <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
          <Button
            onClick={() => {
              let i = pageIndex;
              if (i !== 2) {
                i++;
                setPageIndex(i);
              }
            }}
            alignSelf="center"
            disabled={pageIndex === 2}
            icon={size === 'medium' ? <Next /> : <FormNext color="accent-1" />}
            hoverIndicator={size === 'medium' ? 'accent-3' : undefined}
            style={{ borderRadius: 30 }}
            primary={props.size === 'medium'}
          />
        </motion.div>
      </Box>
      <Box align="center" pad="small" gap="small">
        <Box direction="row" align="center" gap="medium">
          <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
            <Button
              title="mood selection"
              onClick={() => setPageIndex(0)}
              icon={
                pageIndex === 0 ? (
                  <RadialSelected color="accent-1" size={size} />
                ) : (
                  <Radial size={size} />
                )
              }
              style={{ borderRadius: 30 }}
              focusIndicator={false}
              hoverIndicator={
                pageIndex === 0 ? false : size === 'medium' && 'accent-1'
              }
            />
          </motion.div>
          <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
            <Button
              title=""
              onClick={() => setPageIndex(1)}
              icon={
                pageIndex === 1 ? (
                  <RadialSelected color="accent-1" size={size} />
                ) : (
                  <Radial size={size} />
                )
              }
              hoverIndicator={
                pageIndex === 1 ? false : size === 'medium' && 'accent-1'
              }
              style={{ borderRadius: 30 }}
              focusIndicator={false}
            />
          </motion.div>
          <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
            <Button
              onClick={() => setPageIndex(2)}
              icon={
                pageIndex === 2 ? (
                  <RadialSelected color="accent-1" size={size} />
                ) : (
                  <Radial size={size} />
                )
              }
              hoverIndicator={
                pageIndex === 2 ? false : size === 'medium' && 'accent-1'
              }
              style={{ borderRadius: 30 }}
              focusIndicator={false}
            />
          </motion.div>
        </Box>
        <Meter
          thickness={size === 'medium' ? 'small' : 'xsmall'}
          alignSelf="center"
          size={size === 'small' ? 'xsmall' : 'small'}
          round
          values={[
            {
              value: Math.ceil((progress / 4) * 100)
            }
          ]}
        />
      </Box>
    </Box>
  );
};

export default MobileForm;
