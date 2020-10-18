// src/stories/Track.stories.tsx

import * as React from "react"
import { withGrommet } from "../wrapper"
import { Track } from "./Track"
import { Track as TrackType } from "../../types/Track"

const mockTrack: TrackType = {
    previewUrl: "",
    name: "Without You",
    artist: "Perfume Genius",
    imageLink: "https://i.scdn.co/image/ab67616d0000b273e9a375a80097985178b73c4d",
    id: "1",
    uri: "",
    popularity: 60,
}

export default { title: "Track" }

export const trackLarge = () => withGrommet(<Track size="large" track={mockTrack} />)

export const trackSmall = () => withGrommet(<Track size="small" track={mockTrack} />)
