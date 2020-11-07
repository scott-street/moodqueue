import { Box, Text } from "grommet"
import React, { FunctionComponent } from "react"
import { Mood } from "../../../types/Mood"
import { FormAction, update } from "../reducer"
import { MoodButton } from "../../../ui/moodButton/MoodButton"

interface MoodSelectionProps {
    progress: number
    moodIndex: number
    size: string
    dispatch(value: FormAction): void
}

export const MoodSelection: FunctionComponent<MoodSelectionProps> = (props) => {
    const { size, moodIndex, progress, dispatch } = props

    const handleSelect = (i) => {
        let prog = progress
        let index = i
        if (moodIndex === -1) prog++
        if (moodIndex === i) {
            prog--
            index = -1
        }
        dispatch(update("mood", index))
        dispatch(update("progress", prog))
    }

    if (size === "small") {
        return (
            <Box gap="small" align="center">
                <Text textAlign="center" weight="bold">
                    what music are you in the mood for?
                </Text>
                <Box gap="small" align="center">
                    <Box direction="row" gap="small" overflow={{ horizontal: "auto" }} pad="xsmall">
                        {Object.keys(Mood).map(
                            (mood, i) =>
                                i <= 1 &&
                                isNaN(Number(Mood[mood])) && (
                                    <MoodButton
                                        key={i}
                                        selected={moodIndex === i}
                                        mood={mood}
                                        onClick={() => {
                                            handleSelect(i)
                                        }}
                                        size={size}
                                        id={`mood-box-${i}`}
                                    />
                                )
                        )}
                    </Box>
                    <Box direction="row" gap="small" overflow={{ horizontal: "auto" }} pad="xsmall">
                        {Object.keys(Mood).map(
                            (mood, i) =>
                                i > 1 &&
                                isNaN(Number(Mood[mood])) && (
                                    <MoodButton
                                        key={i}
                                        selected={moodIndex === i}
                                        mood={mood}
                                        onClick={() => {
                                            handleSelect(i)
                                        }}
                                        size={size}
                                        id={`mood-box-${i}`}
                                    />
                                )
                        )}
                    </Box>
                </Box>
            </Box>
        )
    } else {
        return (
            <Box gap="small" align="center">
                <Text textAlign="center" size="large" weight="bold">
                    what music are you in the mood for?
                </Text>
                <Box direction="row" gap="small" pad="xsmall">
                    {Object.keys(Mood).map(
                        (mood, i) =>
                            isNaN(Number(Mood[mood])) && (
                                <MoodButton
                                    key={i}
                                    selected={moodIndex === i}
                                    mood={mood}
                                    onClick={() => {
                                        let prog = progress
                                        let index = i
                                        if (moodIndex === -1) prog++
                                        if (moodIndex === i) {
                                            prog--
                                            index = -1
                                        }
                                        dispatch(update("mood", index))
                                        dispatch(update("progress", prog))
                                    }}
                                    size={size}
                                    id={`mood-box-${i}`}
                                />
                            )
                    )}
                </Box>
            </Box>
        )
    }
}
