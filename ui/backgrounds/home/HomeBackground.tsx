import React from "react"
import { motion } from "framer-motion"
import { baseContainer } from "../../../components/animations/motion"
import { HomeBackground as HomeBackgroundOuter } from "../Background.styles"

export const HomeBackground: React.FunctionComponent = (props) => {
    return (
        <motion.div
            style={{ width: "100%", height: "100%", overflow: "hidden" }}
            className="container"
            variants={baseContainer}
            initial="hidden"
            animate="visible"
        >
            <HomeBackgroundOuter id="home-outer-box">{props.children}</HomeBackgroundOuter>
        </motion.div>
    )
}
