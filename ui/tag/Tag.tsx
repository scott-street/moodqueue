import React from "react"
import { DefaultTag, SelectedTag } from "./Tag.styles"
interface TagProps {
    text: string
}

export const Tag: React.FunctionComponent<TagProps> = (props) => {
    const { text } = props
    const [selected, setSelected] = React.useState(false)

    const toggleSelected = () => {
        setSelected(!selected)
    }

    if (selected)
        return (
            <SelectedTag onClick={toggleSelected} id="tag-selected">
                {text}
            </SelectedTag>
        )
    return (
        <DefaultTag onClick={toggleSelected} id="tag-default">
            {text}
        </DefaultTag>
    )
}
