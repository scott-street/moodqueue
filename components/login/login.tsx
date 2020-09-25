import React from "react"
import { Box, Heading, Text, Button } from "grommet"
import { Spotify } from "grommet-icons"
import { useAuth } from "../../common/hooks/useAuth"

interface LoginProps {
    size: string
}
export const Login: React.FunctionComponent<LoginProps> = (props) => {
    const { size } = props
    const { openSpotifyAccountLogin, redirect } = useAuth()
    return (
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
            background={{ color: "#2F3E4D", opacity: 0.7 }}
        >
            <Box align="center" margin={size === "small" ? "small" : undefined}>
                <Heading
                    id="login-title-txt"
                    margin={{ top: "none" }}
                    textAlign="center"
                    size={size !== "small" ? "large" : "medium"}
                >
                    moodqueue
                </Heading>
                <Text
                    textAlign="center"
                    size={size !== "small" ? "large" : "medium"}
                    id="login-desc-txt"
                >
                    create playlists, update your queue, get inspired
                </Text>
            </Box>
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
        </Box>
    )
}
