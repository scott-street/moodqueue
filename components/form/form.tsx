import React, { FunctionComponent, Reducer, useEffect, useReducer } from "react"
import { Box } from "grommet"
import { formReducer, initialFormState, FormState, FormAction, resetFormState } from "./reducer"
import { MoodSelection } from "./mood-selection"
import { SizePicker } from "./size-picker"
import { SourceSelection } from "./souce"
import { FormSelection } from "../../types/FormSelection"
import { Mood } from "../../types/Mood"
import { Button } from "../../ui/button/Button"
import { motion } from "framer-motion"
import { baseItemBottom } from "../animations/motion"
import { useSpotify } from "../../common/hooks/useSpotify"
import { BounceLoader } from "react-spinners"

interface FormProps {
    size: string
    handleSubmit(mood: Mood, numSongs: number, source: FormSelection): void
}

export const Form: FunctionComponent<FormProps> = (props) => {
    const { handleSubmit, size } = props
    const [state, dispatch] = useReducer<Reducer<FormState, FormAction>>(
        formReducer,
        initialFormState
    )
    const [genres, setGenres] = React.useState<string[] | undefined>(undefined)
    const { getAvailableSeedGenres } = useSpotify()

    useEffect(() => {
        document.title = "home | moodqueue"
        dispatch(resetFormState())
        getAvailableSeedGenres().then((genres) => {
            setGenres(genres as string[])
        })
    }, [])

    if (genres === undefined) {
        return (
            <Box align="center" justify="center" fill>
                <BounceLoader
                    size={size === "large" ? 300 : size === "medium" ? 200 : 100}
                    color="#6FFFB0"
                />
            </Box>
        )
    }
    return (
        <motion.div
            variants={baseItemBottom}
            style={{
                width: "100%",
                height: "100%",
            }}
        >
            <Box fill justify="between" align="center">
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
                    genres={genres}
                />
                <Button
                    id="submit-form-btn"
                    text="continue"
                    onClick={() => handleSubmit(state.mood, state.numSongs, state.source)}
                    disabled={
                        state.progress !== 3
                            ? true
                            : state.source.recommended
                            ? state.source.genres[0]
                                ? false
                                : true
                            : false
                    }
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
