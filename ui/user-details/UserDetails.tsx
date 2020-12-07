import React, { useState } from "react"
import { motion } from "framer-motion"
import { Box, Heading, Avatar, Layer, Anchor } from "grommet"
import { Spotify, User } from "grommet-icons"
import { UserInfo } from "../../types/UserInfo"
import { Logout } from "@styled-icons/heroicons-outline/Logout"
import { useAuth } from "../../common/hooks/useAuth"
import { Button } from "../button/Button"
import { colorMovementSettings } from "../../components/animations/motion"

interface UserDetailsProps {
    user: UserInfo
    small?: boolean
}
export const UserDetails: React.FunctionComponent<UserDetailsProps> = (props) => {
    const { user, small } = props
    const { logOut } = useAuth()
    const [showLayer, setShowLayer] = useState(false)

    return (
        <Box>
            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                <Box
                    direction="row"
                    align="center"
                    gap="small"
                    title="settings"
                    onClick={() => setShowLayer(true)}
                    focusIndicator={false}
                    style={{ outline: "none" }}
                >
                    {!small && (
                        <Heading
                            textAlign="center"
                            margin="none"
                            id="username-txt"
                            size="small"
                            style={{ userSelect: "none" }}
                        >
                            {user.name}
                        </Heading>
                    )}
                    {user.profileImages[0] ? (
                        <Avatar
                            id="avatar-profile-image"
                            src={user.profileImages[0].url}
                            border={{ size: "small", side: "all", color: "accent-1" }}
                        />
                    ) : (
                        <Avatar
                            id="avatar-default"
                            background="accent-2"
                            border={{ size: "small", side: "all", color: "accent-1" }}
                        >
                            <User color="accent-1" />
                        </Avatar>
                    )}
                </Box>
            </motion.div>
            {showLayer && (
                <Layer
                    id="settings-layer"
                    position={small ? "bottom" : "top-right"}
                    responsive={false}
                    margin="xsmall"
                    onClickOutside={() => setShowLayer(false)}
                    style={{
                        background: "transparent",
                        width: small ? "100%" : undefined,
                    }}
                >
                    <motion.div animate={colorMovementSettings} style={{ borderRadius: 30 }}>
                        <Box
                            align="center"
                            pad={{ horizontal: "large", vertical: "medium" }}
                            background={{ dark: true }}
                            round
                            justify="between"
                            gap={small ? "medium" : "small"}
                        >
                            <Box align="center">
                                {user.profileImages[0] ? (
                                    <Avatar
                                        id="avatar-profile-image"
                                        src={user.profileImages[0].url}
                                        title={user.name}
                                        size="xlarge"
                                        border={{ size: "small", side: "all", color: "accent-1" }}
                                    />
                                ) : (
                                    <Avatar
                                        id="avatar-default"
                                        background="accent-2"
                                        size="xlarge"
                                        title={user.name}
                                        border={{ size: "small", side: "all", color: "accent-1" }}
                                    >
                                        <User color="accent-1" />
                                    </Avatar>
                                )}
                                {small && (
                                    <Heading
                                        textAlign="center"
                                        margin="none"
                                        id="username-txt"
                                        size="small"
                                        color="light-2"
                                        style={{ userSelect: "none" }}
                                    >
                                        {user.name}
                                    </Heading>
                                )}
                            </Box>
                            <Box align="center" gap={small ? "medium" : "small"}>
                                <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                                    <Anchor
                                        id="spotify-anchor"
                                        alignSelf="center"
                                        href={user.profileUrl}
                                        title="click to open your spotify profile!"
                                        target="blank"
                                        label="open profile"
                                        icon={<Spotify />}
                                    />
                                </motion.div>
                                <Button
                                    text="log out"
                                    color="neutral-4"
                                    icon={
                                        <Logout
                                            width={small ? "24px" : "26px"}
                                            height={small ? "24px" : "26px"}
                                        />
                                    }
                                    onClick={logOut}
                                    small
                                />
                            </Box>
                        </Box>
                    </motion.div>
                </Layer>
            )}
        </Box>
    )
}
