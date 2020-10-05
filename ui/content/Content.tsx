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
        <ContentOuter margin="small">
            <ContentInner
                border={{
                    side: "all",
                    size: "xlarge",
                    style: "outset",
                    color: "accent-1",
                }}
                justify={size !== "large" ? "between" : "evenly"}
                background={{ color: "#2F3E4D", opacity: 0.7 }}
                round="large"
                margin={size === "small" ? "small" : undefined}
                pad={{
                    horizontal: size !== "small" ? "medium" : "small",
                }}
            >
                <motion.div variants={baseItemBottom} style={{ width: "100%", height: "100%" }}>
                    {props.children}
                </motion.div>
            </ContentInner>
        </ContentOuter>
    )
}
