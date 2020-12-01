// src/stories/Sources.stories.tsx

import * as React from "react"
import { withGrommet } from "../wrapper"
import { Sources } from "./Sources"

export default { title: "Sources" }

export const sourcesNotChecked = () =>
    withGrommet(
        <Sources
            selectedGenreValue={"indie"}
            size="large"
            sources={{
                saved: false,
                artists: false,
                tracks: false,
                recommended: false,
                genre: "",
            }}
            topGenres={[]}
            getSelectedGenres={() => {}}
        />
    )
export const sourcesChecked = () =>
    withGrommet(
        <Sources
            selectedGenreValue={"indie"}
            size="large"
            sources={{
                saved: true,
                artists: false,
                tracks: true,
                recommended: false,
                genre: "",
            }}
            topGenres={[]}
            getSelectedGenres={() => {}}
        />
    )
