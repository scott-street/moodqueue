import { motion } from "framer-motion"
import React from "react"
import { colorMovementLogin } from "../../../components/animations/motion"
import { LoginBackgroundOuter } from "../Background.styles"

interface LoginBackgroundProps {
    small?: boolean
}

export const LoginBackground: React.FunctionComponent<LoginBackgroundProps> = (props) => {
    const { small } = props

    return (
        <motion.div
            animate={colorMovementLogin}
            style={{
                width: "100%",
                height: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
            }}
        >
            <LoginBackgroundOuter
                justify={small ? "evenly" : "between"}
                id="login-outer-box"
                pad={{ horizontal: "medium", bottom: "medium" }}
            >
                {props.children}
            </LoginBackgroundOuter>
        </motion.div>
    )
}
