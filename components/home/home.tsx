import { Box, Header, Heading } from "grommet"
import React, { FunctionComponent, useEffect, useState } from "react"
import { BounceLoader } from "react-spinners"
import { getTrackSourceFromFormSelection } from "../../common/Helpers"
import { useSpotify } from "../../common/hooks/useSpotify"
import { defaultFormSelection, FormSelection } from "../../types/FormSelection"
import { Mood } from "../../types/Mood"
import { Track } from "../../types/Track"
import { defaultUser, UserInfo } from "../../types/UserInfo"
import { Form } from "../form"
import { Results } from "../results"
import { Mood as Happy } from "@styled-icons/material-twotone/Mood"
import { MoodBad as Sad } from "@styled-icons/material-twotone/MoodBad"
import { UserAvatar } from "./avatar"
import { Settings } from "./settings"
import { HomeBackground } from "../../ui/backgrounds/home/HomeBackground"
import { Description } from "../../ui/description/Description"
import { Content } from "../../ui/content/Content"

interface HomeProps {
    user: UserInfo
    size: string
}

export const Home: FunctionComponent<HomeProps> = (props) => {
    const { user, size } = props
    const [showResults, setShowResults] = useState(false)
    const [mood, setMood] = useState<Mood>(-1)
    const [source, setSource] = useState<FormSelection>(defaultFormSelection)
    const [tracks, setTracks] = useState<Track[]>()
    const [loading, setLoading] = useState(false)
    const [resultsLayout, setResultsLayout] = useState("")
    const [showLayer, setShowLayer] = useState(false)
    const { getQueue } = useSpotify()

    useEffect(() => {
        const resultsLayout = localStorage.getItem("resultsLayout") || "fun"
        setResultsLayout(resultsLayout)
    }, [])

    return (
        <HomeBackground>
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
                    <Description
                        textAlign={size !== "small" ? "start" : "center"}
                        size={size !== "small" ? "medium" : "small"}
                        text="let your mood inspire you"
                    />
                </Box>
                <UserAvatar user={user} size={size} handleAvatarClick={() => setShowLayer(true)} />
            </Header>
            <Content size={size}>
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
                        layout={resultsLayout}
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
            </Content>
            {showLayer && (
                <Settings
                    profileUrl={user.profileUrl}
                    size={size}
                    resultsLayout={resultsLayout}
                    handleResultsLayoutChange={(checked) => {
                        localStorage.setItem("resultsLayout", checked ? "fun" : "normal")
                        setResultsLayout(checked ? "fun" : "normal")
                    }}
                    close={() => setShowLayer(false)}
                />
            )}
        </HomeBackground>
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
