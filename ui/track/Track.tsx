import React, { useState } from "react"
import { OuterBox, InnerBoxStart } from "./Track.styles"
import { Box, Image, Text } from "grommet"
import { More, SubtractCircle } from "grommet-icons"
import { getShortenedName } from "../../common/Helpers"
import { Track as TrackType } from "../../types/Track"
import { Button } from "../button/Button"
import { motion } from "framer-motion"
import { MoonLoader } from "react-spinners"
import { useNotification } from "../../common/hooks/useNotification"

interface TrackProps {
    size?: any
    track: TrackType
    onClickMore?: () => void
    onClickRemove?: () => void
}
export const Track: React.FunctionComponent<TrackProps> = (props) => {
    const { size, track, onClickMore, onClickRemove } = props
    const [loading, setLoading] = useState(true)
    const { notifySuccess } = useNotification()

    return (
        <motion.div
            whileHover={{ scale: 1.05 }}
            style={{
                borderRadius: 30,
                borderBottomRightRadius: 0,
                alignItems: "center",
                display: "flex",
                flex: 1,
            }}
        >
            <OuterBox
                border={{
                    side: "all",
                    size: size !== "small" ? "medium" : "small",
                    color: "accent-3",
                }}
                background={{ dark: true }}
                pad={{
                    vertical: size === "small" ? "small" : "none",
                    horizontal: size === "small" ? "large" : "medium",
                }}
            >
                <InnerBoxStart
                    gap="small"
                    pad={{ vertical: "small", right: "small" }}
                    round="small"
                    background={{ dark: true }}
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
                            width={
                                size === "large" ? "144px" : size === "medium" ? "120px" : "72px"
                            }
                            height={
                                size === "large" ? "144px" : size === "medium" ? "120px" : "72px"
                            }
                        >
                            {loading ? (
                                <Box align="center" justify="center" flex>
                                    <MoonLoader size={60} color="#6FFFB0" />
                                    <Image
                                        src={track.imageLink}
                                        onLoad={() => setLoading(false)}
                                        style={{ display: "none" }}
                                    />
                                </Box>
                            ) : (
                                <Image
                                    id="list-item-album-artwork"
                                    fill
                                    alignSelf="center"
                                    src={track.imageLink}
                                    fit="contain"
                                />
                            )}
                        </Box>
                        <Box align="start">
                            <Text
                                textAlign="start"
                                weight="bold"
                                size={
                                    size === "large"
                                        ? "xxlarge"
                                        : size === "medium"
                                        ? "xlarge"
                                        : size
                                }
                            >
                                {size === "small" ? getShortenedName(track.name, true) : track.name}
                            </Text>
                            <Text
                                textAlign="start"
                                size={
                                    size === "large"
                                        ? "medium"
                                        : size === "medium"
                                        ? "small"
                                        : "xsmall"
                                }
                            >
                                {size === "small"
                                    ? getShortenedName(track.artist, false)
                                    : track.artist}
                            </Text>
                        </Box>
                    </Box>
                    <Button
                        id="more-details-btn"
                        title="more"
                        fill={false}
                        icon={<More size={size === "large" ? "large" : "medium"} />}
                        small={size === "small"}
                        hover="#24C0FF"
                        onClick={onClickMore}
                    />
                </InnerBoxStart>
                {size !== "small" && (
                    <Button
                        id="remove-track-btn"
                        color="dark-1"
                        title="remove from moodqueue"
                        icon={<SubtractCircle color="status-error" size={size} />}
                        onClick={() => {
                            onClickRemove()
                            notifySuccess(
                                `${track.name} has been removed from your queue`,
                                size !== "small" ? "right" : undefined
                            )
                        }}
                    />
                )}
            </OuterBox>
        </motion.div>
    )
}
