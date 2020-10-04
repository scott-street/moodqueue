// src/stories/Button.stories.tsx

import * as React from "react"
import { Grommet, grommet } from "grommet"
import { MoodButton } from "./MoodButton"
import { Mood } from "../../types/Mood"

export default { title: "MoodButton" }
const withGrommet = (child: React.ReactChild) => {
    return (
        <Grommet theme={grommet}>
            <div>{child}</div>
        </Grommet>
    )
}

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
