import React from "react"
import { Box, Heading, Text, Button } from "grommet"
import { Spotify } from "grommet-icons"
import { useAuth } from "../../common/hooks/useAuth"
import { motion } from "framer-motion"
import { baseContainer, baseItemTop } from "../animations/motion"
import { Mood as Happy } from "@styled-icons/material-twotone/Mood"
import { MoodBad as Sad } from "@styled-icons/material-twotone/MoodBad"

interface LoginProps {
    size: string
}
export const Login: React.FunctionComponent<LoginProps> = (props) => {
    const { size } = props
    const { openSpotifyAccountLogin, redirect } = useAuth()
    return (
        <Box align="center" justify="center" fill flex pad="medium">
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
                        size: "large",
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
                                    onClick={() =>
                                        window.open("https://www.youtube.com/watch?v=Tw0zYd0eIlk")
                                    }
                                    style={{ cursor: "pointer" }}
                                    width={size !== "small" ? "48px" : "24px"}
                                    height={size !== "small" ? "48px" : "24px"}
                                    id="happy-emoji"
                                />
                                <Sad
                                    onClick={() =>
                                        window.open("https://www.youtube.com/watch?v=dQw4w9WgXcQ")
                                    }
                                    style={{ cursor: "pointer" }}
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
                    <motion.div
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className="item"
                        variants={baseItemTop}
                    >
                        <Button
                            id="login-btn"
                            alignSelf="center"
                            style={
                                size !== "small"
                                    ? { borderRadius: 50, padding: "20px 30px 20px 30px" }
                                    : undefined
                            }
                            size={size !== "large" ? "medium" : "large"}
                            onClick={() => openSpotifyAccountLogin(redirect, size)}
                            label={size !== "small" ? "Login to Spotify" : "Login"}
                            icon={<Spotify size={size !== "large" ? "medium" : "large"} />}
                            hoverIndicator="accent-1"
                            primary
                        />
                    </motion.div>
                </Box>
            </motion.div>
        </Box>
    )
}
