import React from "react"
import { motion } from "framer-motion"
import { DescriptionText, SmallDescriptionText } from "./LoginDescription.styles"

interface LoginDescriptionProps {
    small?: boolean
}
export const LoginDescription: React.FunctionComponent<LoginDescriptionProps> = (props) => {
    const { small } = props
    return (
        <motion.div id="container-frame">
            <motion.div id="top-mask-frame" style={{ overflow: "hidden" }}>
                <motion.div
                    id="top-frame"
                    initial={small ? { y: 60 * 1.2 } : { y: 100 * 1.2 }}
                    animate={{ y: 0 }}
                    transition={{ ease: "easeIn", duration: 1 }}
                >
                    {small ? (
                        <SmallDescriptionText>Your Music</SmallDescriptionText>
                    ) : (
                        <DescriptionText>Your Music</DescriptionText>
                    )}
                </motion.div>
            </motion.div>
            <motion.div id="bottom-mask-frame" style={{ overflow: "hidden" }}>
                <motion.div
                    id="bottom-frame"
                    initial={small ? { y: -60 * 1.2 } : { y: -100 * 1.2 }}
                    animate={{ y: 0 }}
                    transition={{ ease: "easeIn", duration: 1 }}
                >
                    {small ? (
                        <SmallDescriptionText>Your Mood</SmallDescriptionText>
                    ) : (
                        <DescriptionText>Your Mood</DescriptionText>
                    )}
                </motion.div>
            </motion.div>
        </motion.div>
    )
}
