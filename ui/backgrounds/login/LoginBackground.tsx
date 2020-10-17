import React from "react"
import { LoginBackgroundOuter } from "../Background.styles"

export const LoginBackground: React.FunctionComponent = (props) => {
    return (
        <LoginBackgroundOuter id="login-outer-box" pad={{ horizontal: "medium", bottom: "medium" }}>
            {props.children}
        </LoginBackgroundOuter>
    )
}
