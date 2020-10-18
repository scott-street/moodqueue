import { Box, Header } from "grommet"
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
import { HomeBackground } from "../../ui/backgrounds/home/HomeBackground"
import { Content } from "../../ui/content/Content"
import { Logo } from "../../ui/logo/Logo"
import { UserDetails } from "../../ui/user-details/UserDetails"

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
    const { getQueue } = useSpotify()

    return (
        <HomeBackground>
            <Header justify="evenly" direction="row">
                <Logo id="app-name-txt" textAlign="center" header size={size} margin="none" />
                <UserDetails user={user} small={size === "small"} />
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
                        resetForm={() => setShowResults(false)}
                    />
                ) : (
                    <Form
                        size={size}
                        handleSubmit={(mood, numSongs, source, topGenres?: string[]) => {
                            setLoading(true)
                            const trackSources = getTrackSourceFromFormSelection(source)
                            getQueue(trackSources, numSongs, mood, topGenres).then((data) => {
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
