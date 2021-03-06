import React, { FunctionComponent, Reducer, useEffect, useReducer, useState } from "react"
import { Box } from "grommet"
import { Mood } from "../../types/Mood"
import { FormSelection } from "../../types/FormSelection"
import { useSpotify } from "../../common/hooks/useSpotify"
import { EmotionSad as Sad } from "@styled-icons/remix-fill/EmotionSad"
import { PlaylistAdd as Playlist } from "@styled-icons/material-rounded/PlaylistAdd"
import { QueueMusic as Queue } from "@styled-icons/material-rounded/QueueMusic"
import { SkipBackwardFill as Back } from "@styled-icons/bootstrap/SkipBackwardFill"
import {
    ResultState,
    ResultAction,
    resultReducer,
    initialResultState,
    update,
    updateTrackToShow,
} from "./reducer"
import { Options } from "./options"
import { ResultList } from "./result-list"
import { Track } from "../../types/Track"
import { motion } from "framer-motion"
import { baseItemTop } from "../animations/motion"
import { Button } from "../../ui/button/Button"
import { Description } from "../../ui/description/Description"
import { Confirmation } from "../../ui/confirmation/Confirmation"
import { ResultsOverview } from "../../ui/results-overview/ResultsOverview"

interface ResultsProps {
    size: string
    tracks: Track[]
    mood: Mood
    source: FormSelection
    resetForm(): void
    userProduct: string
}

export const Results: FunctionComponent<ResultsProps> = (props) => {
    const { size, tracks, source, mood, resetForm, userProduct } = props
    const { addToQueue, addToPlaylist } = useSpotify()
    const [showPlaylistWarningModal, setShowPlaylistWarningModal] = useState(false)
    const [showQueueWarningModal, setShowQueueWarningModal] = useState(false)

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
            <Box align="center" justify="between" gap={size === "small" ? "none" : "small"} fill>
                <ResultsOverview tracks={state.tracks} size={size} mood={mood} source={source} />
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
                                    text="oops! no songs!"
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
                    <Box direction="row" align="center" gap="medium">
                        <Button
                            small
                            id="playlist-btn"
                            icon={<Playlist width="24px" height="24px" />}
                            onClick={async () => {
                                setShowPlaylistWarningModal(true)
                            }}
                            secondary
                        />
                        <Button
                            disabled={userProduct !== "premium"}
                            small
                            id="play-queue-btn"
                            icon={<Queue width="24px" height="24px" />}
                            tooltip={{
                                text:
                                    "unfortunately, the add-to-queue feature is limited to spotify premium users only :(",
                                id: "queue-tooltip",
                                active: userProduct !== "premium",
                            }}
                            onClick={async () => {
                                setShowQueueWarningModal(true)
                            }}
                        />
                        <Button
                            small
                            id="reset-btn"
                            icon={<Back width="24px" height="24px" />}
                            onClick={resetForm}
                            color="neutral-4"
                        />
                    </Box>
                ) : (
                    <Box direction="row" align="center" gap="medium">
                        <Button
                            id="playlist-btn"
                            text="playlist"
                            icon={<Playlist width="26px" height="26px" />}
                            onClick={async () => {
                                const result = await addToPlaylist(state.tracks, mood, source)
                                if (result) resetForm()
                            }}
                            secondary
                            tooltip={{
                                text: `click to either create a new moodqueue ${Mood[
                                    mood
                                ].toLowerCase()} playlist or add to an existing one!`,
                                id: "playlist-tooltip",
                                active: true,
                            }}
                        />
                        <Button
                            disabled={userProduct !== "premium"}
                            id="play-queue-btn"
                            text="add to queue"
                            icon={<Queue width="26px" height="26px" />}
                            tooltip={{
                                text:
                                    userProduct === "premium"
                                        ? `click continue to add the selected ${Mood[
                                              mood
                                          ].toLowerCase()} songs to your queue!`
                                        : "unfortunately, this feature is limited to spotify premium users only :(",
                                id: "queue-tooltip",
                                active: true,
                                warning: {
                                    handleClick: async () => await addToQueue(state.tracks),
                                    text:
                                        "this might not fully work every time, so please try again if you encounter any problems!",
                                },
                            }}
                        />
                        <Button
                            id="reset-btn"
                            icon={<Back width="26px" height="26px" />}
                            text="start over"
                            onClick={resetForm}
                            color="neutral-4"
                        />
                    </Box>
                )}
            </Box>
            <Options
                size={size}
                track={state.trackToShow}
                close={() => dispatch(updateTrackToShow("trackToShow", undefined))}
                dispatch={(value) => dispatch(value)}
            />
            {showPlaylistWarningModal && !showQueueWarningModal && (
                <Confirmation
                    id="playlist-confirm"
                    descText={`pressing continue will either create a new moodqueue ${Mood[
                        mood
                    ].toLowerCase()} playlist or add to an existing one`}
                    headerText="playlist"
                    btnText="continue"
                    close={() => setShowPlaylistWarningModal(false)}
                    handleConfirmation={async () => {
                        const result = await addToPlaylist(state.tracks, mood, source)
                        setShowPlaylistWarningModal(false)
                        if (result) resetForm()
                    }}
                    secondary
                />
            )}
            {showQueueWarningModal && !showPlaylistWarningModal && (
                <Confirmation
                    id="queue-confirm"
                    descText={`pressing the button below will add the selected ${
                        tracks.length
                    } ${Mood[
                        mood
                    ].toLowerCase()} songs to your queue only if you have your spotify open and playing`}
                    headerText="queue"
                    btnText="add to queue"
                    warning={{
                        text:
                            "adding to queue might not fully work every time since it's a spotify beta feature, so please try again if you encounter any problems!",
                    }}
                    close={() => setShowQueueWarningModal(false)}
                    handleConfirmation={async () => {
                        await addToQueue(state.tracks)
                        setShowQueueWarningModal(false)
                    }}
                />
            )}
        </Box>
    )
}
