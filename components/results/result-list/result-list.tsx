import React, { FunctionComponent } from "react"
import { Box } from "grommet"
import { Track } from "../../../types/Track"
import { ResultListItem } from "../result-list-item/result-list-item"

interface ResultListProps {
    tracks: Track[]
    layout: string
    dispatch: any
    size: any
}

export const ResultList: FunctionComponent<ResultListProps> = (props) => {
    const { tracks, dispatch, size, layout } = props
    return (
        <Box
            overflow={{ vertical: "auto" }}
            gap="medium"
            alignContent="center"
            justify={tracks ? (tracks.length > 1 ? "start" : "center") : "center"}
            pad={{
                vertical: "small",
                horizontal: size !== "small" ? "medium" : "none",
            }}
            fill
        >
            {tracks.map((track, i) => (
                <ResultListItem
                    key={i}
                    track={track}
                    size={size}
                    dispatch={dispatch}
                    align={
                        layout === "fun"
                            ? i % 2 !== 0 || tracks.length <= 1
                                ? "center"
                                : i % 4 === 0
                                ? "start"
                                : "end"
                            : undefined
                    }
                />
            ))}
        </Box>
    )
}
