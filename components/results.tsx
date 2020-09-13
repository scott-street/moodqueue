import React, { FunctionComponent, useEffect } from 'react';
import { Box, Heading, Button, Text, Image } from 'grommet';
import {
  Previous,
  CirclePlay,
  ShareOption,
  SubtractCircle
} from 'grommet-icons';
import { mockPropertyTracks } from '../common/mocks/PropertyTracks';
import { Mood } from '../types/Mood';
import { FormSelection } from '../types/FormSelection';

interface ResultsProps {
  size: string;
  mood: Mood;
  numSongs: number;
  source: FormSelection;
  resetForm(): void;
}

const Results: FunctionComponent<ResultsProps> = (props) => {
  const { size } = props;

  useEffect(() => {
    document.title = 'your queue | moodqueue';
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
      <Text textAlign="center" size={size !== 'small' ? 'medium' : 'small'}>
        {props.numSongs} songs
      </Text>
      <Box
        overflow={{ vertical: 'auto' }}
        gap="medium"
        alignContent="center"
        pad={{
          vertical: 'small',
          horizontal: size !== 'small' ? 'xlarge' : 'large'
        }}
        fill
      >
        {mockPropertyTracks.map((track, i) => (
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
            border={{ side: 'all', size: 'medium', color: 'accent-3' }}
            key={i}
          >
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
            <Button
              primary
              title="remove from moodqueue"
              size={size === 'large' ? 'large' : 'medium'}
              icon={
                <SubtractCircle size={size === 'large' ? 'large' : 'medium'} />
              }
              hoverIndicator="status-error"
              color="neutral-4"
              style={{ borderRadius: 30 }}
            />
          </Box>
        ))}
      </Box>
      <Box direction="row" align="center" gap="small" margin="small">
        <Button
          title="play your moodqueue"
          primary={size == 'small'}
          label={size === 'small' ? undefined : 'start queue'}
          icon={<CirclePlay />}
          hoverIndicator="accent-1"
        />
        <Button
          title="share your moodqueue"
          primary={size == 'small'}
          label={size === 'small' ? undefined : 'share'}
          icon={<ShareOption />}
          hoverIndicator="accent-3"
          color="accent-3"
        />
        <Button
          title="start over to begin a new moodqueue"
          primary={size == 'small'}
          icon={<Previous />}
          label={size === 'small' ? undefined : 'start over'}
          onClick={props.resetForm}
          hoverIndicator="brand"
          color="brand"
        />
      </Box>
    </Box>
  );
};

export default Results;
