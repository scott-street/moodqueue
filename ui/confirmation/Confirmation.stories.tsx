// src/stories/Confirmation.stories.tsx

import * as React from "react"
import { withGrommet } from "../wrapper"
import { Confirmation } from "./Confirmation"

export default { title: "Confirmation" }

export const secondaryConfirm = () =>
    withGrommet(
        <Confirmation
            close={() => {}}
            handleConfirmation={() => {}}
            descText="pressing continue will submit the form"
            btnText="continue"
            headerText="header"
            id="secondary-confirm-id"
            secondary
        />
    )

export const primaryConfirm = () =>
    withGrommet(
        <Confirmation
            close={() => {}}
            handleConfirmation={() => {}}
            descText="pressing continue below will submit the form"
            btnText="continue"
            headerText="header"
            id="primary-confirm-id"
        />
    )
