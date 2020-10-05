import React, { FunctionComponent } from "react"
import { Track as TrackType } from "../../../types/Track"
import { remove, updateTrackToShow } from "../reducer"
import { Track } from "../../../ui/track/Track"

interface ResultListItemProps {
    track: TrackType
    size: any
    dispatch: any
}
export const ResultListItem: FunctionComponent<ResultListItemProps> = (props) => {
    const { track, size, dispatch } = props
    return (
        <Track
            size={size}
            track={track}
            onClickMore={() => dispatch(updateTrackToShow("trackToShow", track))}
            onClickRemove={() => dispatch(remove("tracks", track.id))}
        />
    )
}
