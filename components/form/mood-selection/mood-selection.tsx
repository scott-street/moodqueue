import { Box, Text } from "grommet"
import { EmotionHappy as Happy } from "@styled-icons/remix-fill/EmotionHappy"
import { EmotionSad as Sad } from "@styled-icons/remix-fill/EmotionSad"
import { Bed as Sleepy } from "@styled-icons/boxicons-regular/Bed"
import { GlassCheers as Party } from "@styled-icons/fa-solid/GlassCheers"
import React, { FunctionComponent } from "react"
import { Mood } from "../../../types/Mood"
import { FormAction, update } from "../reducer"
import { motion } from "framer-motion"

interface MoodSelectionProps {
    progress: number
    moodIndex: number
    size: string
    dispatch(value: FormAction): void
}

export const MoodSelection: FunctionComponent<MoodSelectionProps> = (props) => {
    const { size, moodIndex, progress, dispatch } = props
    return (
        <Box gap="small" align="center">
            <Text textAlign="center" size={size !== "small" ? "medium" : "small"}>
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
                            <motion.div
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                key={i}
                            >
                                <Box
                                    id={`mood-box-${i}`}
                                    hoverIndicator={moodIndex === i ? "accent-3" : "accent-1"}
                                    style={{
                                        borderTopLeftRadius: 30,
                                        borderTopRightRadius: 30,
                                        borderBottomLeftRadius: 30,
                                        outline: "none",
                                    }}
                                    pad={{
                                        horizontal: "medium",
                                        vertical: "xsmall",
                                    }}
                                    align="center"
                                    background={moodIndex === i ? "accent-1" : "light-2"}
                                    gap="xsmall"
                                    focusIndicator={false}
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
                                    key={i}
                                >
                                    {size !== "small" && (
                                        <Text
                                            size="xsmall"
                                            weight="bold"
                                            textAlign="center"
                                            id="mood-txt"
                                        >
                                            {Mood[mood].toLowerCase()}
                                        </Text>
                                    )}
                                    {mood === Mood.HAPPY.toString() ? (
                                        <Happy width="32px" height="32px" id="happy-emoji" />
                                    ) : mood === Mood.SLEEPY.toString() ? (
                                        <Sleepy width="32px" height="32px" id="sleepy-emoji" />
                                    ) : mood === Mood.PARTY.toString() ? (
                                        <Party width="32px" height="32px" id="party-emoji" />
                                    ) : (
                                        <Sad width="32px" height="32px" id="sad-emoji" />
                                    )}
                                </Box>
                            </motion.div>
                        )
                )}
            </Box>
        </Box>
    )
}
