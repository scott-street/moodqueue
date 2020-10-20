import React, { FunctionComponent, Reducer, useEffect, useReducer } from "react"
import { Box } from "grommet"
import { Previous, CirclePlay } from "grommet-icons"
import { Mood } from "../../types/Mood"
import { FormSelection } from "../../types/FormSelection"
import { useSpotify } from "../../common/hooks/useSpotify"
import { EmotionSad as Sad } from "@styled-icons/remix-fill/EmotionSad"
import { PlaylistAdd as Playlist } from "@styled-icons/material-rounded/PlaylistAdd"
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
import { AfterParty } from "./after-party"

interface ResultsProps {
    size: string
    tracks: Track[]
    mood: Mood
    source: FormSelection
    selectedGenreValue: string
    resetForm(): void
    userProduct: string
}

export const Results: FunctionComponent<ResultsProps> = (props) => {
    const { size, tracks, source, selectedGenreValue, mood, resetForm, userProduct } = props
    const { addToQueue, addToPlaylist } = useSpotify()

    const [state, dispatch] = useReducer<Reducer<ResultState, ResultAction>>(
        resultReducer,
        initialResultState
    )

    useEffect(() => {
        document.title = "your new moodqueue | moodqueue"
        dispatch(update("tracks", tracks))
    }, [])

    return (
        <Box align="center" fill>
            {!state.showAfterParty ? (
                <Box align="center" justify="between" gap="small" fill>
                    <Box direction="row" border="between" gap="small" align="center">
                        <Description
                            id="desc-num-songs"
                            textAlign="center"
                            size={size !== "small" ? "xlarge" : "medium"}
                            weight="bold"
                            text={
                                state.tracks
                                    ? state.tracks.length +
                                      " " +
                                      `${
                                          mood >= 0 ? Mood[mood].toLowerCase() + " songs" : " songs"
                                      }`
                                    : "loading..."
                            }
                        />
                        <Description
                            id="desc-sources"
                            textAlign="center"
                            size={size !== "small" ? "xlarge" : "medium"}
                            text={`based off ${
                                !selectedGenreValue
                                    ? "your " + getSourcesString(source)
                                    : selectedGenreValue.replace("-", " ")
                            }`}
                        />
                    </Box>
                    <Box
                        overflow="hidden"
                        gap="medium"
                        alignContent="center"
                        justify={
                            state.tracks ? (state.tracks.length > 1 ? "start" : "center") : "center"
                        }
                        pad={{
                            vertical: size === "small" ? "small" : "none",
                        }}
                        fill
                        flex
                    >
                        {state.tracks && state.tracks.length === 0 ? (
                            <Box align="center" gap="small" justify="center">
                                <motion.div
                                    variants={baseItemTop}
                                    style={{
                                        display: "flex",
                                        alignItems: "center",
                                        flexDirection: "column",
                                        textAlign: "center",
                                    }}
                                >
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
                                        text={`click the ${
                                            size === "small" ? "back" : "start over"
                                        } button below to make a new moodqueue!`}
                                    />
                                </motion.div>
                            </Box>
                        ) : (
                            <motion.div
                                variants={baseItemTop}
                                style={{
                                    width: "100%",
                                    height: "100%",
                                }}
                            >
                                <ResultList
                                    tracks={state.tracks || props.tracks}
                                    dispatch={(value) => dispatch(value)}
                                    size={size}
                                />
                            </motion.div>
                        )}
                    </Box>
                    {size === "small" ? (
                        userProduct === "premium" ? (
                            <Box align="center" gap="small">
                                <Box direction="row" align="center" gap="medium">
                                    <Button
                                        small
                                        id="play-queue-btn"
                                        title="play your moodqueue"
                                        text="queue"
                                        icon={<CirclePlay color="dark-2" />}
                                        onClick={() => {
                                            addToQueue(state.tracks)
                                            dispatch(update("showAfterParty", true))
                                        }}
                                    />
                                    <Button
                                        small
                                        id="playlist-btn"
                                        title="create a new moodqueue playlist"
                                        text="playlist"
                                        icon={<Playlist width="24px" height="24px" />}
                                        onClick={() => {
                                            addToPlaylist(state.tracks)
                                            dispatch(update("showAfterParty", true))
                                        }}
                                        secondary
                                    />
                                </Box>
                                <Button
                                    small
                                    id="reset-btn"
                                    title="start over to begin a new moodqueue"
                                    icon={<Previous color="light-2" />}
                                    text="back"
                                    onClick={resetForm}
                                    color="neutral-4"
                                />
                            </Box>
                        ) : (
                            <Box direction="row" align="center" gap="medium">
                                <Button
                                    small
                                    id="playlist-btn"
                                    title="create a new moodqueue playlist"
                                    text="playlist"
                                    icon={<Playlist width="24px" height="24px" />}
                                    onClick={() => {
                                        addToPlaylist(state.tracks)
                                        dispatch(update("showAfterParty", true))
                                    }}
                                    secondary
                                />
                                <Button
                                    small
                                    id="reset-btn"
                                    title="start over to begin a new moodqueue"
                                    icon={<Previous color="light-2" />}
                                    text="back"
                                    onClick={resetForm}
                                    color="neutral-4"
                                />
                            </Box>
                        )
                    ) : (
                        <Box direction="row" align="center" gap="medium">
                            {userProduct === "premium" && (
                                <Button
                                    id="play-queue-btn"
                                    title="play your moodqueue"
                                    text="add to queue"
                                    icon={<CirclePlay color="dark-2" />}
                                    onClick={() => {
                                        addToQueue(state.tracks)
                                        dispatch(update("showAfterParty", true))
                                    }}
                                />
                            )}
                            <Button
                                id="playlist-btn"
                                title="create a new moodqueue playlist"
                                text="create playlist"
                                icon={<Playlist width="26px" height="26px" />}
                                onClick={() => {
                                    addToPlaylist(state.tracks)
                                    dispatch(update("showAfterParty", true))
                                }}
                                secondary
                            />
                            <Button
                                id="reset-btn"
                                title="start over to begin a new moodqueue"
                                icon={<Previous color="light-2" />}
                                text="start over"
                                onClick={resetForm}
                                color="neutral-4"
                            />
                        </Box>
                    )}
                </Box>
            ) : (
                <AfterParty resetForm={resetForm} />
            )}
            <Options
                size={size}
                track={state.trackToShow}
                close={() => dispatch(updateTrackToShow("trackToShow", undefined))}
                dispatch={(value) => dispatch(value)}
            />
        </Box>
    )
}
