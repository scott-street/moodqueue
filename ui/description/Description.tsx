import React from "react"
import { motion } from "framer-motion"
import { PrimaryButton, SecondaryButton } from "./Description.styles"
import { baseItemTop } from "../../components/animations/motion"

interface ButtonProps {
    id?: string
    text?: string
    icon?: any
    disabled?: any
    color?: string
    onClick?: () => void
    small?: boolean
    secondary?: boolean
}
export const Button: React.FunctionComponent<ButtonProps> = (props) => {
    const { id, text, icon, onClick, disabled, small, secondary } = props

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
                    margin={"small"}
                    size="large"
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
                margin={"small"}
                size="large"
            />
        </motion.div>
    )
}
