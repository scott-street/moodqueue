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
    return (
        <div style={{ display: "flex", flexDirection: "column", marginTop: "5%" }}>
            <Text
                style={{ marginBottom: "5%" }}
                weight="bold"
                textAlign="center"
                size={size !== "small" ? "large" : "medium"}
            >
                what music are you in the mood for?
            </Text>

            <Box
                direction="row"
                gap="small"
                overflow={{ horizontal: size === "small" ? "auto" : undefined }}
                pad="xsmall"
            >
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
        </div>
    )
}
