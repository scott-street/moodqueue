// src/stories/LoginBackground.stories.tsx

import * as React from "react"
import { withGrommet } from "../../wrapper"
import { LoginBackground } from "./LoginBackground"

export default { title: "LoginBackground" }

export const Login = () => withGrommet(<LoginBackground />)
