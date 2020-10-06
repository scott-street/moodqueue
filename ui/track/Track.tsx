import React from "react"
import { OuterBox, InnerBoxStart } from "./Track.styles"
import { Box, Image, Text } from "grommet"
import { More, SubtractCircle } from "grommet-icons"
import { getShortenedName } from "../../common/Helpers"
import { Track as TrackType } from "../../types/Track"
import { Button } from "../button/Button"

interface TrackProps {
    size?: any
    align?: string
    track: TrackType
    onClickMore?: () => void
    onClickRemove?: () => void
}
export const Track: React.FunctionComponent<TrackProps> = (props) => {
    const { size, align, track, onClickMore, onClickRemove } = props

    return (
        <OuterBox
            pad={{
                vertical: size !== "small" ? "large" : "xlarge",
                horizontal: size !== "small" ? "medium" : "large",
            }}
            alignSelf={align === "start" ? "start" : align === "end" ? "end" : "center"}
            border={{
                side: "all",
                size: size !== "small" ? "medium" : "small",
                color: "accent-3",
            }}
            background={{ dark: true }}
            style={{
                background:
                    !align || align === "start"
                        ? "linear-gradient(215deg, rgba(63,94,251,1) 30%, rgba(252,70,107,1) 100%)"
                        : align === "end"
                        ? "linear-gradient(215deg, rgba(252,70,107,1) 0%, rgba(63,94,251,1) 60%)"
                        : "radial-gradient(circle, rgba(63,94,251,1) 25%, rgba(252,70,107,1) 100%)",
                width: align
                    ? size === "large"
                        ? "70%"
                        : size === "medium"
                        ? "80%"
                        : "90%"
                    : "100%",
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
                        width={size === "large" ? "84px" : size === "medium" ? "72px" : "72px"}
                        height={size === "large" ? "84px" : size === "medium" ? "72px" : "72px"}
                    >
                        <Image fill alignSelf="center" src={track.imageLink} fit="contain" />
                    </Box>
                    <Box align="start">
                        <Text
                            weight="bold"
                            textAlign="start"
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
                    onClick={onClickRemove}
                />
            )}
        </OuterBox>
    )
}
