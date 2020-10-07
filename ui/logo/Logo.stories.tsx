// src/stories/Logo.stories.tsx

import * as React from "react"
import { withGrommet } from "../wrapper"
import { Logo } from "./Logo"

export default { title: "Logo" }

export const logoLarge = () => withGrommet(<Logo size="large" textAlign="center" />)
export const logoSmall = () => withGrommet(<Logo size="small" textAlign="start" />)
