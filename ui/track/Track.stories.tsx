// src/stories/Track.stories.tsx

import * as React from "react"
import { Grommet, grommet } from "grommet"
import { Track } from "./Track"
import { Track as TrackType } from "../../types/Track"

const mockTrack: TrackType = {
    previewUrl: "",
    name: "Without You",
    artist: "Perfume Genius",
    imageLink: "https://i.scdn.co/image/ab67616d0000b273e9a375a80097985178b73c4d",
    id: "1",
    uri: "",
}

export default { title: "Track" }
const withGrommet = (child: React.ReactChild) => {
    return (
        <Grommet theme={grommet}>
            <div>{child}</div>
        </Grommet>
    )
}

export const trackLarge = () => withGrommet(<Track size="large" track={mockTrack} />)

export const trackSmall = () => withGrommet(<Track size="small" track={mockTrack} />)
