import React from "react"
import { motion } from "framer-motion"
import { ContentOuter, ContentInner } from "./Content.styles"
import { baseItemBottom } from "../../components/animations/motion"

interface ContentProps {
    size: any
}

export const Content: React.FunctionComponent<ContentProps> = (props) => {
    const { size } = props
    return (
        <ContentOuter
            margin={{
                horizontal: "small",
                vertical: size !== "small" ? "xsmall" : "none",
            }}
        >
            <ContentInner
                border={{
                    side: "all",
                    size: "large",
                    style: "outset",
                    color: "accent-1",
                }}
                justify={size !== "large" ? "between" : "evenly"}
                background={{ color: "#2F3E4D", opacity: 0.7 }}
                round="large"
                margin={size === "small" ? "small" : undefined}
                pad={{
                    horizontal: size !== "small" ? "medium" : "small",
                    vertical: "small",
                }}
            >
                {props.children}
            </ContentInner>
        </ContentOuter>
    )
}
