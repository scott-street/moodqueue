// src/stories/Content.stories.tsx

import * as React from "react"
import { Box, Text } from "grommet"
import { withGrommet } from "../wrapper"
import { Content } from "./Content"

export default { title: "Content" }

export const contentLarge = () =>
    withGrommet(
        <Content size="large">
            <Box fill align="center" justify="center">
                <Text>Hello, Large World!</Text>
            </Box>
        </Content>
    )
export const contentSmall = () =>
    withGrommet(
        <Content size="small">
            <Box fill align="center" justify="center">
                <Text>Hello, Small World!</Text>
            </Box>
        </Content>
    )
