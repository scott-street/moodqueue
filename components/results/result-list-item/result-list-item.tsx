import React, { FunctionComponent } from "react"
import { Box, Image, Text, Button } from "grommet"
import { Track } from "../../../types/Track"
import { More, SubtractCircle } from "grommet-icons"
import { remove, updateTrackToShow } from "../reducer"
import { getShortenedTrackName } from "../../../common/Helpers"
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
                horizontal: size !== "small" ? "xlarge" : "large",
            }}
            align="center"
            border={{ side: "all", size: "medium", color: "accent-3" }}
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
                        align="center"
                        width={size === "large" ? "120px" : size === "medium" ? "96px" : "72px"}
                        height={size === "large" ? "120px" : size === "medium" ? "96px" : "72px"}
                    >
                        <Image fill alignSelf="center" src={track.imageLink} fit="contain" />
                    </Box>
                    <Box align="start">
                        <Text textAlign="start" weight="bold" size={size}>
                            {size === "small" ? getShortenedTrackName(track.name) : track.name}
                        </Text>
                        <Text textAlign="start" size={size !== "small" ? "small" : "xsmall"}>
                            {track.artist}
                        </Text>
                    </Box>
                </Box>
                <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                    <Button
                        id="more-details-btn"
                        title="more"
                        style={{ borderRadius: 30 }}
                        alignSelf="center"
                        icon={<More size={size === "large" ? "large" : "medium"} />}
                        size={size}
                        hoverIndicator="dark-1"
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
                        size={size === "large" ? "large" : "medium"}
                        icon={
                            <SubtractCircle
                                color="status-error"
                                size={size === "large" ? "large" : "medium"}
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
