import React from "react"
import { TagContainer } from "./TagContainer"

export default { title: "TagContainer" }

export const genreTagContainer = () => (
    <TagContainer
        values={["indie folk", "indie pop", "rock", "pop"]}
        getSelected={(s) => console.log(s)}
    />
)
