import React from "react"
import { Box } from "grommet"
import { Spotify } from "grommet-icons"
import { useAuth } from "../../common/hooks/useAuth"
import { motion } from "framer-motion"
import { baseItemTop } from "../animations/motion"
import { Button } from "../../ui/button/Button"
import { LoginBackground } from "../../ui/backgrounds/login/LoginBackground"
import { Description } from "../../ui/description/Description"
import { Logo } from "../../ui/logo/Logo"

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
                    <Logo
                        header={false}
                        size={size !== "small" ? "large" : "medium"}
                        textAlign="center"
                        margin={{ top: "none" }}
                        id="login-title-txt"
                    />
                    <Description
                        id="login-desc-txt"
                        textAlign="center"
                        text="update your queue and get inspired"
                        size={size !== "small" ? "large" : "medium"}
                    />
                </motion.div>
            </Box>
            <motion.div
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                variants={baseItemTop}
            >
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
