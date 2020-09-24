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
        <Box fill justify="between" overflow={{ horizontal: "hidden" }}>
            <Header
                justify={size !== "small" ? "evenly" : "center"}
                direction={size !== "small" ? "row" : "column"}
            >
                <Box border="between" gap="small">
                    <Heading
                        id="app-name-txt"
                        textAlign={size !== "small" ? "start" : "center"}
                        size={size !== "small" ? "large" : "medium"}
                        margin="none"
                    >
                        moodqueue
                    </Heading>
                    <Text
                        weight={size !== "small" ? "bold" : "normal"}
                        textAlign={size !== "small" ? "start" : "center"}
                        size={size}
                    >
                        let your mood inspire you
                    </Text>
                </Box>
                {size !== "small" && (
                    <Box direction="row" align="center" gap="small">
                        <Heading textAlign="center" margin="none" id="username-txt">
                            {name}
                        </Heading>
                        {props.user.profileImages[0] ? (
                            <Avatar
                                id="avatar-profile-image"
                                src={props.user.profileImages[0].url}
                                size="xlarge"
                                border={{ size: "small", side: "all", color: "accent-1" }}
                                onClick={() => window.open(props.user.profileUrl, "_blank")}
                                title="click to open your spotify profile"
                            />
                        ) : (
                            <Avatar
                                id="avatar-default"
                                background="accent-2"
                                border={{ size: "small", side: "all", color: "accent-1" }}
                                size="large"
                                onClick={() => window.open(props.user.profileUrl, "_blank")}
                                title="click to open your spotify profile"
                            >
                                <User color="accent-1" size="large" />
                            </Avatar>
                        )}
                    </Box>
                )}
            </Header>
            <Box
                align="center"
                margin="small"
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
                        size: "xlarge",
                        style: "outset",
                        color: "accent-1",
                    }}
                    background={{ color: "#2F3E4D", opacity: 0.7 }}
                    round="large"
                    margin={size === "small" ? "small" : undefined}
                    pad={{
                        horizontal: size !== "small" ? "medium" : "small",
                    }}
                >
                    {loading ? (
                        <Box align="center" justify="center" fill>
                            <BounceLoader
                                size={size === "large" ? 300 : size === "medium" ? 200 : 100}
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
                </Box>
            </Box>
            {size === "small" && (
                <Box align="center">
                    {props.user.profileImages[0] ? (
                        <Avatar
                            id="avatar-profile-image-small"
                            src={props.user.profileImages[0].url}
                            size={size !== "small" ? "xlarge" : "large"}
                            border={{ size: "small", side: "all", color: "accent-1" }}
                            onClick={() => window.open(props.user.profileUrl, "_blank")}
                            title="click to open your spotify profile"
                        />
                    ) : (
                        <Avatar
                            id="avatar-default-small"
                            background="accent-2"
                            border={{ size: "small", side: "all", color: "accent-1" }}
                            size={size !== "small" ? "large" : "medium"}
                            onClick={() => window.open(props.user.profileUrl, "_blank")}
                            title="click to open your spotify profile"
                        >
                            <User color="accent-1" size={size !== "small" ? "large" : "medium"} />
                        </Avatar>
                    )}
                </Box>
            )}
        </Box>
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
