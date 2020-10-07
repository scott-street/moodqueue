// src/stories/Description.stories.tsx

import * as React from "react"
import { withGrommet } from "../wrapper"
import { Description } from "./Description"

export default { title: "Description" }

export const header = () => withGrommet(<Description text="Hello, World!" header />)

export const boldText = () => withGrommet(<Description text="Hello, World!" weight="bold" />)

export const normalText = () => withGrommet(<Description text="Hello, World!" />)
