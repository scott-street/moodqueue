import React, { FunctionComponent, Reducer, useEffect, useReducer } from "react"
import { Box, Heading, Text } from "grommet"
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
import { Options } from "./options"
import { ResultList } from "./result-list"
import { Track } from "../../types/Track"
import { motion } from "framer-motion"
import { baseItemTop } from "../animations/motion"
import { Button } from "../../ui/button/Button"
import { Description } from "../../ui/description/Description"

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
        <Box align="center" justify="between" gap="small" fill>
            <Description
                header
                id="desc-title"
                textAlign="center"
                size="small"
                text={`here's your ${mood >= 0 ? Mood[mood].toLowerCase() + " queue:" : " queue:"}`}
            />
            <Box direction="row" border="between" gap="small" align="center">
                <Description
                    id="desc-num-songs"
                    textAlign="center"
                    size={size !== "small" ? "medium" : "small"}
                    text={state.tracks ? state.tracks.length + " songs" : "loading..."}
                />
                <Description
                    id="desc-sources"
                    textAlign="center"
                    size={size !== "small" ? "medium" : "small"}
                    text={"based off your " + getSourcesString(source)}
                />
            </Box>
            <Box
                overflow="hidden"
                gap="medium"
                alignContent="center"
                justify={state.tracks ? (state.tracks.length > 1 ? "start" : "center") : "center"}
                pad={{
                    vertical: size === "small" ? "small" : "none",
                }}
                fill
            >
                <motion.div
                    className="item"
                    variants={baseItemTop}
                    style={{ width: "100%", height: "100%" }}
                >
                    {state.tracks && state.tracks.length === 0 ? (
                        <Box align="center" gap="small">
                            <Description
                                textAlign="center"
                                size={size}
                                weight="bold"
                                text="oops! no more songs"
                            />
                            <Sad width="48px" height="48px" />
                            <Description
                                textAlign="center"
                                size={size !== "small" ? "medium" : "small"}
                                text="click the start over button below to make a new moodqueue!"
                            />
                        </Box>
                    ) : (
                        <ResultList
                            tracks={state.tracks || props.tracks}
                            dispatch={(value) => dispatch(value)}
                            size={size}
                        />
                    )}
                </motion.div>
            </Box>
            <Box
                direction="row"
                align="center"
                gap={size !== "small" ? "small" : "xsmall"}
                margin={size === "small" ? { bottom: "small", top: "xsmall" } : "small"}
            >
                <Button
                    id="play-queue-btn"
                    text="play queue"
                    icon={<CirclePlay color={"#666666"} />}
                    onClick={() => {
                        addToQueue(state.tracks)
                    }}
                    small={size === "small"}
                />
                <Options
                    size={size}
                    track={state.trackToShow}
                    close={() => dispatch(updateTrackToShow("trackToShow", undefined))}
                    dispatch={(value) => dispatch(value)}
                />
                <Button
                    id="reset-btn"
                    text="start over"
                    icon={<Previous color={"#666666"} />}
                    onClick={resetForm}
                    secondary
                    small={size === "small"}
                />
            </Box>
        </Box>
    )
}
