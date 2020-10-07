import React from "react"
import { Mood as Happy } from "@styled-icons/material-twotone/Mood"
import { MoodBad as Sad } from "@styled-icons/material-twotone/MoodBad"
import { LogoHeader } from "./Logo.styles"

interface LogoProps {
    id?: string
    size?: any
    textAlign?: any
    margin?: any
    header?: boolean
}
export const Logo: React.FunctionComponent<LogoProps> = (props) => {
    const { id, size, textAlign, margin, header } = props

    return (
        <LogoHeader id={id} size={header ? "medium" : size} textAlign={textAlign} margin={margin}>
            m
            <Happy
                onClick={() => window.open("https://www.youtube.com/watch?v=cI0wUoCLnLk")}
                style={{ cursor: "pointer" }}
                width={size !== "small" ? (header ? "36px" : "48px") : "24px"}
                height={size !== "small" ? (header ? "36px" : "48px") : "24px"}
                id="happy-emoji"
            />
            <Sad
                onClick={() => window.open("https://www.youtube.com/watch?v=dQw4w9WgXcQ")}
                style={{ cursor: "pointer" }}
                width={size !== "small" ? (header ? "36px" : "48px") : "24px"}
                height={size !== "small" ? (header ? "36px" : "48px") : "24px"}
                id="sad-emoji"
            />
            dqueue
        </LogoHeader>
    )
}
