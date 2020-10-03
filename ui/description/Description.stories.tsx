// src/stories/Button.stories.tsx

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

export const large = () => withGrommet(<Description text="Hello, World!" large />)

export const medium = () => withGrommet(<Description text="Hello, World!" />)

export const small = () => withGrommet(<Description text="Hello, World!" small />)
