import { Layer, Box, Image, Text, Anchor, Button } from 'grommet';
import { FormClose, Spotify } from 'grommet-icons';
import React, { FunctionComponent } from 'react';
import { Track } from '../../types/Track';

interface OptionsProps {
  size: string;
  track: Track;
  close(): void;
}

const Options: FunctionComponent<OptionsProps> = (props) => {
  const { track, close, size } = props;

  const setVolume = () => {
    let player = document.getElementById('previewPlayer') as HTMLAudioElement;
    if (player) player.volume = 0.2;
  };

  if (track) {
    return (
      <Layer
        position="center"
        onClickOutside={close}
        style={{ background: 'transparent', borderRadius: 30 }}
      >
        <Box
          align="center"
          justify="center"
          background="#34495E"
          round={{ corner: 'bottom' }}
          pad={{ top: 'xsmall', bottom: 'small', horizontal: 'xsmall' }}
          gap="small"
          border={{ side: 'all', color: 'accent-1', size: 'small' }}
        >
          <Image src={track.imageLink} fit="contain" />
          <Box
            align="center"
            justify="center"
            gap="small"
            pad={{ vertical: 'xsmall', horizontal: 'medium' }}
            round
            fill
          >
            {track.previewUrl && (
              <audio
                controls
                loop
                id="previewPlayer"
                style={{
                  outline: 'none',
                  width: '100%',
                  borderRadius: 30
                }}
                onCanPlay={setVolume}
                controlsList="nodownload"
              >
                <source src={track.previewUrl} type="audio/mp3" />
                <Text textAlign="center">
                  Sorry, your browser does not support the audio element
                </Text>
              </audio>
            )}
            <Anchor
              href={`https://open.spotify.com/track/${track.id}`}
              target="blank"
              label="open in spotify"
              icon={<Spotify />}
            />
          </Box>
          {size === 'small' && (
            <Button alignSelf="center" icon={<FormClose />} onClick={close} />
          )}
        </Box>
      </Layer>
    );
  } else return null;
};

export default Options;
