// src/stories/TrackDetails.stories.tsx

import * as React from "react"
import { Grommet, grommet } from "grommet"
import { TrackDetails } from "./TrackDetails"
import { Track } from "../../types/Track"

const mockTrack: Track = {
    previewUrl:
        "https://p.scdn.co/mp3-preview/97534965187cf94ea45ac30f046627c1e5f123eb?cid=cdb58c25fa4c42f4bd84049394c75c4c",
    name: "Without You",
    artist: "Perfume Genius",
    imageLink: "https://i.scdn.co/image/ab67616d0000b273e9a375a80097985178b73c4d",
    id: "2SPxgEush9C8GS5RqgXdqi",
    uri: "spotify:track:2SPxgEush9C8GS5RqgXdqi",
}

export default { title: "TrackDetails" }
const withGrommet = (child: React.ReactChild) => {
    return (
        <Grommet theme={grommet}>
            <div>{child}</div>
        </Grommet>
    )
}

export const largeTrackDetails = () => withGrommet(<TrackDetails size="large" track={mockTrack} />)

export const smallTrackDetails = () => withGrommet(<TrackDetails size="small" track={mockTrack} />)
