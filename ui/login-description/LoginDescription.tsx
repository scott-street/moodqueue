import React from "react"
import { motion } from "framer-motion"
import { DescriptionText, SmallDescriptionText } from "./LoginDescription.styles"
import { Box } from "grommet"
import { Description } from "../description/Description"

interface LoginDescriptionProps {
    small?: boolean
}
export const LoginDescription: React.FunctionComponent<LoginDescriptionProps> = (props) => {
    const { small } = props
    return (
        <Box justify="evenly" align="center" alignSelf="center" flex fill>
            <motion.div id="top-mask-frame" style={{ overflow: "hidden" }}>
                <motion.div
                    id="top-frame"
                    initial={small ? { y: 60 * 1.2, opacity: 0 } : { y: 100 * 1.2, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ ease: "easeIn", duration: 1, delay: 1 }}
                >
                    <Description
                        header
                        size="xlarge"
                        text="Your Music"
                        textAlign="center"
                        weight="bold"
                    />
                </motion.div>
            </motion.div>
            <motion.div id="bottom-mask-frame" style={{ overflow: "hidden" }}>
                <motion.div
                    id="bottom-frame"
                    initial={small ? { y: -60 * 1.2, opacity: 0 } : { y: -100 * 1.2, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ ease: "easeIn", duration: 1, delay: 1 }}
                >
                    <Description
                        header
                        size="xlarge"
                        text="Your Mood"
                        textAlign="center"
                        weight="bold"
                    />
                </motion.div>
            </motion.div>
        </Box>
    )
}
