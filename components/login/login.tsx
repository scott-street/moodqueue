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

interface LoginProps {
    size: string
}
export const Login: React.FunctionComponent<LoginProps> = (props) => {
    const { size } = props
    const { openSpotifyAccountLogin, redirect } = useAuth()
    return (
        <LoginBackground>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1.5, delay: 1.5 }}
            >
                <Logo
                    header={false}
                    size={size}
                    textAlign={size == "small" ? "center" : "start"}
                    margin={{ top: "none" }}
                    id="login-title-txt"
                />
            </motion.div>
            <LoginDescription small={size === "small"} />
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1.5, delay: 2.5 }}
                style={{
                    flex: 1,
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                }}
            >
                <Box align="center" gap="small" id="spotify-login-box">
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
