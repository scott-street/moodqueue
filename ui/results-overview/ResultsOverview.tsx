import { motion } from "framer-motion"
import { Box, Layer } from "grommet"
import React, { useState } from "react"
import { getSourcesString } from "../../common/Helpers"
import { resultsOverviewVariants } from "../../components/animations/motion"
import { FormSelection } from "../../types/FormSelection"
import { Mood } from "../../types/Mood"
import { Track } from "../../types/Track"
import { Tooltip } from "../button/Tooltip"
import { Description } from "../description/Description"

interface ResultsOverviewProps {
    size: any
    source: FormSelection
    selectedGenreValue: string
    tracks: Track[]
    mood: Mood
}

export const ResultsOverview: React.FunctionComponent<ResultsOverviewProps> = (props) => {
    const { size, source, selectedGenreValue, tracks, mood } = props
    const [showHeaderModal, setShowHeaderModal] = useState(false)
    const [isOpen, setIsOpen] = useState(false)

    return (
        <Box align="center">
            <Tooltip
                tooltip={{
                    text: "click for an overview of your moodqueue!",
                    id: "overview-tooltip",
                    active: size !== "small",
                }}
            >
                <motion.div
                    whileTap={{ scale: 0.9 }}
                    style={{
                        width: "100%",
                        alignItems: "center",
                        display: "flex",
                        justifyContent: "center",
                        borderRadius: 30,
                    }}
                >
                    <Box
                        direction="row"
                        gap="medium"
                        align="center"
                        pad={{ horizontal: "medium", vertical: "xsmall" }}
                        margin={{ horizontal: "small" }}
                        onClick={() => {
                            setIsOpen(true)
                            setShowHeaderModal(true)
                        }}
                        background={{ color: "light-2", opacity: 0.1 }}
                        round
                        focusIndicator={false}
                        style={{ outline: "none" }}
                    >
                        <Description
                            truncate
                            id="desc-num-songs"
                            textAlign="center"
                            size={size !== "small" ? "xlarge" : "medium"}
                            weight="bold"
                            text={
                                tracks
                                    ? "here's your " +
                                      `${
                                          mood >= 0
                                              ? Mood[mood].toLowerCase() + " moodqueue..."
                                              : "moodqueue..."
                                      }`
                                    : "loading..."
                            }
                        />
                    </Box>
                </motion.div>
            </Tooltip>
            {showHeaderModal && (
                <Layer
                    onClickOutside={() => {
                        setIsOpen(false)
                        setTimeout(() => setShowHeaderModal(false), 500)
                    }}
                    responsive={false}
                    position="center"
                    style={{ background: "transparent" }}
                    animation={false}
                >
                    <motion.div
                        variants={resultsOverviewVariants()}
                        animate={isOpen ? "open" : "closed"}
                        initial={{ opacity: 0, y: -500 }}
                        transition={{ duration: 0.5 }}
                    >
                        <Box
                            gap="medium"
                            align="center"
                            round="large"
                            pad="large"
                            background={{ color: "#5DADE2", opacity: 0.8, dark: true }}
                        >
                            <Description
                                id="desc-num-songs"
                                textAlign="center"
                                size={size !== "small" ? "xlarge" : "medium"}
                                weight="bold"
                                text={
                                    tracks
                                        ? tracks.length +
                                          " " +
                                          `${
                                              mood >= 0
                                                  ? Mood[mood].toLowerCase() + " songs"
                                                  : " songs"
                                          }`
                                        : "loading..."
                                }
                            />
                            <Description
                                id="desc-sources"
                                textAlign="center"
                                size={size !== "small" ? "xlarge" : "medium"}
                                text={`based on ${
                                    !selectedGenreValue
                                        ? "your " + getSourcesString(source)
                                        : selectedGenreValue.replace("-", " ")
                                }`}
                            />
                        </Box>
                    </motion.div>
                </Layer>
            )}
        </Box>
    )
}
