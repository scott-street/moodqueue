import React, { FunctionComponent, Reducer, useEffect, useReducer, useState } from "react"
import { Box, Layer } from "grommet"
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
import { getSourcesString } from "../../common/Helpers"
import { Options } from "./options"
import { ResultList } from "./result-list"
import { Track } from "../../types/Track"
import { motion } from "framer-motion"
import { baseItemTop } from "../animations/motion"
import { Button } from "../../ui/button/Button"
import { Description } from "../../ui/description/Description"
import ReactTooltip from "react-tooltip"

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
                                  `${mood >= 0 ? Mood[mood].toLowerCase() + " songs" : " songs"}`
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
                        {userProduct === "premium" ? (
                            <Button
                                small
                                id="play-queue-btn"
                                icon={<Queue width="24px" height="24px" />}
                                onClick={async () => {
                                    setShowQueueWarningModal(true)
                                }}
                            />
                        ) : (
                            <Box align="center">
                                <a data-for="queue-tooltip" data-tip data-event="click focus">
                                    <Button
                                        disabled
                                        small
                                        id="play-queue-btn"
                                        icon={<Queue width="24px" height="24px" />}
                                    />
                                </a>
                                <ReactTooltip
                                    id="queue-tooltip"
                                    globalEventOff="click"
                                    effect="solid"
                                >
                                    <Box width="small" align="center">
                                        <Description
                                            text="unfortunately, the add-to-queue feature is limited to spotify premium users only :("
                                            textAlign="center"
                                        />
                                    </Box>
                                </ReactTooltip>
                            </Box>
                        )}
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
                            title="create a new moodqueue playlist or add to an existing one"
                            text="playlist"
                            icon={<Playlist width="26px" height="26px" />}
                            onClick={async () => {
                                await addToPlaylist(state.tracks, mood, source)
                                resetForm()
                            }}
                            secondary
                        />
                        {userProduct === "premium" ? (
                            <Button
                                id="play-queue-btn"
                                title="play your moodqueue"
                                text="add to queue"
                                icon={<Queue width="26px" height="26px" />}
                                onClick={async () => {
                                    await addToQueue(state.tracks)
                                    resetForm()
                                }}
                            />
                        ) : (
                            <Box align="center">
                                <a data-for="queue-tooltip" data-tip>
                                    <Button
                                        disabled
                                        id="play-queue-btn"
                                        text="add to queue"
                                        icon={<Queue width="26px" height="26px" />}
                                    />
                                </a>
                                <ReactTooltip id="queue-tooltip">
                                    <Box width="small" align="center">
                                        <Description
                                            text="unfortunately, this feature is limited to spotify premium users only :("
                                            textAlign="center"
                                        />
                                    </Box>
                                </ReactTooltip>
                            </Box>
                        )}
                        <Button
                            id="reset-btn"
                            title="start over to begin a new moodqueue"
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
                <Layer
                    onClickOutside={() => setShowPlaylistWarningModal(false)}
                    responsive={false}
                    position="center"
                    margin={{ horizontal: "large" }}
                    style={{ background: "transparent", width: "100%" }}
                >
                    <Box
                        style={{
                            background:
                                "linear-gradient(180deg, rgba(129,252,237,1) 0%, rgba(68,99,115,1) 50%, rgba(57,73,94,1) 75%)",
                        }}
                        align="center"
                        gap="large"
                        background={{ color: "#34495E" }}
                        pad="medium"
                        round="large"
                        border={{
                            color: "accent-3",
                            size: "large",
                            side: "bottom",
                            style: "groove",
                        }}
                    >
                        <Description header text="playlist" textAlign="center" />
                        <Description
                            text="pressing continue will either create a new moodqueue playlist or add to an existing one"
                            textAlign="center"
                        />
                        <Button
                            text="continue"
                            onClick={async () => {
                                await addToPlaylist(state.tracks, mood, source)
                                setShowPlaylistWarningModal(false)
                                resetForm()
                            }}
                            small
                            secondary
                        />
                    </Box>
                </Layer>
            )}
            {showQueueWarningModal && !showPlaylistWarningModal && (
                <Layer
                    onClickOutside={() => setShowQueueWarningModal(false)}
                    responsive={false}
                    position="center"
                    margin={{ horizontal: "large" }}
                    style={{ background: "transparent", width: "100%" }}
                >
                    <Box
                        style={{
                            background:
                                "linear-gradient(180deg, rgba(111,255,176,1) 0%, rgba(66,105,108,1) 50%, rgba(57,73,94,1) 75%)",
                        }}
                        align="center"
                        gap="large"
                        background={{ color: "#34495E" }}
                        pad="medium"
                        round="large"
                        border={{
                            color: "accent-1",
                            size: "large",
                            side: "bottom",
                            style: "groove",
                        }}
                    >
                        <Description header text="queue" textAlign="center" />
                        <Description
                            textAlign="center"
                            text="pressing the button below will add the songs above to your queue if you have spotify already open and playing"
                        />
                        <Button
                            text="add to queue"
                            small
                            onClick={async () => {
                                await addToQueue(state.tracks)
                                setShowQueueWarningModal(false)
                                resetForm()
                            }}
                        />
                    </Box>
                </Layer>
            )}
        </Box>
    )
}
