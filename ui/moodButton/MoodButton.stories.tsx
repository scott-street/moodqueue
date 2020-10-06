// src/stories/Button.stories.tsx

import * as React from "react"
import { withGrommet } from "../wrapper"
import { MoodButton } from "./MoodButton"
import { Mood } from "../../types/Mood"

export default { title: "MoodButton" }

export const normal = () =>
    withGrommet(
        <MoodButton
            mood={Mood.HAPPY.toString()}
            key={0}
            selected={false}
            onClick={() => {}}
            size="large"
        />
    )

export const selected = () =>
    withGrommet(
        <MoodButton mood={Mood.SAD.toString()} key={0} selected onClick={() => {}} size="large" />
    )

export const noText = () =>
    withGrommet(
        <MoodButton
            mood={Mood.SAD.toString()}
            key={0}
            selected={false}
            onClick={() => {}}
            size="small"
        />
    )
