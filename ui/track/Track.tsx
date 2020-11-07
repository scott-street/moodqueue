import React, { useState } from "react"
import { OuterBox, InnerBoxStart } from "./Track.styles"
import { Box, Image, Text } from "grommet"
import { More, SubtractCircle, Trash } from "grommet-icons"
import { Track as TrackType } from "../../types/Track"
import { Button } from "../button/Button"
import { MoonLoader } from "react-spinners"
import { useNotification } from "../../common/hooks/useNotification"
import { useDrag } from "react-use-gesture"
import { motion, useMotionValue, useTransform } from "framer-motion"

interface TrackProps {
    size?: any
    track: TrackType
    onClickMore?: () => void
    onClickRemove?: () => void
}
export const Track: React.FunctionComponent<TrackProps> = (trackProps) => {
    const { track, onClickMore, onClickRemove } = trackProps
    const [loading, setLoading] = useState(true)
    const [isDrag, setIsDrag] = useState(false)
    const { notifySuccess } = useNotification()
    const x = useMotionValue(0)
    const xInput = [-100, 0, 100]
    const bg = useTransform(x, xInput, [
        "linear-gradient(45deg, rgba(244,67,255,1) 0%, rgba(255,64,64,1) 100%)",
        "linear-gradient(215deg, rgba(63, 94, 251, 1) 30%, rgba(252, 70, 107, 1) 100%)",
        "linear-gradient(45deg, #00C9FF 0%, #92FE9D 100%)",
    ])
    const bind = useDrag(
        (state) => {
            x.set(state.down ? state.movement[0] : 0)
            if (state.movement[0] < 0) setIsDrag(true)
            if (!state.active) setIsDrag(false)
            if (state.swipe[0] === -1) {
                onClickRemove()
                notifySuccess(
                    `${track.name} has been removed from your queue`,
                    trackProps.size !== "small" ? "right" : undefined
                )
            }
        },
        {
            axis: "x",
            lockDirection: true,
        }
    )

    return (
        <motion.div
            whileHover={{ scale: 1.05 }}
            initial={{ opacity: 0, y: 100 }}
            animate={{
                opacity: 1,
                transition: { duration: 0.5 },
                y: 0,
                x: 0,
            }}
            exit={{ opacity: 0 }}
            style={{
                x,
                width: "100%",
                background: bg,
                borderRadius: 30,
                borderBottomRightRadius: 0,
                touchAction: "pan-y",
            }}
            {...bind()}
            key={track.id}
        >
            <OuterBox
                pad={{
                    vertical: trackProps.size === "small" ? "small" : "none",
                    horizontal: trackProps.size === "small" ? "large" : "medium",
                }}
                border={{
                    side: "all",
                    size: "small",
                    color: "accent-1",
                }}
                background={{ dark: true }}
            >
                <InnerBoxStart
                    gap="small"
                    pad={{ vertical: "small", right: "small" }}
                    round="small"
                    background={{ dark: true }}
                >
                    <Box direction="row" align="center" gap="small" round="small">
                        <Box
                            flex={false}
                            background={{
                                color: trackProps.size !== "small" ? "#1F2730" : undefined,
                                opacity: 0.6,
                            }}
                            pad={trackProps.size !== "small" ? "xsmall" : "none"}
                            round="small"
                            align="center"
                            width={
                                trackProps.size === "large"
                                    ? "144px"
                                    : trackProps.size === "medium"
                                    ? "120px"
                                    : "72px"
                            }
                            height={
                                trackProps.size === "large"
                                    ? "144px"
                                    : trackProps.size === "medium"
                                    ? "120px"
                                    : "72px"
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
                                    fit="cover"
                                />
                            )}
                        </Box>
                        <Box align="start">
                            <Box overflow="hidden">
                                <Text
                                    truncate
                                    style={{ userSelect: "none" }}
                                    textAlign="start"
                                    weight="bold"
                                    size={
                                        trackProps.size === "large"
                                            ? "xxlarge"
                                            : trackProps.size === "medium"
                                            ? "xlarge"
                                            : trackProps.size
                                    }
                                >
                                    {track.name}
                                </Text>
                            </Box>
                            <Box overflow="hidden">
                                <Text
                                    truncate
                                    style={{ userSelect: "none" }}
                                    textAlign="start"
                                    size={
                                        trackProps.size === "large"
                                            ? "medium"
                                            : trackProps.size === "medium"
                                            ? "small"
                                            : "xsmall"
                                    }
                                >
                                    {track.artist}
                                </Text>
                            </Box>
                        </Box>
                    </Box>
                    {!isDrag ? (
                        <Button
                            id="more-details-btn"
                            title="more"
                            fill={false}
                            icon={<More size={trackProps.size === "small" ? "medium" : "large"} />}
                            small={trackProps.size === "small"}
                            hover={trackProps.size !== "small" ? "#24C0FF" : "dark-1"}
                            onClick={onClickMore}
                        />
                    ) : (
                        <Trash size={trackProps.size === "small" ? "medium" : "large"} />
                    )}
                </InnerBoxStart>
                {trackProps.size !== "small" && !isDrag && (
                    <Button
                        id="remove-track-btn"
                        color="dark-1"
                        title="remove from moodqueue"
                        icon={<SubtractCircle color="status-error" size="large" />}
                        onClick={() => {
                            onClickRemove()
                            notifySuccess(
                                `${track.name} has been removed from your queue`,
                                trackProps.size !== "small" ? "right" : undefined
                            )
                        }}
                    />
                )}
            </OuterBox>
        </motion.div>
    )
}
