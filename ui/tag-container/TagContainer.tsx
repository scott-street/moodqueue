import React from "react"
import { Tag } from "../tag/Tag"
import { DefaultTagContainer, DefaultTagRow } from "./TagContainer.styles"

interface TagContainerProps {
    values: string[]
    getSelected: (values: string[]) => void
}

export const TagContainer: React.FunctionComponent<TagContainerProps> = (props) => {
    const { values, getSelected } = props
    const [selected, setSelected] = React.useState<string[]>([])

    const toggleSelected = (isSelected: boolean, name: string) => {
        if (isSelected) {
            setSelected(Array.from(new Set([...selected, name])))
        } else {
            setSelected(selected.filter((value) => value !== name))
        }
    }

    React.useEffect(() => {
        getSelected(selected)
    }, [selected])

    return (
        <DefaultTagContainer>
            <DefaultTagRow>
                {values.map((value: string) => (
                    <Tag text={value} getValue={(selected) => toggleSelected(selected, value)} />
                ))}
            </DefaultTagRow>
            <DefaultTagRow></DefaultTagRow>
        </DefaultTagContainer>
    )
}
