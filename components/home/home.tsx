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
import { Button } from "../../ui/button/Button"
import { FormClose } from "grommet-icons"

interface HomeProps {
    user: UserInfo
    size: string
}

export const Home: FunctionComponent<HomeProps> = (props) => {
    const { user, size } = props
    const [showResults, setShowResults] = useState(false)
    const [mood, setMood] = useState<Mood>(-1)
    const [source, setSource] = useState<FormSelection>(defaultFormSelection)
    const [selectedGenreValue, setSelectedGenreValue] = useState("")
    const [tracks, setTracks] = useState<Track[]>()
    const [loading, setLoading] = useState(false)
    const { getQueue } = useSpotify()

    return (
        <HomeBackground>
            <Header
                justify="between"
                direction="row"
                margin={{ horizontal: size !== "small" ? "large" : "large" }}
            >
                <Logo id="app-name-txt" textAlign="center" header size={size} margin="none" />
                <UserDetails user={user} small={size === "small"} />
            </Header>
            <Content size={size}>
                {loading ? (
                    <Box align="center" justify="center" fill gap="large">
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
                        selectedGenreValue={selectedGenreValue}
                        source={source}
                        resetForm={() => setShowResults(false)}
                        userProduct={user.product}
                    />
                ) : (
                    <Form
                        size={size}
                        handleSubmit={(
                            mood,
                            numSongs,
                            source,
                            selectedGenreValue,
                            topGenres?: string[]
                        ) => {
                            setLoading(true)
                            const trackSources = getTrackSourceFromFormSelection(source)
                            getQueue(trackSources, numSongs, mood, topGenres).then((data) => {
                                setTracks(data)
                                setMood(mood)
                                setSource(source)
                                setSelectedGenreValue(selectedGenreValue)
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
