import React, { useState } from "react"
import { AnimatePresence, motion, useMotionValue } from "framer-motion"
import { OuterBox, InnerBox } from "./TrackDetails.styles"
import { Layer, Image, Text, Anchor } from "grommet"
import { Track } from "../../types/Track"
import { Spotify, SubtractCircle } from "grommet-icons"
import { Button } from "../button/Button"
import { useNotification } from "../../common/hooks/useNotification"
import { trackDetailsVariants } from "../../components/animations/motion"
import { useDrag } from "react-use-gesture"

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
    const [isDragUp, setIsDragUp] = useState(false)
    const { notifySuccess } = useNotification()
    const y = useMotionValue(0)

    const bind = useDrag(
        ({ down, movement: [, my], active, vxvy: [, vy] }) => {
            y.set(down ? my : 0)
            if (my < 50 && !active && vy < -0.5) {
                setIsDragUp(true)
                setIsOpen(false)
                setTimeout(() => close(), 500)
            }
            if (my > 50 && !active && vy > 0.5) {
                setIsDragUp(false)
                setIsOpen(false)
                setTimeout(() => close(), 500)
            }
        },
        {
            axis: "y",
        }
    )

    if (size !== "small") {
        return (
            <Layer
                id="options-layer"
                animation={false}
                position="center"
                responsive={false}
                onClickOutside={() => {
                    setIsOpen(false)
                    setTimeout(() => close(), 500)
                }}
                style={{
                    background: "transparent",
                    borderRadius: 30,
                }}
            >
                <motion.div
                    variants={trackDetailsVariants(size)}
                    animate={isOpen ? "open" : "closed"}
                    initial={{ scale: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <OuterBox
                        round={{ corner: "bottom" }}
                        pad={{ top: "xsmall", bottom: "small", horizontal: "xsmall" }}
                        gap="small"
                        border={{
                            side: "all",
                            color: "accent-1",
                            size: "small",
                        }}
                    >
                        <Image
                            src={track.imageLink}
                            fit="contain"
                            fill={false}
                            id="album-artwork-img"
                        />
                        <InnerBox
                            gap="small"
                            pad={{ vertical: "xsmall", horizontal: "medium" }}
                            round
                            fill
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
                        </InnerBox>
                    </OuterBox>
                </motion.div>
            </Layer>
        )
    } else {
        return (
            <Layer
                id="options-layer"
                animation={false}
                position="bottom"
                responsive={false}
                onClickOutside={() => {
                    setIsOpen(false)
                    setTimeout(() => close(), 500)
                }}
                style={{
                    background: "transparent",
                    borderRadius: 0,
                    width: "100%",
                }}
            >
                <motion.div
                    {...bind()}
                    style={{ y }}
                    variants={trackDetailsVariants(size, isDragUp)}
                    animate={isOpen ? "open" : "closed"}
                    initial={{ y: 500, opacity: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <OuterBox
                        pad={{ top: "xsmall", bottom: "small", horizontal: "xsmall" }}
                        gap="medium"
                    >
                        <Image src={track.imageLink} fit="contain" fill id="album-artwork-img" />
                        <InnerBox
                            gap="medium"
                            pad={{ vertical: "xsmall", horizontal: "medium" }}
                            round
                            fill="horizontal"
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
                            <motion.div whileTap={{ scale: 0.9 }}>
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
                                                `${track.name} has been removed from your queue`
                                            )
                                            close()
                                        }, 500)
                                    }}
                                />
                            </motion.div>
                        </InnerBox>
                    </OuterBox>
                </motion.div>
            </Layer>
        )
    }
}
