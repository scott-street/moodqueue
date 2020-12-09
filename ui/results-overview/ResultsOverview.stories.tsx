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
    },
    {
        previewUrl: "",
        name: "myMockTrack2",
        artist: "myMockArtist2",
        imageLink: "",
        id: "2",
        uri: "",
    },
]

export const resultsOverview = () =>
    withGrommet(
        <ResultsOverview
            size="large"
            tracks={mockTracks}
            selectedGenreValue={undefined}
            source={{
                saved: false,
                artists: false,
                tracks: false,
                recommended: false,
            }}
            mood={Mood.HAPPY}
        />
    )
