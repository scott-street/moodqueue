import React, { FunctionComponent, useState, useEffect } from 'react';
import { Box, Button, Meter, Layer } from 'grommet';
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
import QueueTitle from './queue-title';
import MoodSelection from './mood-selection';
import SizePicker from './size-picker';
import SourceSelection from './source-selection';
import { pageVariants } from '../motion';
import { useForm } from '../../common/hooks/useForm';

interface MobileFormProps {
  size: string;
}

const MobileForm: FunctionComponent<MobileFormProps> = (props) => {
  const { size } = props;
  const [index, setIndex] = useState(0);
  const [visible, setVisible] = useState(false);
  const { progress, resetForm } = useForm();

  useEffect(() => {
    if (progress === 4) {
      setVisible(true);
    }
  }, [progress]);

  return (
    <Box justify="between" fill flex>
      <QueueTitle size={size} />
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
              let i = index;
              if (i !== 0) {
                i--;
                setIndex(i);
              }
            }}
            disabled={index === 0}
          />
        </motion.div>
        {index === 0 && (
          <motion.div
            initial="hidden"
            animate="visible"
            variants={pageVariants}
            transition={{ ease: 'easeOut', duration: 2 }}
          >
            <MoodSelection size={size} />
          </motion.div>
        )}
        {index === 1 && (
          <motion.div
            initial="hidden"
            animate="visible"
            variants={pageVariants}
            transition={{ ease: 'easeOut', duration: 2 }}
          >
            <SizePicker size={size} />
          </motion.div>
        )}
        {index === 2 && (
          <motion.div
            initial="hidden"
            animate="visible"
            variants={pageVariants}
            transition={{ ease: 'easeOut', duration: 2 }}
          >
            <SourceSelection size={size} />
          </motion.div>
        )}
        {progress === 4 && visible && (
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
                progress === 4 && size === 'medium'
                  ? { type: 'pulse', duration: 500 }
                  : undefined
              }
            >
              <Button
                margin={{ top: 'xsmall' }}
                alignSelf="center"
                label="continue"
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
              let i = index;
              if (i !== 2) {
                i++;
                setIndex(i);
              }
            }}
            alignSelf="center"
            disabled={index === 2}
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
              onClick={() => setIndex(0)}
              icon={
                index === 0 ? (
                  <RadialSelected color="accent-1" size={size} />
                ) : (
                  <Radial size={size} />
                )
              }
              style={{ borderRadius: 30 }}
              focusIndicator={false}
              hoverIndicator={
                index === 0 ? false : size === 'medium' && 'accent-1'
              }
            />
          </motion.div>
          <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
            <Button
              title=""
              onClick={() => setIndex(1)}
              icon={
                index === 1 ? (
                  <RadialSelected color="accent-1" size={size} />
                ) : (
                  <Radial size={size} />
                )
              }
              hoverIndicator={
                index === 1 ? false : size === 'medium' && 'accent-1'
              }
              style={{ borderRadius: 30 }}
              focusIndicator={false}
            />
          </motion.div>
          <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
            <Button
              onClick={() => setIndex(2)}
              icon={
                index === 2 ? (
                  <RadialSelected color="accent-1" size={size} />
                ) : (
                  <Radial size={size} />
                )
              }
              hoverIndicator={
                index === 2 ? false : size === 'medium' && 'accent-1'
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
