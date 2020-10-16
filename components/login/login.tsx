import React from "react"
import { Heading } from "grommet"
import { Spotify } from "grommet-icons"
import { useAuth } from "../../common/hooks/useAuth"
import { motion } from "framer-motion"
import { Button } from "../../ui/button/Button"
import { Logo } from "../../ui/logo/Logo"
import { LoginDescription } from "../../ui/login-description/LoginDescription"

interface LoginProps {
    size: string
}
export const Login: React.FunctionComponent<LoginProps> = (props) => {
    const { size } = props
    const { openSpotifyAccountLogin, redirect } = useAuth()
    return (
        <>
            <div
                style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    width: "100%",
                    height: "100%",
                }}
            >
                <div
                    style={{
                        flex: 1,
                        padding: 10,
                        alignItems: size === "small" ? "center" : "flex-start",
                    }}
                >
                    <Logo
                        header={false}
                        size={size}
                        textAlign={size == "small" ? "center" : "start"}
                        margin={{ top: "none" }}
                        id="login-title-txt"
                    />
                </div>
                <div id="login-desc-txt" style={{ flex: 1 }}>
                    <LoginDescription small={size === "small"} />
                </div>
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1.5 }}
                    style={{
                        flex: 1,
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "center",
                        alignItems: "flex-end",
                    }}
                >
                    <Heading size="small">Get Started</Heading>
                </motion.div>

                {/* <Description
                        id="login-desc-txt"
                        textAlign="center"
                        text="update your queue and get inspired"
                        size={size !== "small" ? "large" : "medium"}
                    /> */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1.5 }}
                    style={{
                        flex: 1,
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "center",
                        alignItems: "flex-start",
                    }}
                >
                    <Button
                        id="login-btn"
                        text={size !== "small" ? "Login to Spotify" : "login"}
                        icon={
                            <Spotify
                                color={"#555555"}
                                size={size !== "small" ? "large" : "medium"}
                            />
                        }
                        onClick={() => openSpotifyAccountLogin(redirect, size)}
                    />
                </motion.div>
            </div>
        </>
    )
}
