import React, { FunctionComponent, useEffect } from 'react';
import { Box, Heading, Button, Text, Image } from 'grommet';
import {
  Previous,
  CirclePlay,
  ShareOption,
  SubtractCircle
} from 'grommet-icons';
import { Mood } from '../types/Mood';
import { FormSelection } from '../types/FormSelection';
import { useSpotify } from '../common/hooks/useSpotify';
import { Track } from '../types/Track';
import { TrackSource } from '../types/TrackSource';
import { BounceLoader } from 'react-spinners';
import { getSourcesString } from '../common/Helpers';
import { motion } from 'framer-motion';

interface ResultsProps {
  size: string;
  mood: Mood;
  numSongs: number;
  source: FormSelection;
  resetForm(): void;
}

const Results: FunctionComponent<ResultsProps> = (props) => {
  const { size, source, numSongs, mood } = props;
  const [tracks, setTracks] = React.useState<Track[] | undefined>(undefined);
  const { getQueue } = useSpotify();

  const getTrackSourceFromFormSelection = (
    formSelection: FormSelection
  ): TrackSource[] => {
    let result: TrackSource[] = [];
    if (formSelection.saved) {
      result.push(TrackSource.SAVED_SONGS);
    }
    if (formSelection.tracks) {
      result.push(TrackSource.TOP_SONGS);
    }
    if (formSelection.artists) {
      result.push(TrackSource.TOP_ARTISTS_SONGS);
    }
    if (formSelection.recommended) {
      result.push(TrackSource.RECOMMENDED_SONGS);
    }
    return result;
  };

  useEffect(() => {
    document.title = 'your queue | moodqueue';
    const trackSources = getTrackSourceFromFormSelection(source);
    getQueue(trackSources, numSongs, mood).then((data) => {
      setTracks(data);
    });
  }, []);

  return (
    <Box
      align="center"
      justify="between"
      gap="small"
      fill
      pad={{
        horizontal: 'medium',
        vertical: 'small'
      }}
    >
      <Heading textAlign="center" margin="none">
        here's your{' '}
        {props.mood >= 0
          ? Mood[props.mood].toLowerCase() + ' queue:'
          : ' queue:'}
      </Heading>
      <Box direction="row" border="between" gap="small" align="center">
        <Text textAlign="center" size={size !== 'small' ? 'medium' : 'small'}>
          {tracks ? tracks.length + ' songs' : 'loading...'}
        </Text>
        <Text textAlign="center" size={size !== 'small' ? 'medium' : 'small'}>
          based off your {getSourcesString(source)}
        </Text>
      </Box>
      <Box
        overflow={{ vertical: 'auto' }}
        gap="medium"
        alignContent="center"
        pad={{
          vertical: 'small',
          horizontal: size !== 'small' ? 'xlarge' : 'none'
        }}
        fill
      >
        {tracks ? (
          tracks.map((track, i) => (
            <Box
              overflow={{ vertical: 'hidden' }}
              direction="row"
              justify="between"
              style={{
                borderTopLeftRadius: 30,
                borderTopRightRadius: 30,
                borderBottomLeftRadius: 30
              }}
              pad={{
                vertical: 'xlarge',
                horizontal: size !== 'small' ? 'medium' : 'small'
              }}
              align="center"
              background={{
                color: '#34495E',
                opacity: 0.5,
                image: `url(${track.imageLink})`
              }}
              border={{
                side: 'all',
                size: 'medium',
                color: 'accent-3',
                style: 'outset'
              }}
              key={i}
            >
              <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                <Box
                  onClick={() =>
                    window.open(
                      `https://open.spotify.com/track/${track.id}`,
                      '_blank'
                    )
                  }
                  gap="small"
                  align="center"
                  justify="center"
                  direction="row"
                  round
                  hoverIndicator="accent-1"
                  background={{ color: 'accent-1', opacity: 'strong' }}
                  border={{ side: 'all', size: 'small', color: 'accent-3' }}
                  pad={{ vertical: 'small', horizontal: 'small' }}
                >
                  <Box
                    align="center"
                    width={
                      size === 'large'
                        ? '84px'
                        : size === 'medium'
                        ? '60px'
                        : '36px'
                    }
                    height={
                      size === 'large'
                        ? '84px'
                        : size === 'medium'
                        ? '60px'
                        : '36px'
                    }
                    style={{ borderRadius: 30 }}
                  >
                    <Image
                      fill
                      alignSelf="center"
                      src={track.imageLink}
                      fit="contain"
                      style={{
                        borderRadius: 50
                      }}
                    />
                  </Box>
                  <Box align="start">
                    <Text textAlign="start" weight="bold" size={size}>
                      {track.name}
                    </Text>
                    <Text
                      textAlign="start"
                      size={size !== 'small' ? 'small' : 'xsmall'}
                    >
                      {track.artist}
                    </Text>
                  </Box>
                </Box>
              </motion.div>
              <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                <Button
                  primary
                  title="remove from moodqueue"
                  size={size === 'large' ? 'large' : 'medium'}
                  icon={
                    <SubtractCircle
                      size={size === 'large' ? 'large' : 'medium'}
                    />
                  }
                  hoverIndicator="status-error"
                  color="neutral-4"
                  style={{ borderRadius: 30 }}
                />
              </motion.div>
            </Box>
          ))
        ) : (
          <Box align="center" justify="center" fill>
            <BounceLoader
              size={size === 'large' ? 300 : size === 'medium' ? 200 : 100}
              color="#6FFFB0"
            />
          </Box>
        )}
      </Box>
      <Box
        direction="row"
        align="center"
        gap="medium"
        margin={size !== 'small' ? 'small' : 'medium'}
      >
        <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
          <Button
            title="play your moodqueue"
            primary
            label={size === 'small' ? undefined : 'start queue'}
            icon={<CirclePlay />}
          />
        </motion.div>
        <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
          <Button
            title="share your moodqueue"
            primary
            label={size === 'small' ? undefined : 'share'}
            icon={<ShareOption />}
            color="accent-3"
          />
        </motion.div>
        <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
          <Button
            title="start over to begin a new moodqueue"
            primary
            icon={<Previous />}
            label={size === 'small' ? undefined : 'start over'}
            onClick={props.resetForm}
            color="brand"
          />
        </motion.div>
      </Box>
    </Box>
  );
};

export default Results;
