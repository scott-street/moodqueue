// src/stories/ResultsOverview.stories.tsx

import * as React from "react"
import { Mood } from "../../types/Mood"
import { Track } from "../../types/Track"
import { withGrommet } from "../wrapper"
import { ResultsOverview } from "./ResultsOverview"

export default { title: "ResultsOverview" }

const mockTracks: Track[] = [
    {
        previewUrl: "",
        name: "myMockTrack1",
        artist: "myMockArtist1",
        imageLink: "",
        id: "1",
        uri: "",
        explicit: true,
    },
    {
        previewUrl: "",
        name: "myMockTrack2",
        artist: "myMockArtist2",
        imageLink: "",
        id: "2",
        uri: "",
        explicit: false,
    },
]

export const resultsOverview = () =>
    withGrommet(
        <ResultsOverview
            size="large"
            tracks={mockTracks}
            source={{
                saved: false,
                artists: false,
                tracks: false,
                recommended: false,
                genres: [""],
            }}
            mood={Mood.HAPPY}
        />
    )
