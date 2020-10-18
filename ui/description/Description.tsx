import React from "react"
import { Header, Text } from "./Description.styles"

interface DescProps {
    id?: string
    text?: string
    header?: boolean
    weight?: any
    size?: any
    textAlign?: any
}
export const Description: React.FunctionComponent<DescProps> = (props) => {
    const { id, text, header, weight, size, textAlign } = props

    if (!header) {
        return (
            <Text id={id} weight={weight} size={size} textAlign={textAlign}>
                {text}
            </Text>
        )
    }
    return (
        <Header id={id} size={size} textAlign={textAlign} style={{ userSelect: "none" }}>
            {text}
        </Header>
    )
}
