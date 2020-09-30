import { Avatar, Box, Header, Heading, Text } from "grommet"
import { User } from "grommet-icons"
import React, { FunctionComponent, useState } from "react"
import { BounceLoader } from "react-spinners"
import { getTrackSourceFromFormSelection } from "../../common/Helpers"
import { useSpotify } from "../../common/hooks/useSpotify"
import { defaultFormSelection, FormSelection } from "../../types/FormSelection"
import { Mood } from "../../types/Mood"
import { Track } from "../../types/Track"
import { defaultUser, UserInfo } from "../../types/UserInfo"
import { Form } from "../form"
import { Results } from "../results"
import { motion } from "framer-motion"
import { baseContainer, baseItemBottom } from "../animations/motion"
import { Mood as Happy } from "@styled-icons/material-twotone/Mood"
import { MoodBad as Sad } from "@styled-icons/material-twotone/MoodBad"

interface HomeProps {
    user: UserInfo
    size: string
}

export const Home: FunctionComponent<HomeProps> = (props) => {
    const { user, size } = props
    const name = user.name ? user.name.toLowerCase() : "stranger"
    const [showResults, setShowResults] = useState(false)
    const [mood, setMood] = useState<Mood>(-1)
    const [source, setSource] = useState<FormSelection>(defaultFormSelection)
    const [tracks, setTracks] = useState<Track[]>()
    const [loading, setLoading] = useState(false)
    const { getQueue } = useSpotify()

    return (
        <motion.div
            style={{ width: "100%", height: "100%" }}
            className="container"
            variants={baseContainer}
            initial="hidden"
            animate="visible"
        >
            <Box fill justify="between" overflow={{ horizontal: "hidden" }} pad="xsmall">
                <Header justify="evenly" direction="row">
                    <Box border="between" gap="small">
                        <Heading
                            id="app-name-txt"
                            textAlign={size !== "small" ? "start" : "center"}
                            size="medium"
                            margin="none"
                        >
                            m
                            <Happy
                                onClick={() =>
                                    window.open("https://www.youtube.com/watch?v=cI0wUoCLnLk")
                                }
                                style={{ cursor: "pointer" }}
                                width={size !== "small" ? "36px" : "24px"}
                                height={size !== "small" ? "36px" : "24px"}
                                id="happy-emoji-hdr"
                            />
                            <Sad
                                onClick={() =>
                                    window.open("https://www.youtube.com/watch?v=dQw4w9WgXcQ")
                                }
                                style={{ cursor: "pointer" }}
                                width={size !== "small" ? "36px" : "24px"}
                                height={size !== "small" ? "36px" : "24px"}
                                id="sad-emoji-hdr"
                            />
                            dqueue
                        </Heading>
                        <Text
                            textAlign={size !== "small" ? "start" : "center"}
                            size={size !== "small" ? "medium" : "small"}
                        >
                            let your mood inspire you
                        </Text>
                    </Box>

                    <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                        <Box direction="row" align="center" gap="small">
                            {size !== "small" && (
                                <Heading
                                    textAlign="center"
                                    margin="none"
                                    id="username-txt"
                                    size="small"
                                >
                                    {name}
                                </Heading>
                            )}
                            {props.user.profileImages[0] ? (
                                <Avatar
                                    id="avatar-profile-image"
                                    src={props.user.profileImages[0].url}
                                    size={size !== "small" ? "large" : "medium"}
                                    border={{ size: "small", side: "all", color: "accent-1" }}
                                    onClick={() => window.open(props.user.profileUrl, "_blank")}
                                    title="click to open your spotify profile"
                                />
                            ) : (
                                <Avatar
                                    id="avatar-default"
                                    background="accent-2"
                                    border={{ size: "small", side: "all", color: "accent-1" }}
                                    size={size !== "small" ? "large" : "medium"}
                                    onClick={() => window.open(props.user.profileUrl, "_blank")}
                                    title="click to open your spotify profile"
                                >
                                    <User
                                        color="accent-1"
                                        size={size !== "small" ? "large" : "medium"}
                                    />
                                </Avatar>
                            )}
                        </Box>
                    </motion.div>
                </Header>
                <Box
                    align="center"
                    margin={{
                        horizontal: "small",
                        vertical: size !== "small" ? "xsmall" : "none",
                    }}
                    fill="vertical"
                    flex
                    justify="center"
                    overflow="auto"
                >
                    <Box
                        fill
                        flex
                        justify={size !== "large" ? "between" : "evenly"}
                        align="center"
                        border={{
                            side: "all",
                            size: "large",
                            style: "outset",
                            color: "accent-1",
                        }}
                        background={{ color: "#2F3E4D", opacity: 0.7 }}
                        round="large"
                        margin={size === "small" ? "small" : undefined}
                        pad={{
                            horizontal: size !== "small" ? "medium" : "small",
                            vertical: "small",
                        }}
                    >
                        <motion.div
                            className="item"
                            variants={baseItemBottom}
                            style={{ width: "100%", height: "100%" }}
                        >
                            {loading ? (
                                <Box align="center" justify="center" fill>
                                    <BounceLoader
                                        size={
                                            size === "large" ? 300 : size === "medium" ? 200 : 100
                                        }
                                        color="#6FFFB0"
                                    />
                                </Box>
                            ) : showResults ? (
                                <Results
                                    tracks={tracks}
                                    size={size}
                                    mood={mood}
                                    source={source}
                                    resetForm={() => setShowResults(false)}
                                />
                            ) : (
                                <Form
                                    size={size}
                                    handleSubmit={(mood, numSongs, source) => {
                                        setLoading(true)
                                        const trackSources = getTrackSourceFromFormSelection(source)
                                        getQueue(trackSources, numSongs, mood).then((data) => {
                                            setTracks(data)
                                            setMood(mood)
                                            setSource(source)
                                            setLoading(false)
                                            setShowResults(true)
                                        })
                                    }}
                                />
                            )}
                        </motion.div>
                    </Box>
                </Box>
            </Box>
        </motion.div>
    )
}

export async function getStaticProps() {
    return {
        props: {
            user: defaultUser,
            size: "large",
        },
    }
}
