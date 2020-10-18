import React, { FunctionComponent } from "react"
import { Box } from "grommet"
import { Track } from "../../../types/Track"
import { ResultListItem } from "../result-list-item/result-list-item"
import { AnimatePresence } from "framer-motion"

interface ResultListProps {
    tracks: Track[]
    dispatch: any
    size: any
}

export const ResultList: FunctionComponent<ResultListProps> = (props) => {
    const { tracks, dispatch, size } = props
    return (
        <AnimatePresence>
            <Box
                overflow={{ vertical: "auto", horizontal: "hidden" }}
                fill
                pad={{
                    horizontal: size !== "small" ? "xlarge" : "none",
                    vertical: "small",
                }}
                gap="medium"
                style={{ touchAction: "pan-y" }}
            >
                {tracks.map((track, i) => (
                    <ResultListItem key={i} track={track} size={size} dispatch={dispatch} />
                ))}
            </Box>
        </AnimatePresence>
    )
}
