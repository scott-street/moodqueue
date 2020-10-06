import React from "react"
import { motion } from "framer-motion"
import { baseContainer } from "../../../components/animations/motion"
import { LoginBackgroundOuter, LoginBackgroundInner } from "../Background.styles"

export const LoginBackground: React.FunctionComponent = (props) => {
    return (
        <LoginBackgroundOuter id="login-outer-box" pad="medium">
            <motion.div
                style={{ width: "100%", height: "100%" }}
                variants={baseContainer}
                initial="hidden"
                animate="visible"
            >
                <LoginBackgroundInner
                    id="login-inner-box"
                    round="large"
                    background={{ color: "#2F3E4D", opacity: 0.7 }}
                    border={{
                        side: "all",
                        size: "large",
                        style: "outset",
                        color: "accent-1",
                    }}
                >
                    {props.children}
                </LoginBackgroundInner>
            </motion.div>
        </LoginBackgroundOuter>
    )
}
