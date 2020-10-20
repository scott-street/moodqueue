import React from "react"
import { Mood as Happy } from "@styled-icons/material-twotone/Mood"
import { MoodBad as Sad } from "@styled-icons/material-twotone/MoodBad"
import { Heading as LogoHeader } from "grommet"

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
        <LogoHeader
            id={id}
            size={header ? "small" : "large"}
            textAlign={textAlign}
            margin={margin}
            style={{ userSelect: "none" }}
        >
            m
            <Happy
                onClick={() => window.open("https://www.youtube.com/watch?v=cI0wUoCLnLk")}
                style={{ cursor: "pointer" }}
                width={size === "small" ? (header ? "24px" : "36px") : header ? "24px" : "48px"}
                height={size === "small" ? (header ? "24px" : "36px") : header ? "24px" : "48px"}
                id="happy-emoji"
            />
            <Sad
                onClick={() => window.open("https://www.youtube.com/watch?v=dQw4w9WgXcQ")}
                style={{ cursor: "pointer" }}
                width={size === "small" ? (header ? "24px" : "36px") : header ? "24px" : "48px"}
                height={size === "small" ? (header ? "24px" : "36px") : header ? "24px" : "48px"}
                id="sad-emoji"
            />
            dqueue
        </LogoHeader>
    )
}
