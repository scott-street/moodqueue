import React, { FunctionComponent, Reducer, useEffect, useReducer } from "react"
import { Box, Heading, Button } from "grommet"
import { formReducer, initialFormState, FormState, FormAction, resetFormState } from "./reducer"
import { MoodSelection } from "./mood-selection"
import { SizePicker } from "./size-picker"
import { SourceSelection } from "./souce"
import { FormSelection } from "../../types/FormSelection"
import { Mood } from "../../types/Mood"

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
            <Box fill justify="evenly" align="center" gap="medium">
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
                margin="small"
                hoverIndicator={size !== "small" ? "accent-1" : false}
                alignSelf="center"
                primary={size === "small" || state.progress === 3}
                disabled={state.progress !== 3}
                label="continue"
                onClick={() => handleSubmit(state.mood, state.numSongs, state.source)}
                size={size === "large" ? "large" : size === "medium" ? "medium" : "small"}
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
