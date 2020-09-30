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
}
export const ResultListItem: FunctionComponent<ResultListItemProps> = (props) => {
    const { track, size, dispatch } = props
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
                    "linear-gradient(215deg, rgba(63,94,251,1) 30%, rgba(252,70,107,1) 100%)",
            }}
            pad={{
                vertical: "xlarge",
                horizontal: "large",
            }}
            align="center"
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
                        width={size === "large" ? "144px" : size === "medium" ? "120px" : "72px"}
                        height={size === "large" ? "144px" : size === "medium" ? "120px" : "72px"}
                    >
                        <Image fill alignSelf="center" src={track.imageLink} fit="contain" />
                    </Box>
                    <Box align="start">
                        <Text
                            textAlign="start"
                            weight="bold"
                            size={
                                size === "large" ? "xxlarge" : size === "medium" ? "xlarge" : size
                            }
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
                        icon={<More size={size !== "small" ? "large" : "medium"} />}
                        size={size !== "small" ? "large" : "small"}
                        hoverIndicator="#24C0FF"
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
                        title="remove from moodqueue"
                        size="large"
                        icon={
                            <SubtractCircle
                                color="status-error"
                                size={size !== "small" ? "large" : "medium"}
                            />
                        }
                        style={{ borderRadius: 30 }}
                        onClick={() => dispatch(remove("tracks", track.id))}
                    />
                </motion.div>
            )}
        </Box>
    )
}
