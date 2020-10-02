import React, { FunctionComponent } from "react"
import { Box, Image, Text, Button } from "grommet"
import { Track } from "../../../types/Track"
import { More, SubtractCircle } from "grommet-icons"
import { remove, updateTrackToShow } from "../reducer"
import { getShortenedName } from "../../../common/Helpers"
import { motion } from "framer-motion"

interface ResultListItemProps {
    track: Track
    size: any
    dispatch: any
    align: string
}
export const ResultListItem: FunctionComponent<ResultListItemProps> = (props) => {
    const { track, size, dispatch, align } = props
    return (
        <Box
            overflow={{ vertical: "hidden" }}
            direction="row"
            justify="between"
            style={{
                borderTopLeftRadius: 30,
                borderTopRightRadius: 30,
                borderBottomLeftRadius: 30,
                background:
                    align === "start"
                        ? "linear-gradient(215deg, rgba(63,94,251,1) 30%, rgba(252,70,107,1) 100%)"
                        : align === "end"
                        ? "linear-gradient(215deg, rgba(252,70,107,1) 0%, rgba(63,94,251,1) 60%)"
                        : "radial-gradient(circle, rgba(63,94,251,1) 30%, rgba(252,70,107,1) 100%)",
                width: "70%",
            }}
            pad={{
                vertical: "large",
                horizontal: "large",
            }}
            align="center"
            alignSelf={align === "start" ? "start" : align === "end" ? "end" : "center"}
            border={{
                side: "all",
                size: size !== "small" ? "medium" : "small",
                color: "accent-3",
            }}
        >
            <Box
                gap="small"
                align="center"
                justify="between"
                fill
                direction="row"
                pad={{ vertical: "small", right: "small" }}
                round="small"
            >
                <Box direction="row" align="center" gap="small" round="small">
                    <Box
                        background={{
                            color: size !== "small" ? "#1F2730" : undefined,
                            opacity: 0.6,
                        }}
                        pad={size !== "small" ? "xsmall" : "none"}
                        round="small"
                        align="center"
                        width={size === "large" ? "84px" : size === "medium" ? "72px" : "72px"}
                        height={size === "large" ? "84px" : size === "medium" ? "72px" : "72px"}
                    >
                        <Image fill alignSelf="center" src={track.imageLink} fit="contain" />
                    </Box>
                    <Box align="start">
                        <Text
                            textAlign="start"
                            weight="bold"
                            size={size === "large" ? "xlarge" : size === "medium" ? "large" : size}
                        >
                            {size === "small" ? getShortenedName(track.name, true) : track.name}
                        </Text>
                        <Text
                            textAlign="start"
                            size={
                                size === "large" ? "medium" : size === "medium" ? "small" : "xsmall"
                            }
                        >
                            {size === "small"
                                ? getShortenedName(track.artist, false)
                                : track.artist}
                        </Text>
                    </Box>
                </Box>
                <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                    <Button
                        id="more-details-btn"
                        title="more"
                        style={{ borderRadius: 30 }}
                        alignSelf="center"
                        //color="#24C0FF"
                        icon={<More />}
                        size={size !== "small" ? "medium" : "small"}
                        //hoverIndicator="#24C0FF"
                        onClick={() => dispatch(updateTrackToShow("trackToShow", track))}
                    />
                </motion.div>
            </Box>
            {size !== "small" && (
                <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                    <Button
                        id="remove-track-btn"
                        hoverIndicator="dark-1"
                        alignSelf="center"
                        primary
                        color="dark-1"
                        title="remove from moodqueue"
                        icon={<SubtractCircle color="status-error" />}
                        style={{ borderRadius: 30 }}
                        onClick={() => dispatch(remove("tracks", track.id))}
                    />
                </motion.div>
            )}
        </Box>
    )
}
