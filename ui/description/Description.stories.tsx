// src/stories/Description.stories.tsx

import * as React from "react"
import { Grommet, grommet, Box } from "grommet"
import { Description } from "./Description"

export default { title: "Description" }
const withGrommet = (child: React.ReactChild) => {
    return (
        <Grommet theme={grommet}>
            <Box>{child}</Box>
        </Grommet>
    )
}

export const header = () => withGrommet(<Description text="Hello, World!" header />)

export const boldText = () => withGrommet(<Description text="Hello, World!" weight="bold" />)

export const normalText = () => withGrommet(<Description text="Hello, World!" />)
