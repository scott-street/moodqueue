import React, { FunctionComponent, useEffect } from 'react';
import { Box, Heading, Button, Text, Image } from 'grommet';
import {
  Previous,
  CirclePlay,
  ShareOption,
  SubtractCircle
} from 'grommet-icons';
import { mockPropertyTracks } from '../common/mocks/PropertyTracks';
import { useForm } from '../common/hooks/useForm';
import { Mood } from '../types/Mood';

interface ResultsProps {
  size: string;
}

const Results: FunctionComponent<ResultsProps> = (props) => {
  const { size } = props;
  const { resetForm, moodIndex, queueTitle } = useForm();

  useEffect(() => {
    document.title = `${queueTitle} | moodqueue`;
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
      <Heading textAlign="center" margin="none" size={size}>
        here's your{' '}
        {moodIndex >= 0 ? Mood[moodIndex].toLowerCase() + ' queue:' : ' queue:'}
      </Heading>
      <Text textAlign="center" size="medium">
        {queueTitle}
      </Text>
      <Box
        overflow={{ vertical: 'auto', horizontal: 'hidden' }}
        gap={size === 'small' ? 'medium' : 'medium'}
        alignContent="center"
        pad={{ vertical: 'small', horizontal: 'medium' }}
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
            pad={{ vertical: 'xlarge', horizontal: 'xsmall' }}
            align="center"
            background={{ color: '#34495E', opacity: 0.7 }}
            border={{ side: 'all', size: 'small', color: 'accent-3' }}
            key={i}
          >
            <Box
              onClick={() =>
                window.open(
                  `https://open.spotify.com/track/${track.id}`,
                  '_blank'
                )
              }
              gap="xsmall"
              align="center"
              justify="center"
              direction="row"
              round
              hoverIndicator="accent-1"
              pad={{ vertical: 'small', right: 'small', left: 'xsmall' }}
            >
              <Box
                align="start"
                width={
                  size === 'large'
                    ? '60px'
                    : size === 'medium'
                    ? '48px'
                    : '36px'
                }
                height={
                  size === 'large'
                    ? '60px'
                    : size === 'medium'
                    ? '48px'
                    : '36px'
                }
                style={{ borderRadius: 30 }}
              >
                <Image
                  fill
                  alignSelf="start"
                  src={track.imageLink}
                  fit="contain"
                  style={{
                    borderRadius: 30
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
              margin={{ right: 'xsmall' }}
              title="remove from moodqueue"
              icon={
                <SubtractCircle
                  color={size === 'small' ? 'neutral-4' : undefined}
                />
              }
              hoverIndicator="neutral-4"
              style={{ borderRadius: 30 }}
            />
          </Box>
        ))}
      </Box>
      <Box direction="row" align="center" gap="small" margin="medium">
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
          onClick={resetForm}
          hoverIndicator="brand"
          color="brand"
        />
      </Box>
    </Box>
  );
};

export default Results;
