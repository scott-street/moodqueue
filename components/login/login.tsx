import React from "react"
import { Box, Heading } from "grommet"
import { Spotify } from "grommet-icons"
import { useAuth } from "../../common/hooks/useAuth"
import { motion } from "framer-motion"
import { baseItemTop } from "../animations/motion"
import { Mood as Happy } from "@styled-icons/material-twotone/Mood"
import { MoodBad as Sad } from "@styled-icons/material-twotone/MoodBad"
import { Description } from "../../ui/description/Description"
import { Button } from "../../ui/button/Button"
import { LoginBackground } from "../../ui/backgrounds/login/LoginBackground"

interface LoginProps {
    size: string
}
export const Login: React.FunctionComponent<LoginProps> = (props) => {
    const { size } = props
    const { openSpotifyAccountLogin, redirect } = useAuth()
    return (
        <LoginBackground>
            <Box align="center" margin={size === "small" ? "small" : undefined}>
                <motion.div className="item" variants={baseItemTop} style={{ textAlign: "center" }}>
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
                    <Description
                        textAlign="center"
                        size={size !== "small" ? "large" : "medium"}
                        id="login-desc-txt"
                        text="update your queue and get inspired"
                    />
                </motion.div>
            </Box>
            <motion.div variants={baseItemTop}>
                <Button
                    id="login-btn"
                    text="Login"
                    icon={<Spotify color={"#666666"} />}
                    onClick={() => openSpotifyAccountLogin(redirect, size)}
                />
            </motion.div>
        </LoginBackground>
    )
}
