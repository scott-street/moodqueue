import React from "react"
import { motion } from "framer-motion"
import { Box, Heading, Avatar } from "grommet"
import { User } from "grommet-icons"
import { UserInfo } from "../../types/UserInfo"

interface UserDetailsProps {
    user: UserInfo
    small?: boolean
}
export const UserDetails: React.FunctionComponent<UserDetailsProps> = (props) => {
    const { user, small } = props

    return (
        <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
            <Box direction="row" align="center" gap="small">
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
                        onClick={() => window.open(user.profileUrl, "_blank")}
                        title="click to open your spotify profile"
                    />
                ) : (
                    <Avatar
                        id="avatar-default"
                        background="accent-2"
                        border={{ size: "small", side: "all", color: "accent-1" }}
                        onClick={() => window.open(user.profileUrl, "_blank")}
                        title="click to open your spotify profile"
                    >
                        <User color="accent-1" />
                    </Avatar>
                )}
            </Box>
        </motion.div>
    )
}
