import React from "react"
import { Mood as Happy } from "@styled-icons/material-twotone/Mood"
import { MoodBad as Sad } from "@styled-icons/material-twotone/MoodBad"
import { LogoHeader } from "./Logo.styles"

interface LogoProps {
    id?: string
    size?: any
    textAlign?: any
    margin?: any
}
export const Logo: React.FunctionComponent<LogoProps> = (props) => {
    const { id, size, textAlign, margin } = props

    return (
        <LogoHeader id={id} size={size} textAlign={textAlign} margin={margin}>
            m
            <Happy
                width={size !== "small" ? "48px" : "24px"}
                height={size !== "small" ? "48px" : "24px"}
                id="happy-emoji"
            />
            <Sad
                width={size !== "small" ? "48px" : "24px"}
                height={size !== "small" ? "48px" : "24px"}
                id="sad-emoji"
            />
            dqueue
        </LogoHeader>
    )
}
