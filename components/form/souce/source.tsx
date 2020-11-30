import { Box, Text } from "grommet"
import React, { FunctionComponent } from "react"
import { FormSelection } from "../../../types/FormSelection"
import { FormAction, update, updateSourceSelection } from "../reducer"
import { Sources } from "../../../ui/sources/Sources"

interface SourceSelectionProps {
    progress: number
    source: FormSelection
    selectedGenreValue: string
    size: string
    dispatch(value: FormAction): void
    topGenres: string[]
    getSelectedGenres: (genres: string[]) => void
}

export const SourceSelection: FunctionComponent<SourceSelectionProps> = (props) => {
    const {
        size,
        source,
        selectedGenreValue,
        progress,
        dispatch,
        topGenres,
        getSelectedGenres,
    } = props

    const updateProgressAfterCheckboxChange = (index: number, checked: boolean) => {
        const current = source
        let prog = progress
        let selected: FormSelection = {
            saved: index === 0 ? checked : source.saved,
            tracks: index === 1 ? checked : source.tracks,
            artists: index === 2 ? checked : source.artists,
            recommended: index === 3 ? checked : source.recommended,
            genre: source.genre,
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
                selectedGenreValue={selectedGenreValue}
                topGenres={topGenres}
                getSelectedGenres={getSelectedGenres}
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
                            dispatch(update("genre", value))
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
