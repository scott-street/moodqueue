import { Layer, Box, Image, Text, Anchor, Button } from "grommet"
import { Spotify, SubtractCircle } from "grommet-icons"
import React, { FunctionComponent } from "react"
import { Track } from "../../../types/Track"
import { remove, ResultAction } from "../reducer"

interface OptionsProps {
    size: string
    track: Track
    close(): void
    dispatch(value: ResultAction): void
}

const Options: FunctionComponent<OptionsProps> = (props) => {
    const { track, close, size, dispatch } = props

    const setVolume = () => {
        let player = document.getElementById("previewPlayer") as HTMLAudioElement
        if (player) player.volume = 0.2
    }

    if (track) {
        return (
            <Layer
                position={size !== "small" ? "center" : "bottom"}
                responsive={false}
                onClickOutside={close}
                style={{
                    background: "transparent",
                    borderRadius: size !== "small" ? 30 : 0,
                    width: size === "small" ? "100%" : undefined,
                }}
            >
                <Box
                    align="center"
                    overflow={{ vertical: "auto" }}
                    justify="center"
                    background={{ color: "#34495E" }}
                    round={size !== "small" ? { corner: "bottom" } : undefined}
                    pad={{ top: "xsmall", bottom: "small", horizontal: "xsmall" }}
                    gap={size !== "small" ? "small" : "medium"}
                    border={{ side: "all", color: "accent-1", size: "small" }}
                    flex
                >
                    <Image src={track.imageLink} fit="contain" fill={size === "small"} />
                    <Box
                        align="center"
                        justify="center"
                        gap={size !== "small" ? "small" : "medium"}
                        pad={{ vertical: "xsmall", horizontal: "medium" }}
                        round
                        fill={size !== "small" ? true : "horizontal"}
                    >
                        {track.previewUrl && (
                            <audio
                                controls
                                loop
                                id="previewPlayer"
                                style={{
                                    outline: "none",
                                    width: "100%",
                                    borderRadius: 30,
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
                            alignSelf="center"
                            href={`https://open.spotify.com/track/${track.id}`}
                            target="blank"
                            label={`Open ${track.name} in Spotify`}
                            icon={<Spotify />}
                        />
                        {size === "small" && (
                            <Button
                                size="small"
                                icon={<SubtractCircle />}
                                label="remove from queue"
                                alignSelf="center"
                                color="neutral-4"
                                primary
                                onClick={() => {
                                    dispatch(remove("tracks", track.id))
                                    close()
                                }}
                            />
                        )}
                    </Box>
                </Box>
            </Layer>
        )
    } else return null
}

export default Options
