import React, { useState } from "react"
import { motion } from "framer-motion"
import { OuterBox, InnerBox } from "./TrackDetails.styles"
import { Layer, Image, Text, Anchor } from "grommet"
import { Track } from "../../types/Track"
import { Spotify, SubtractCircle } from "grommet-icons"
import { Button } from "../button/Button"
import { useNotification } from "../../common/hooks/useNotification"
import { trackDetailsVariants } from "../../components/animations/motion"

interface TrackDetailsProps {
    size?: any
    track: Track
    setVolume?: () => void
    onClickRemove?: () => void
    close?: () => void
}

export const TrackDetails: React.FunctionComponent<TrackDetailsProps> = (props) => {
    const { size, track, setVolume, onClickRemove, close } = props
    const [isOpen, setIsOpen] = useState(true)
    const { notifySuccess } = useNotification()

    return (
        <Layer
            id="options-layer"
            animation={false}
            position={size !== "small" ? "center" : "bottom"}
            responsive={false}
            onClickOutside={() => {
                setIsOpen(false)
                setTimeout(() => close(), 500)
            }}
            style={{
                background: "transparent",
                borderRadius: size !== "small" ? 30 : 0,
                width: size === "small" ? "100%" : undefined,
            }}
        >
            <motion.div
                variants={trackDetailsVariants(size)}
                animate={isOpen ? "open" : "closed"}
                initial={size !== "small" ? { scale: 0 } : { y: 500, opacity: 0 }}
                transition={{ duration: 0.5 }}
            >
                <OuterBox
                    round={size !== "small" ? { corner: "bottom" } : undefined}
                    pad={{ top: "xsmall", bottom: "small", horizontal: "xsmall" }}
                    gap={size !== "small" ? "small" : "medium"}
                    border={{ side: "all", color: "accent-1", size: "small" }}
                >
                    <Image
                        src={track.imageLink}
                        fit="contain"
                        fill={size === "small"}
                        id="album-artwork-img"
                    />
                    <InnerBox
                        gap={size !== "small" ? "small" : "medium"}
                        pad={{ vertical: "xsmall", horizontal: "medium" }}
                        round
                        fill={size !== "small" ? true : "horizontal"}
                        background={{ dark: true }}
                    >
                        {track.previewUrl && (
                            <audio
                                controls
                                loop
                                id="previewPlayer"
                                style={{
                                    outline: "none",
                                    width: "100%",
                                    borderRadius: 30,
                                }}
                                onCanPlay={setVolume}
                                controlsList="nodownload"
                            >
                                <source src={track.previewUrl} type="audio/mp3" />
                                <Text textAlign="center">
                                    sorry, your browser does not support the audio element :(
                                </Text>
                            </audio>
                        )}
                        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.9 }}>
                            <Anchor
                                id="spotify-anchor"
                                alignSelf="center"
                                href={`https://open.spotify.com/track/${track.id}`}
                                target="blank"
                                label={`Open ${track.name} in Spotify`}
                                icon={<Spotify />}
                            />
                        </motion.div>
                        {size === "small" && (
                            <Button
                                id="remove-btn"
                                small
                                icon={<SubtractCircle />}
                                text="remove from queue"
                                color="neutral-4"
                                onClick={() => {
                                    setIsOpen(false)
                                    setTimeout(() => {
                                        onClickRemove()
                                        notifySuccess(
                                            `${track.name} has been removed from your queue`,
                                            size !== "small" ? "right" : undefined
                                        )
                                        close()
                                    }, 500)
                                }}
                            />
                        )}
                    </InnerBox>
                </OuterBox>
            </motion.div>
        </Layer>
    )
}
