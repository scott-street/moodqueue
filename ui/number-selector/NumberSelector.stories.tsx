// src/stories/NumberSelector.stories.tsx

import * as React from "react"
import { Grommet, grommet } from "grommet"
import { NumberSelector } from "./NumberSelector"

export default { title: "NumberSelector" }
const withGrommet = (child: React.ReactChild) => {
    return (
        <Grommet theme={grommet}>
            <div>{child}</div>
        </Grommet>
    )
}

export const largeNumberSelector = () => withGrommet(<NumberSelector size="large" numSongs={10} />)

export const smallNumberSelector = () => withGrommet(<NumberSelector size="small" numSongs={25} />)
