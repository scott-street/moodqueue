import { Box, CheckBox, Text } from "grommet"
import React, { FunctionComponent } from "react"
import { FormSelection } from "../../../types/FormSelection"
import { FormAction, update, updateSourceSelection } from "../reducer"
import { motion } from "framer-motion"

interface SourceSelectionProps {
    progress: number
    source: FormSelection
    size: string
    dispatch(value: FormAction): void
}

export const SourceSelection: FunctionComponent<SourceSelectionProps> = (props) => {
    const { size, source, progress, dispatch } = props

    const updateProgressAfterCheckboxChange = (index: number, checked: boolean) => {
        const current = source
        let prog = progress
        let selected: FormSelection = {
            saved: index === 0 ? checked : source.saved,
            tracks: index === 1 ? checked : source.tracks,
            artists: index === 2 ? checked : source.artists,
            recommended: index === 3 ? checked : source.recommended,
        }
        if (
            selected.artists === false &&
            selected.recommended === false &&
            selected.tracks === false &&
            selected.saved === false
        ) {
            prog--
        } else if (
            current.artists === false &&
            current.recommended === false &&
            current.tracks === false &&
            current.saved === false
        ) {
            prog++
        }
        dispatch(update("progress", prog))
    }

    return (
        <Box
            direction="row"
            align="start"
            fill="horizontal"
            justify={size !== "small" ? "center" : "evenly"}
            gap={size !== "small" ? "xlarge" : undefined}
        >
            <Text textAlign="center" size={size !== "small" ? "medium" : "small"}>
                choose from your:
            </Text>
            <Box gap="small">
                <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                    <CheckBox
                        id="saved-checkbox"
                        label={
                            <Box>
                                <Text size={size !== "small" ? "medium" : "xsmall"}>
                                    saved songs
                                </Text>
                            </Box>
                        }
                        checked={source.saved}
                        onChange={(event) => {
                            updateProgressAfterCheckboxChange(0, event.target.checked)
                            dispatch(updateSourceSelection("saved", event.target.checked))
                        }}
                    />
                </motion.div>
                <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                    <CheckBox
                        id="tracks-checkbox"
                        label={
                            <Box>
                                <Text size={size !== "small" ? "medium" : "xsmall"}>
                                    top tracks
                                </Text>
                            </Box>
                        }
                        checked={source.tracks}
                        onChange={(event) => {
                            updateProgressAfterCheckboxChange(1, event.target.checked)
                            dispatch(updateSourceSelection("tracks", event.target.checked))
                        }}
                    />
                </motion.div>
                <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                    <CheckBox
                        id="artists-checkbox"
                        label={
                            <Box>
                                <Text size={size !== "small" ? "medium" : "xsmall"}>
                                    top artists
                                </Text>
                            </Box>
                        }
                        checked={source.artists}
                        onChange={(event) => {
                            updateProgressAfterCheckboxChange(2, event.target.checked)
                            dispatch(updateSourceSelection("artists", event.target.checked))
                        }}
                    />
                </motion.div>
                <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                    <CheckBox
                        id="recommended-checkbox"
                        label={
                            <Box>
                                <Text size={size !== "small" ? "medium" : "xsmall"}>
                                    recommended
                                </Text>
                            </Box>
                        }
                        checked={source.recommended}
                        onChange={(event) => {
                            updateProgressAfterCheckboxChange(3, event.target.checked)
                            dispatch(updateSourceSelection("recommended", event.target.checked))
                        }}
                    />
                </motion.div>
            </Box>
        </Box>
    )
}
