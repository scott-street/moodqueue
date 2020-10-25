import { Box, Text } from "grommet"
import React, { FunctionComponent } from "react"
import { FormAction, update } from "../reducer"
import { NumberSelector } from "../../../ui/number-selector/NumberSelector"

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
            <Text weight="bold" textAlign="center" size={size !== "small" ? "large" : "medium"}>
                number of songs:{" "}
                <Text
                    textAlign="center"
                    color="accent-1"
                    size={size !== "small" ? "large" : "medium"}
                >
                    {numSongs}
                </Text>
            </Text>
            <NumberSelector
                size={size}
                onChange={(value) => {
                    let prog = progress
                    if (value > 0 && numSongs === 0) prog++
                    else if (value === 0) prog--
                    dispatch(update("progress", prog))
                    dispatch(update("numSongs", value))
                }}
                onClickAdd={() => {
                    let num = numSongs
                    let prog = progress
                    if (num === 0) prog++
                    if (num + 1 <= 50) num++
                    dispatch(update("progress", prog))
                    dispatch(update("numSongs", num))
                }}
                onClickSubtract={() => {
                    let num = numSongs
                    let prog = progress
                    if (num - 1 === 0) prog--
                    if (num - 1 >= 0) num--
                    dispatch(update("progress", prog))
                    dispatch(update("numSongs", num))
                }}
                numSongs={numSongs}
            />
        </Box>
    )
}
