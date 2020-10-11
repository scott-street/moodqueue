import React, { FunctionComponent, Reducer, useEffect, useReducer } from "react"
import { Box } from "grommet"
import { formReducer, initialFormState, FormState, FormAction, resetFormState } from "./reducer"
import { MoodSelection } from "./mood-selection"
import { SizePicker } from "./size-picker"
import { SourceSelection } from "./souce"
import { FormSelection } from "../../types/FormSelection"
import { Mood } from "../../types/Mood"
import { Button } from "../../ui/button/Button"
import { Description } from "../../ui/description/Description"
import { motion } from "framer-motion"
import { baseItemBottom } from "../animations/motion"
import { useSpotify } from "../../common/hooks/useSpotify"
import { CircularProgress } from "@material-ui/core"

interface FormProps {
    size: string
    handleSubmit(mood: Mood, numSongs: number, source: FormSelection, topGenres?: string[]): void
}

export const Form: FunctionComponent<FormProps> = (props) => {
    const { handleSubmit, size } = props
    const [state, dispatch] = useReducer<Reducer<FormState, FormAction>>(
        formReducer,
        initialFormState
    )
    const [topGenres, setTopGenres] = React.useState<string[] | undefined>(undefined)
    const [selectedTopGenres, setSelectedTopGenres] = React.useState([])
    const { getAvailableSeedGenres } = useSpotify()

    useEffect(() => {
        document.title = "home | moodqueue"
        dispatch(resetFormState())
        getAvailableSeedGenres().then((genres) => setTopGenres(genres))
    }, [])

    if (topGenres === undefined) {
        return <CircularProgress />
    }
    return (
        <motion.div variants={baseItemBottom} style={{ width: "100%", height: "100%" }}>
            <Box justify="between" align="center" flex fill>
                <Description
                    header
                    id="queue-title"
                    textAlign="center"
                    size="small"
                    text="new queue"
                />
                <Box fill justify="evenly" align="center">
                    <MoodSelection
                        size={size}
                        moodIndex={state.mood}
                        progress={state.progress}
                        dispatch={(value) => dispatch(value)}
                    />
                    <SizePicker
                        size={size}
                        numSongs={state.numSongs}
                        progress={state.progress}
                        dispatch={(value) => dispatch(value)}
                    />
                    <SourceSelection
                        size={size}
                        source={state.source}
                        progress={state.progress}
                        dispatch={(value) => dispatch(value)}
                        topGenres={topGenres}
                        getSelectedGenres={setSelectedTopGenres}
                    />
                </Box>
                <Button
                    id="submit-form-btn"
                    text="continue"
                    onClick={() =>
                        handleSubmit(state.mood, state.numSongs, state.source, selectedTopGenres)
                    }
                    disabled={state.progress !== 3}
                />
            </Box>
        </motion.div>
    )
}

export async function getStaticProps() {
    return {
        props: {
            size: "large",
        },
    }
}
