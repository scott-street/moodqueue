import React, { FunctionComponent, Reducer, useEffect, useReducer } from "react"
import { Box, Heading } from "grommet"
import { formReducer, initialFormState, FormState, FormAction, resetFormState } from "./reducer"
import { MoodSelection } from "./mood-selection"
import { SizePicker } from "./size-picker"
import { SourceSelection } from "./souce"
import { FormSelection } from "../../types/FormSelection"
import { Mood } from "../../types/Mood"
import { motion } from "framer-motion"
import { Button } from "../../ui/button/Button"

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

    useEffect(() => {
        document.title = "home | moodqueue"
        dispatch(resetFormState())
    }, [])

    return (
        <Box justify="between" align="center" flex fill>
            <Heading
                id="queue-title"
                textAlign="center"
                margin="none"
                size={size !== "small" ? "medium" : "small"}
            >
                new queue
            </Heading>
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
                />
            </Box>
            <Button
                id="submit-form-btn"
                text="continue"
                onClick={() => handleSubmit(state.mood, state.numSongs, state.source)}
                disabled={state.progress !== 3}
            />
        </Box>
    )
}

export async function getStaticProps() {
    return {
        props: {
            size: "large",
        },
    }
}
