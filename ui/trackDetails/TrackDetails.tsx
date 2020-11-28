import React, { useState } from "react"
import { motion } from "framer-motion"
import { OuterBox, InnerBox } from "./TrackDetails.styles"
import { Layer, Image, Text, Anchor, Box } from "grommet"
import { Track } from "../../types/Track"
import { Down, Spotify, SubtractCircle } from "grommet-icons"
import { Button } from "../button/Button"
import { useNotification } from "../../common/hooks/useNotification"
import { colorMovementTracks, trackDetailsVariants } from "../../components/animations/motion"

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

    if (size !== "small") {
        return (
            <Layer
                id="options-layer-web"
                animation={false}
                position="center"
                onClickOutside={() => {
                    setIsOpen(false)
                    setTimeout(() => close(), 500)
                }}
                style={{
                    background: "transparent",
                    alignItems: "center",
                    display: "flex",
                    justifyContent: "center",
                }}
            >
                <motion.div
                    variants={trackDetailsVariants(size)}
                    animate={isOpen ? "open" : "closed"}
                    initial={{ scale: 0 }}
                    transition={{ duration: 0.5 }}
                    style={{ width: "75%", height: "75%", display: "flex" }}
                >
                    <motion.div
                        animate={colorMovementTracks}
                        style={{
                            borderBottomRightRadius: 30,
                            borderBottomLeftRadius: 30,
                            width: "100%",
                            height: "100%",
                            display: "flex",
                        }}
                    >
                        <OuterBox
                            round={{ corner: "bottom" }}
                            pad={{ top: "xsmall", bottom: "small", horizontal: "xsmall" }}
                            gap="small"
                            style={{ width: "75%", height: "75%" }}
                        >
                            <Image
                                src={track.imageLink}
                                id="album-artwork-img-web"
                                fit="contain"
                                fill
                            />
                            <InnerBox
                                gap="small"
                                pad={{ vertical: "xsmall", horizontal: "medium" }}
                                round
                                background={{ dark: true }}
                            >
                                {track.previewUrl && (
                                    <audio
                                        controls
                                        loop
                                        id="previewPlayer-web"
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
                                            sorry, your browser does not support the audio element
                                            :(
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
                </motion.div>
            </Layer>
        )
    } else {
        return (
            <Layer
                id="options-layer-mobile"
                animation={false}
                position="bottom"
                responsive={false}
                onClickOutside={() => {
                    setIsOpen(false)
                    setTimeout(() => {
                        close()
                    }, 500)
                }}
                style={{
                    background: "transparent",
                    width: "100%",
                }}
            >
                <motion.div
                    variants={trackDetailsVariants(size)}
                    animate={isOpen ? "open" : "closed"}
                    initial={{ y: 500, opacity: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <motion.div animate={colorMovementTracks}>
                        <OuterBox pad={{ top: "xsmall", horizontal: "xsmall" }} gap="medium">
                            <Image
                                src={track.imageLink}
                                fit="contain"
                                fill
                                id="album-artwork-img-mobile"
                            />
                            <InnerBox
                                gap="medium"
                                pad={{ horizontal: "medium" }}
                                fill="horizontal"
                                background={{ dark: true }}
                            >
                                {track.previewUrl && (
                                    <audio
                                        controls
                                        loop
                                        id="previewPlayer-mobile"
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
                                            sorry, your browser does not support the audio element
                                            :(
                                        </Text>
                                    </audio>
                                )}
                                <Box direction="row" align="center" gap="medium">
                                    <motion.div whileTap={{ scale: 0.9 }}>
                                        <Button
                                            id="open-spotify-btn"
                                            text="open"
                                            icon={<Spotify />}
                                            small
                                            onClick={() =>
                                                window.open(
                                                    `https://open.spotify.com/track/${track.id}`,
                                                    "_blank"
                                                )
                                            }
                                        />
                                    </motion.div>
                                    <motion.div whileTap={{ scale: 0.9 }}>
                                        <Button
                                            id="remove-btn"
                                            small
                                            icon={<SubtractCircle />}
                                            text="remove"
                                            color="neutral-4"
                                            onClick={() => {
                                                setIsOpen(false)
                                                setTimeout(() => {
                                                    onClickRemove()
                                                    notifySuccess(
                                                        `${track.name} has been removed from your moodqueue`
                                                    )
                                                    close()
                                                }, 500)
                                            }}
                                        />
                                    </motion.div>
                                </Box>
                                <motion.div whileTap={{ scale: 0.9 }}>
                                    <Button
                                        small
                                        color="transparent"
                                        id="back-btn"
                                        icon={<Down color="accent-1" />}
                                        onClick={() => {
                                            setIsOpen(false)
                                            setTimeout(() => {
                                                close()
                                            }, 500)
                                        }}
                                    />
                                </motion.div>
                            </InnerBox>
                        </OuterBox>
                    </motion.div>
                </motion.div>
            </Layer>
        )
    }
}
