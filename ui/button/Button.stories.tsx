// src/stories/Button.stories.tsx

import * as React from "react"
import { storiesOf } from "@storybook/react"
import { Grommet, grommet } from "grommet"
import { Button } from "./Button"

// allows component to use base grommet theme
// and extend where it needs to
const withGrommet = (child: React.ReactChild) => {
    return <Grommet theme={grommet}>{child}</Grommet>
}
storiesOf("Button", module).add("with text", () => {
    return withGrommet(<Button text="hello world" />)
})
