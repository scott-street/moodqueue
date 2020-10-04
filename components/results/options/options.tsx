import React, { FunctionComponent } from "react"
import { Track } from "../../../types/Track"
import { remove, ResultAction } from "../reducer"
import { TrackDetails } from "../../../ui/trackDetails/TrackDetails"

interface OptionsProps {
    size: string
    track: Track
    close(): void
    dispatch(value: ResultAction): void
}

export const Options: FunctionComponent<OptionsProps> = (props) => {
    const { track, close, size, dispatch } = props

    const setVolume = () => {
        let player = document.getElementById("previewPlayer") as HTMLAudioElement
        if (player) player.volume = 0.2
    }

    if (track) {
        return (
            <TrackDetails
                size={size}
                onClickRemove={() => {
                    dispatch(remove("tracks", track.id))
                    close()
                }}
                setVolume={setVolume}
                track={track}
                close={close}
            />
        )
    } else return null
}
