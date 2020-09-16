import React, {
  FunctionComponent,
  Reducer,
  useEffect,
  useReducer
} from 'react';
import { Box, Heading, Button, Text, Image, Layer } from 'grommet';
import { Previous, CirclePlay, SubtractCircle } from 'grommet-icons';
import { Mood } from '../../types/Mood';
import { FormSelection } from '../../types/FormSelection';
import { useSpotify } from '../../common/hooks/useSpotify';
import { TrackSource } from '../../types/TrackSource';
import { BounceLoader } from 'react-spinners';
import { EmotionSad as Sad } from '@styled-icons/remix-fill/EmotionSad';
import { MoreVert as More } from '@styled-icons/material/MoreVert';
import {
  ResultState,
  ResultAction,
  resultReducer,
  initialResultState,
  remove,
  update,
  updateTrackToShow
} from './reducer';
import { getSourcesString } from '../../common/Helpers';
import Options from './options';

interface ResultsProps {
  size: string;
  mood: Mood;
  numSongs: number;
  source: FormSelection;
  resetForm(): void;
}

const Results: FunctionComponent<ResultsProps> = (props) => {
  const { size, source, numSongs, mood } = props;
  const { getQueue } = useSpotify();

  const [state, dispatch] = useReducer<Reducer<ResultState, ResultAction>>(
    resultReducer,
    initialResultState
  );

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
      dispatch(update('tracks', data));
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
          {state.tracks ? state.tracks.length + ' songs' : 'loading...'}
        </Text>
        <Text textAlign="center" size={size !== 'small' ? 'medium' : 'small'}>
          based off your {getSourcesString(source)}
        </Text>
      </Box>
      <Box
        overflow={{ vertical: 'auto' }}
        gap="medium"
        alignContent="center"
        justify={
          state.tracks
            ? state.tracks.length > 1
              ? 'start'
              : 'center'
            : 'center'
        }
        pad={{
          vertical: 'small',
          horizontal: size !== 'small' ? 'xlarge' : 'large'
        }}
        fill
      >
        {state.tracks ? (
          state.tracks.length === 0 ? (
            <Box align="center" gap="small">
              <Text textAlign="center" size={size} weight="bold">
                oops! no more songs
              </Text>
              <Sad width="48px" height="48px" />
              <Text textAlign="center">
                click the start over button below to make a new moodqueue!
              </Text>
            </Box>
          ) : (
            state.tracks.map((track, i) => (
              <Box
                overflow={{ vertical: 'hidden' }}
                direction="row"
                justify="between"
                style={{
                  borderTopLeftRadius: 30,
                  borderTopRightRadius: 30,
                  borderBottomLeftRadius: 30,
                  background:
                    'linear-gradient(215deg, rgba(63,94,251,1) 30%, rgba(252,70,107,1) 100%)'
                }}
                pad={{
                  vertical: 'xlarge',
                  horizontal: size !== 'small' ? 'medium' : 'small'
                }}
                align="center"
                border={{ side: 'all', size: 'medium', color: 'accent-3' }}
                key={i}
              >
                <Box
                  gap="small"
                  align="center"
                  justify="center"
                  direction="row"
                  background={{ color: 'accent-1', opacity: 'strong' }}
                  pad={{ vertical: 'small', horizontal: 'small' }}
                  round="small"
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
                  >
                    <Image
                      fill
                      alignSelf="center"
                      src={track.imageLink}
                      fit="contain"
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
                  <Button
                    title="more"
                    style={{ borderRadius: 30 }}
                    alignSelf="center"
                    icon={<More width="24px" height="24px" />}
                    size="small"
                    hoverIndicator="accent-3"
                    onClick={() =>
                      dispatch(updateTrackToShow('trackToShow', track))
                    }
                  />
                </Box>
                <Button
                  primary
                  alignSelf="center"
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
                  onClick={() => dispatch(remove('tracks', track.id))}
                />
              </Box>
            ))
          )
        ) : (
          <Box align="center" justify="center" fill>
            <BounceLoader
              size={size === 'large' ? 300 : size === 'medium' ? 200 : 100}
              color="#6FFFB0"
            />
          </Box>
        )}
      </Box>
      <Box direction="row" align="center" gap="xsmall" margin="small">
        <Button
          title="play your moodqueue"
          primary
          label={size === 'small' ? undefined : 'start queue'}
          icon={<CirclePlay />}
          onClick={() => {
            alert(
              `it's time to start your queue!\nhere's a rundown of your moodqueue:\n${state.tracks.map(
                (track) => track.name
              )}`
            );
          }}
          hoverIndicator="accent-1"
        />
        <Options
          size={size}
          track={state.trackToShow}
          close={() => dispatch(updateTrackToShow('trackToShow', undefined))}
        />
        <Button
          title="start over to begin a new moodqueue"
          primary
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
