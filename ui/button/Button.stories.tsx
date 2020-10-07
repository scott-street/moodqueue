// src/stories/Button.stories.tsx

import * as React from "react"
import { withGrommet } from "../wrapper"
import { Spotify, CirclePlay } from "grommet-icons"
import { Button } from "./Button"

export default { title: "Button" }

export const largePrimary = () => withGrommet(<Button text="Hello, World!" />)

export const largePrimaryIcon = () => withGrommet(<Button text="Login" icon={<Spotify />} />)

export const largeSecondary = () => withGrommet(<Button text="Hello, World!" secondary />)

export const smallPrimaryIcon = () => withGrommet(<Button icon={<CirclePlay />} small />)

export const smallSecondaryIcon = () =>
    withGrommet(<Button icon={<CirclePlay />} small secondary />)
