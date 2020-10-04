// src/stories/Sources.stories.tsx

import * as React from "react"
import { Grommet, grommet } from "grommet"
import { Sources } from "./Sources"

export default { title: "Sources" }
const withGrommet = (child: React.ReactChild) => {
    return (
        <Grommet theme={grommet}>
            <div>{child}</div>
        </Grommet>
    )
}

export const sourcesNotChecked = () =>
    withGrommet(
        <Sources
            size="large"
            sources={{
                saved: false,
                artists: false,
                tracks: false,
                recommended: false,
            }}
        />
    )
export const sourcesChecked = () =>
    withGrommet(
        <Sources
            size="large"
            sources={{
                saved: true,
                artists: false,
                tracks: true,
                recommended: false,
            }}
        />
    )
