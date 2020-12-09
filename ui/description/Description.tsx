import React from "react"
import { Box, Heading as Header, Text } from "grommet"

interface DescProps {
    id?: string
    text?: string
    header?: boolean
    weight?: any
    size?: any
    textAlign?: any
    truncate?: boolean
}
export const Description: React.FunctionComponent<DescProps> = (props) => {
    const { id, text, header, weight, size, textAlign, truncate } = props

    if (truncate) {
        if (!header) {
            return (
                <Box overflow="hidden">
                    <Text id={id} weight={weight} size={size} textAlign={textAlign} truncate>
                        {text}
                    </Text>
                </Box>
            )
        }
        return (
            <Box overflow="hidden">
                <Header
                    id={id}
                    truncate
                    size={size}
                    textAlign={textAlign}
                    margin="none"
                    style={{ userSelect: "none" }}
                >
                    {text}
                </Header>
            </Box>
        )
    } else {
        if (!header) {
            return (
                <Text id={id} weight={weight} size={size} textAlign={textAlign}>
                    {text}
                </Text>
            )
        }
        return (
            <Header
                id={id}
                size={size}
                textAlign={textAlign}
                margin="none"
                style={{ userSelect: "none" }}
            >
                {text}
            </Header>
        )
    }
}
