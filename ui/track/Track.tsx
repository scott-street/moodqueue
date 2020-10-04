import React from "react"
import { OuterBox, InnerBoxStart } from "./Track.styles"
import { Box, Image, Text } from "grommet"
import { More, SubtractCircle } from "grommet-icons"
import { getShortenedTrackName } from "../../common/Helpers"
import { Track as TrackType } from "../../types/Track"
import { Button } from "../button/Button"

interface TrackProps {
    size?: any
    track: TrackType
    onClickMore?: () => void
    onClickRemove?: () => void
}
export const Track: React.FunctionComponent<TrackProps> = (props) => {
    const { size, track, onClickMore, onClickRemove } = props

    return (
        <OuterBox
            pad={{
                vertical: "xlarge",
                horizontal: size !== "small" ? "xlarge" : "large",
            }}
            border={{ side: "all", size: "medium", color: "accent-3" }}
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
                <Button
                    id="more-details-btn"
                    title="more"
                    icon={<More size={size === "large" ? "large" : "medium"} />}
                    small={false}
                    fill={false}
                    hover="dark-1"
                    onClick={onClickMore}
                />
            </InnerBoxStart>
            {size !== "small" && (
                <Button
                    id="remove-track-btn"
                    hover="dark-1"
                    title="remove from moodqueue"
                    small={false}
                    fill={false}
                    icon={
                        <SubtractCircle
                            color="status-error"
                            size={size === "large" ? "large" : "medium"}
                        />
                    }
                    onClick={onClickRemove}
                />
            )}
        </OuterBox>
    )
}
