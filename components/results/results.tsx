import React, { FunctionComponent, Reducer, useEffect, useReducer } from "react"
import { Box, Heading, Button, Text } from "grommet"
import { Previous, CirclePlay } from "grommet-icons"
import { Mood } from "../../types/Mood"
import { FormSelection } from "../../types/FormSelection"
import { useSpotify } from "../../common/hooks/useSpotify"
import { EmotionSad as Sad } from "@styled-icons/remix-fill/EmotionSad"
import {
    ResultState,
    ResultAction,
    resultReducer,
    initialResultState,
    update,
    updateTrackToShow,
} from "./reducer"
import { getSourcesString } from "../../common/Helpers"
import Options from "./options/options"
import { ResultList } from "./result-list/result-list"
import { Track } from "../../types/Track"

interface ResultsProps {
    size: string
    tracks: Track[]
    mood: Mood
    source: FormSelection
    resetForm(): void
}

export const Results: FunctionComponent<ResultsProps> = (props) => {
    const { size, tracks, source, mood, resetForm } = props
    const { addToQueue } = useSpotify()

    const [state, dispatch] = useReducer<Reducer<ResultState, ResultAction>>(
        resultReducer,
        initialResultState
    )

    useEffect(() => {
        document.title = "your new queue | moodqueue"
        dispatch(update("tracks", tracks))
    }, [])

    return (
        <Box
            align="center"
            justify="between"
            gap="small"
            fill
            pad={{
                horizontal: "medium",
                vertical: "small",
            }}
        >
            <Heading
                id="desc-title"
                textAlign="center"
                margin="none"
                size={size !== "small" ? "medium" : "small"}
            >
                here's your {mood >= 0 ? Mood[mood].toLowerCase() + " queue:" : " queue:"}
            </Heading>
            <Box direction="row" border="between" gap="small" align="center">
                <Text
                    id="desc-num-songs"
                    textAlign="center"
                    size={size !== "small" ? "medium" : "small"}
                >
                    {state.tracks ? state.tracks.length + " songs" : "loading..."}
                </Text>
                <Text
                    id="desc-sources"
                    textAlign="center"
                    size={size !== "small" ? "medium" : "small"}
                >
                    based off your {getSourcesString(source)}
                </Text>
            </Box>
            <Box
                overflow={{ vertical: "auto" }}
                gap="medium"
                alignContent="center"
                justify={state.tracks ? (state.tracks.length > 1 ? "start" : "center") : "center"}
                pad={{
                    vertical: "small",
                    horizontal: size !== "small" ? "xlarge" : "none",
                }}
                fill
            >
                {state.tracks && state.tracks.length === 0 ? (
                    <Box align="center" gap="small">
                        <Text textAlign="center" size={size} weight="bold">
                            oops! no more songs
                        </Text>
                        <Sad width="48px" height="48px" />
                        <Text textAlign="center" size={size !== "small" ? "medium" : "small"}>
                            click the start over button below to make a new moodqueue!
                        </Text>
                    </Box>
                ) : (
                    <ResultList
                        tracks={state.tracks || props.tracks}
                        dispatch={(value) => dispatch(value)}
                        size={size}
                    />
                )}
            </Box>
            <Box direction="row" align="center" gap="xsmall" margin="medium">
                <Button
                    id="play-queue-btn"
                    title="play your moodqueue"
                    primary
                    label={size === "small" ? undefined : "start queue"}
                    icon={<CirclePlay />}
                    onClick={() => {
                        addToQueue(state.tracks)
                    }}
                    hoverIndicator="accent-1"
                />
                <Options
                    size={size}
                    track={state.trackToShow}
                    close={() => dispatch(updateTrackToShow("trackToShow", undefined))}
                    dispatch={(value) => dispatch(value)}
                />
                <Button
                    id="reset-btn"
                    title="start over to begin a new moodqueue"
                    primary
                    icon={<Previous />}
                    label={size === "small" ? undefined : "start over"}
                    onClick={resetForm}
                    hoverIndicator="accent-3"
                    color="accent-3"
                />
            </Box>
        </Box>
    )
}
