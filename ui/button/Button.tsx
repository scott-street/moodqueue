import * as React from "react"
import { theme } from "./Button.styles"
import { ThemeContext, Button as GrommetButton } from "grommet"

interface ButtonProps {
    text: string
}
export const Button: React.FunctionComponent<ButtonProps> = (props) => {
    const { text } = props

    return (
        <ThemeContext.Extend value={theme}>
            <GrommetButton primary label={text} />
        </ThemeContext.Extend>
    )
}
