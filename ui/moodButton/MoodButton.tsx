import React from "react"
import { motion } from "framer-motion"
import { MoodBox } from "./MoodButton.styles"
import { Text } from "grommet"
import { EmotionHappy as Happy } from "@styled-icons/remix-fill/EmotionHappy"
import { EmotionSad as Sad } from "@styled-icons/remix-fill/EmotionSad"
import { Bed as Sleepy } from "@styled-icons/boxicons-regular/Bed"
import { GlassCheers as Party } from "@styled-icons/fa-solid/GlassCheers"
import { Car as Driving } from "@styled-icons/boxicons-regular/Car"
import { Mood } from "../../types/Mood"

interface MoodButtonProps {
    id?: string
    mood?: string
    onClick?: () => void
    size?: any
    selected?: boolean
}
export const MoodButton: React.FunctionComponent<MoodButtonProps> = (props) => {
    const { id, mood, onClick, size, selected } = props

    return (
        <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
            <MoodBox
                id={id}
                hoverIndicator="accent-3"
                background={selected ? "accent-1" : "light-2"}
                focusIndicator={false}
                onClick={onClick}
                gap="xsmall"
                pad={{
                    horizontal: "medium",
                    vertical: "xsmall",
                }}
            >
                {size !== "small" && (
                    <Text
                        size="xsmall"
                        weight="bold"
                        textAlign="center"
                        id="mood-txt"
                        color="#555555"
                    >
                        {Mood[mood].toLowerCase()}
                    </Text>
                )}
                {mood === Mood.HAPPY.toString() ? (
                    <Happy width="32px" height="32px" id="happy-emoji" color="#555555" />
                ) : mood === Mood.SLEEPY.toString() ? (
                    <Sleepy width="32px" height="32px" id="sleepy-emoji" color="#555555" />
                ) : mood === Mood.PARTY.toString() ? (
                    <Party width="32px" height="32px" id="party-emoji" color="#555555" />
                ) : mood === Mood.SAD.toString() ? (
                    <Sad width="32px" height="32px" id="sad-emoji" color="#555555" />
                ) : (
                    <Driving width="32px" height="32px" id="driving-emoji" color="#555555" />
                )}
            </MoodBox>
        </motion.div>
    )
}
