import React from "react"
import { motion } from "framer-motion"
import { Box } from "grommet"
import { Description } from "../description/Description"

interface LoginDescriptionProps {
    small?: boolean
}
export const LoginDescription: React.FunctionComponent<LoginDescriptionProps> = (props) => {
    const { small } = props
    return (
        <Box gap="medium" align="center">
            <Box id="top-mask-frame">
                <motion.div
                    id="top-frame"
                    initial={
                        small
                            ? { y: 60 * 1.2, x: 0, opacity: 0 }
                            : { y: 100 * 1.2, x: 0, opacity: 0 }
                    }
                    animate={{ y: 0, x: 0, opacity: 1 }}
                    transition={{ ease: "easeIn", duration: 1, delay: 1 }}
                >
                    <Description header size="xlarge" text="Your Music" textAlign="center" />
                </motion.div>
            </Box>
            <Box id="bottom-mask-frame">
                <motion.div
                    id="bottom-frame"
                    initial={
                        small
                            ? { y: -60 * 1.2, x: 0, opacity: 0 }
                            : { y: -100 * 1.2, x: 0, opacity: 0 }
                    }
                    animate={{ y: 0, x: 0, opacity: 1 }}
                    transition={{ ease: "easeIn", duration: 1, delay: 1 }}
                >
                    <Description header size="xlarge" text="Your Mood" textAlign="center" />
                </motion.div>
            </Box>
        </Box>
    )
}
