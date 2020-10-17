import React from "react"
import { Box } from "grommet"
import { Spotify } from "grommet-icons"
import { useAuth } from "../../common/hooks/useAuth"
import { motion } from "framer-motion"
import { Button } from "../../ui/button/Button"
import { Logo } from "../../ui/logo/Logo"
import { LoginDescription } from "../../ui/login-description/LoginDescription"
import { LoginBackground } from "../../ui/backgrounds/login/LoginBackground"
import { Description } from "../../ui/description/Description"
import { baseItemTop } from "../animations/motion"

interface LoginProps {
    size: string
}
export const Login: React.FunctionComponent<LoginProps> = (props) => {
    const { size } = props
    const { openSpotifyAccountLogin, redirect } = useAuth()
    return (
        <LoginBackground>
            <motion.div variants={baseItemTop} animate="visible" initial="hidden">
                <Logo
                    header={false}
                    size={size}
                    textAlign={size == "small" ? "center" : "start"}
                    margin="none"
                    id="login-title-txt"
                />
            </motion.div>
            <Box alignSelf="center" justify="center" fill>
                <LoginDescription small={size === "small"} />
            </Box>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1.5, delay: 2.5 }}
            >
                <Box
                    align="center"
                    gap="small"
                    id="spotify-login-box"
                    justify="end"
                    flex
                    alignSelf="end"
                >
                    <Description size="small" text="Get Started" header />
                    <Button
                        id="login-btn"
                        text={size !== "small" ? "Login to Spotify" : "login"}
                        icon={
                            <Spotify color="dark-2" size={size !== "small" ? "large" : "medium"} />
                        }
                        onClick={() => openSpotifyAccountLogin(redirect, size)}
                    />
                </Box>
            </motion.div>
        </LoginBackground>
    )
}
