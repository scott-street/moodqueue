import React from "react"
import { motion } from "framer-motion"
import { PrimaryButton, SecondaryButton } from "./Button.styles"
import { baseItemTop } from "../../components/animations/motion"

interface ButtonProps {
    id?: string
    text?: string
    icon?: any
    disabled?: any
    fill?: boolean
    onClick?: () => void
    small?: boolean
    secondary?: boolean
    hover?: any
    title?: any
}
export const Button: React.FunctionComponent<ButtonProps> = (props) => {
    const { id, text, icon, onClick, disabled, small, secondary, hover, title, fill } = props

    if (small && secondary) {
        return (
            <motion.div
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="item"
                variants={baseItemTop}
            >
                <SecondaryButton
                    id={id}
                    icon={icon}
                    onClick={onClick}
                    disabled={disabled}
                    margin={"small"}
                    alignSelf="center"
                    size="small"
                    hoverIndicator={hover}
                    title={title}
                    color="accent-3"
                    primary={fill === undefined ? true : fill}
                    label={text}
                />
            </motion.div>
        )
    }
    if (small) {
        return (
            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                <PrimaryButton
                    id={id}
                    icon={icon}
                    onClick={onClick}
                    disabled={disabled}
                    margin={"small"}
                    alignSelf="center"
                    size="small"
                    hoverIndicator={hover}
                    title={title}
                    color="accent-1"
                    primary={fill === undefined ? true : fill}
                    label={text}
                />
            </motion.div>
        )
    }
    if (secondary) {
        return (
            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                <SecondaryButton
                    id={id}
                    icon={icon}
                    label={text}
                    onClick={onClick}
                    disabled={disabled}
                    alignSelf="center"
                    margin={"small"}
                    size="large"
                    hoverIndicator={hover}
                    title={title}
                    color="accent-3"
                    primary={fill === undefined ? true : fill}
                />
            </motion.div>
        )
    }
    return (
        <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
            <PrimaryButton
                id={id}
                icon={icon}
                label={text}
                onClick={onClick}
                disabled={disabled}
                alignSelf="center"
                margin={"small"}
                size="large"
                hoverIndicator={hover}
                title={title}
                color="accent-1"
                primary={fill === undefined ? true : fill}
            />
        </motion.div>
    )
}
