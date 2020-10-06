// src/stories/NumberSelector.stories.tsx

import * as React from "react"
import { withGrommet } from "../wrapper"
import { NumberSelector } from "./NumberSelector"

export default { title: "NumberSelector" }

export const largeNumberSelector = () => withGrommet(<NumberSelector size="large" numSongs={10} />)

export const smallNumberSelector = () => withGrommet(<NumberSelector size="small" numSongs={25} />)
