import { Box, Text } from "grommet"
import React, { FunctionComponent } from "react"
import { FormSelection } from "../../../types/FormSelection"
import { FormAction, update, updateSourceSelection } from "../reducer"
import { Sources } from "../../../ui/sources/Sources"

interface SourceSelectionProps {
    progress: number
    source: FormSelection
    size: string
    dispatch(value: FormAction): void
    genres: string[]
}

export const SourceSelection: FunctionComponent<SourceSelectionProps> = (props) => {
    const { size, source, progress, dispatch, genres } = props

    const updateProgressAfterCheckboxChange = (index: number, checked: boolean) => {
        const current = source
        let prog = progress
        let selected: FormSelection = {
            saved: index === 0 ? checked : source.saved,
            tracks: index === 1 ? checked : source.tracks,
            artists: index === 2 ? checked : source.artists,
            recommended: index === 3 ? checked : source.recommended,
            genres: source.genres,
        }
        if (
            selected.artists === false &&
            selected.recommended === false &&
            selected.tracks === false &&
            selected.saved === false
        ) {
            if (prog - 1 >= 0) prog--
        } else if (
            current.artists === false &&
            current.recommended === false &&
            current.tracks === false &&
            current.saved === false
        ) {
            if (prog + 1 <= 3) prog++
        }
        dispatch(update("progress", prog))
    }

    return (
        <Box
            direction="row"
            align="start"
            fill="horizontal"
            justify={size !== "small" ? "center" : "evenly"}
            gap={size !== "small" ? "xlarge" : undefined}
        >
            <Text textAlign="center" size={size !== "small" ? "large" : "medium"} weight="bold">
                choose from:
            </Text>
            <Sources
                size={size}
                sources={source}
                genres={genres}
                onChange={(value, index) => {
                    if (index !== 4) updateProgressAfterCheckboxChange(index, value)
                    switch (index) {
                        case 0:
                            dispatch(updateSourceSelection("saved", value))
                            break
                        case 1:
                            dispatch(updateSourceSelection("tracks", value))
                            break
                        case 2:
                            dispatch(updateSourceSelection("artists", value))
                            break
                        case 3:
                            dispatch(updateSourceSelection("recommended", value))
                            break
                        case 4:
                            dispatch(updateSourceSelection("genres", [value]))
                            break
                        default:
                            dispatch(updateSourceSelection("saved", value))
                            break
                    }
                }}
            />
        </Box>
    )
}
