// src/stories/LoginBackground.stories.tsx

import * as React from "react"
import { withGrommet } from "../../wrapper"
import { Index as IndexBackground } from "./IndexBackground"

export default { title: "Index" }

export const Index = () => withGrommet(<IndexBackground />)
