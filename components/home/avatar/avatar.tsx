import { Avatar, Box, Heading } from "grommet"
import { User } from "grommet-icons"
import React, { FunctionComponent } from "react"
import { motion } from "framer-motion"
import { UserInfo } from "../../../types/UserInfo"

interface UserAvatarProps {
    user: UserInfo
    size: string
    handleAvatarClick(): void
}

export const UserAvatar: FunctionComponent<UserAvatarProps> = (props) => {
    const { user, size, handleAvatarClick } = props
    const name = user.name ? user.name.toLowerCase() : "stranger"
    return (
        <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
            <Box
                direction="row"
                align="center"
                gap="small"
                onClick={handleAvatarClick}
                focusIndicator={false}
                style={{ outline: "none" }}
            >
                {size !== "small" && (
                    <Heading textAlign="center" margin="none" id="username-txt" size="small">
                        {name}
                    </Heading>
                )}
                {user.profileImages[0] ? (
                    <Avatar
                        id="avatar-profile-image"
                        src={user.profileImages[0].url}
                        size={size !== "small" ? "large" : "medium"}
                        border={{ size: "small", side: "all", color: "accent-1" }}
                    />
                ) : (
                    <Avatar
                        id="avatar-default"
                        background="accent-2"
                        border={{ size: "small", side: "all", color: "accent-1" }}
                        size={size !== "small" ? "large" : "medium"}
                    >
                        <User color="accent-1" size={size !== "small" ? "large" : "medium"} />
                    </Avatar>
                )}
            </Box>
        </motion.div>
    )
}
