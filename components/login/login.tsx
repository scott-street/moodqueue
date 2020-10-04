import React from "react"
import { Box, Heading, Text } from "grommet"
import { Spotify } from "grommet-icons"
import { useAuth } from "../../common/hooks/useAuth"
import { motion } from "framer-motion"
import { baseContainer, baseItemTop } from "../animations/motion"
import { Mood as Happy } from "@styled-icons/material-twotone/Mood"
import { MoodBad as Sad } from "@styled-icons/material-twotone/MoodBad"
import { Button } from "../../ui/button/Button"

interface LoginProps {
    size: string
}
export const Login: React.FunctionComponent<LoginProps> = (props) => {
    const { size } = props
    const { openSpotifyAccountLogin, redirect } = useAuth()
    return (
        <Box align="center" justify="center" fill flex>
            <motion.div
                style={{ width: "100%", height: "100%" }}
                className="container"
                variants={baseContainer}
                initial="hidden"
                animate="visible"
            >
                <Box
                    fill
                    flex
                    align="center"
                    justify="evenly"
                    round="large"
                    border={{
                        side: "all",
                        size: "xlarge",
                        style: "outset",
                        color: "accent-1",
                    }}
                    overflow="auto"
                    background={{ color: "#2F3E4D", opacity: 0.7 }}
                >
                    <Box align="center" margin={size === "small" ? "small" : undefined}>
                        <motion.div
                            className="item"
                            variants={baseItemTop}
                            style={{ textAlign: "center" }}
                        >
                            <Heading
                                id="login-title-txt"
                                margin={{ top: "none" }}
                                textAlign="center"
                                size={size !== "small" ? "large" : "medium"}
                            >
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
                            </Heading>
                            <Text
                                textAlign="center"
                                size={size !== "small" ? "large" : "medium"}
                                id="login-desc-txt"
                            >
                                update your queue and get inspired
                            </Text>
                        </motion.div>
                    </Box>
                    <Button
                        id="login-btn"
                        primary
                        color="accent-1"
                        text="Login"
                        icon={<Spotify color={"#666666"} />}
                        onClick={() => openSpotifyAccountLogin(redirect, size)}
                    />
                </Box>
            </motion.div>
        </Box>
    )
}
