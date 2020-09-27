import { Box, Button, RangeInput, Text } from "grommet"
import { Add, Subtract } from "grommet-icons"
import React, { FunctionComponent } from "react"
import { FormAction, update } from "../reducer"
import { motion } from "framer-motion"

interface SizePickerProps {
    progress: number
    numSongs: number
    size: string
    dispatch(value: FormAction): void
}

export const SizePicker: FunctionComponent<SizePickerProps> = (props) => {
    const { size, numSongs, progress, dispatch } = props
    return (
        <Box gap="xsmall" fill="horizontal">
            <Text textAlign="center" size={size !== "small" ? "medium" : "small"}>
                number of songs:{" "}
                <Text
                    textAlign="center"
                    color="accent-1"
                    size={size !== "small" ? "medium" : "small"}
                >
                    {numSongs}
                </Text>
            </Text>
            <Box direction="row" align="center" gap="small">
                {size !== "small" && (
                    <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                        <Button
                            id="subtract-btn"
                            icon={<Subtract size={size !== "small" ? "medium" : "small"} />}
                            style={{ borderRadius: 30 }}
                            onClick={() => {
                                let num = numSongs
                                let prog = progress
                                if (num - 1 === 0) prog--
                                if (num - 1 >= 0) num--
                                dispatch(update("progress", prog))
                                dispatch(update("numSongs", num))
                            }}
                        />
                    </motion.div>
                )}
                <RangeInput
                    id="size-picker"
                    max={50}
                    min={0}
                    step={1}
                    name="size-picker"
                    value={numSongs}
                    onChange={(event) => {
                        let prog = progress
                        const value = +event.target.value
                        if (value > 0 && numSongs === 0) prog++
                        else if (value === 0) prog--
                        dispatch(update("progress", prog))
                        dispatch(update("numSongs", value))
                    }}
                />
                {size !== "small" && (
                    <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                        <Button
                            id="add-btn"
                            icon={<Add size={size !== "small" ? "medium" : "small"} />}
                            style={{ borderRadius: 30 }}
                            onClick={() => {
                                let num = numSongs
                                let prog = progress
                                if (num === 0) prog++
                                if (num + 1 <= 50) num++
                                dispatch(update("progress", prog))
                                dispatch(update("numSongs", num))
                            }}
                        />
                    </motion.div>
                )}
            </Box>
        </Box>
    )
}
