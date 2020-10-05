// src/stories/LoginBackground.stories.tsx

import * as React from "react"
import { withGrommet } from "../../wrapper"
import { HomeBackground } from "./HomeBackground"

export default { title: "HomeBackground" }

export const Home = () => withGrommet(<HomeBackground />)
