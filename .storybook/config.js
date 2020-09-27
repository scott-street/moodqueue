// .storybook/config.js

import { configure } from "@storybook/react"
// automatically import all files ending in *.stories.tsx
configure(require.context("../ui/stories", true, /\.stories\.tsx?$/), module)
