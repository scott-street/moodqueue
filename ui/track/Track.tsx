import React, { useState } from "react"
import { OuterBox, InnerBoxStart } from "./Track.styles"
import { Box, Image, Text } from "grommet"
import { More, SubtractCircle, Trash } from "grommet-icons"
import { getShortenedName, getSwipeThreshold, swipePower } from "../../common/Helpers"
import { Track as TrackType } from "../../types/Track"
import { Button } from "../button/Button"
import { MoonLoader } from "react-spinners"
import { useNotification } from "../../common/hooks/useNotification"
import { useSpring, animated, interpolate } from "react-spring"
import { useGesture, useDrag } from "react-use-gesture"

const calc = (x, y) => [-(y - window.innerHeight / 2) / 20, (x - window.innerWidth / 2) / 20, 1.1]

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
    const [{ x, y }, set] = useSpring(() => ({ x: 0, y: 0 }))

    // Set the drag hook and define component movement based on gesture data
    const bind = useDrag(({ down, movement: [mx, my] }) => {
        set({ x: down ? mx : 0, y: down ? my : 0 })
    })

    return (
        <animated.div
            style={{
                //background: bg,
                borderRadius: 30,
                borderBottomRightRadius: 0,
                display: "flex",
                flexDirection: "row-reverse",
                alignItems: "center",
            }}
        >
            <Trash
                size="large"
                style={{
                    paddingRight: 25,
                    paddingLeft: 25,
                    display: isDrag ? undefined : "none",
                }}
            />
            <animated.div {...bind()} style={{ x, y }}>
                <OuterBox
                    pad={{
                        vertical: trackProps.size === "small" ? "small" : "none",
                        horizontal: trackProps.size === "small" ? "large" : "medium",
                    }}
                    border={{
                        side: "all",
                        size: trackProps.size !== "small" ? "medium" : "small",
                        color: "accent-3",
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
                                        fit="contain"
                                    />
                                )}
                            </Box>
                            <Box align="start">
                                <Text
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
                                    {trackProps.size === "small"
                                        ? getShortenedName(track.name, true)
                                        : track.name}
                                </Text>
                                <Text
                                    textAlign="start"
                                    size={
                                        trackProps.size === "large"
                                            ? "medium"
                                            : trackProps.size === "medium"
                                            ? "small"
                                            : "xsmall"
                                    }
                                >
                                    {trackProps.size === "small"
                                        ? getShortenedName(track.artist, false)
                                        : track.artist}
                                </Text>
                            </Box>
                        </Box>
                        <Button
                            id="more-details-btn"
                            title="more"
                            fill={false}
                            icon={<More size={trackProps.size === "large" ? "large" : "medium"} />}
                            small={trackProps.size === "small"}
                            hover="#24C0FF"
                            onClick={onClickMore}
                        />
                    </InnerBoxStart>
                    {trackProps.size !== "small" && (
                        <Button
                            id="remove-track-btn"
                            color="dark-1"
                            title="remove from moodqueue"
                            icon={<SubtractCircle color="status-error" size={trackProps.size} />}
                            onClick={() => {
                                setIsDrag(false)
                                onClickRemove()
                                notifySuccess(
                                    `${track.name} has been removed from your queue`,
                                    trackProps.size !== "small" ? "right" : undefined
                                )
                            }}
                        />
                    )}
                </OuterBox>
            </animated.div>
        </animated.div>
    )
}
