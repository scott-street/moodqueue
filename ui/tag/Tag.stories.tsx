import React from "react"
import { withGrommet } from "../wrapper"
import { Tag } from "./Tag"

export default { title: "Tag" }

export const genreTag = () => withGrommet(<Tag text="indie folk" />)
