import React from "react"
import { motion } from "framer-motion"
import { PrimaryButton, SecondaryButton } from "./Button.styles"
import { Tooltip } from "./Tooltip"

interface ButtonProps {
    id?: string
    text?: any
    icon?: any
    disabled?: any
    fill?: boolean
    margin?: any
    onClick?: () => void
    small?: boolean
    secondary?: boolean
    hover?: any
    title?: any
    color?: any
    tooltip?: any
}

export const Button: React.FunctionComponent<ButtonProps> = (props) => {
    const {
        id,
        text,
        icon,
        onClick,
        disabled,
        margin,
        small,
        secondary,
        hover,
        title,
        fill,
        color,
        tooltip,
    } = props

    if (small && secondary) {
        if (!tooltip) {
            return (
                <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                    <SecondaryButton
                        id={id}
                        icon={icon}
                        onClick={onClick}
                        disabled={disabled}
                        hoverIndicator={hover}
                        title={title}
                        primary={fill === undefined ? true : fill}
                        label={text}
                        margin={margin}
                        color={color === undefined ? "accent-3" : color}
                        focusIndicator={false}
                        size="small"
                    />
                </motion.div>
            )
        }
        return (
            <Tooltip tooltip={tooltip}>
                <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                    <SecondaryButton
                        id={id}
                        icon={icon}
                        onClick={onClick}
                        disabled={disabled}
                        hoverIndicator={hover}
                        title={title}
                        primary={fill === undefined ? true : fill}
                        label={text}
                        margin={margin}
                        color={color === undefined ? "accent-3" : color}
                        focusIndicator={false}
                        size="small"
                    />
                </motion.div>
            </Tooltip>
        )
    }
    if (small) {
        if (!tooltip) {
            return (
                <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                    <PrimaryButton
                        id={id}
                        icon={icon}
                        onClick={onClick}
                        disabled={disabled}
                        hoverIndicator={hover}
                        title={title}
                        color={color === undefined ? "accent-1" : color}
                        primary={fill === undefined ? true : fill}
                        label={text}
                        margin={margin}
                        focusIndicator={false}
                        size="small"
                    />
                </motion.div>
            )
        }
        return (
            <Tooltip tooltip={tooltip}>
                <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                    <PrimaryButton
                        id={id}
                        icon={icon}
                        onClick={onClick}
                        disabled={disabled}
                        hoverIndicator={hover}
                        title={title}
                        color={color === undefined ? "accent-1" : color}
                        primary={fill === undefined ? true : fill}
                        label={text}
                        margin={margin}
                        focusIndicator={false}
                        size="small"
                    />
                </motion.div>
            </Tooltip>
        )
    }
    if (secondary) {
        if (!tooltip) {
            return (
                <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                    <SecondaryButton
                        id={id}
                        icon={icon}
                        label={text}
                        onClick={onClick}
                        disabled={disabled}
                        size="large"
                        hoverIndicator={hover}
                        title={title}
                        color={color === undefined ? "accent-3" : color}
                        primary={fill === undefined ? true : fill}
                        margin={margin}
                        focusIndicator={false}
                    />
                </motion.div>
            )
        }
        return (
            <Tooltip tooltip={tooltip}>
                <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                    <SecondaryButton
                        id={id}
                        icon={icon}
                        label={text}
                        onClick={onClick}
                        disabled={disabled}
                        size="large"
                        hoverIndicator={hover}
                        title={title}
                        color={color === undefined ? "accent-3" : color}
                        primary={fill === undefined ? true : fill}
                        margin={margin}
                        focusIndicator={false}
                    />
                </motion.div>
            </Tooltip>
        )
    } else {
        if (!tooltip) {
            return (
                <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                    <PrimaryButton
                        id={id}
                        icon={icon}
                        label={text}
                        onClick={onClick}
                        disabled={disabled}
                        size="large"
                        hoverIndicator={hover}
                        title={title}
                        color={color === undefined ? "accent-1" : color}
                        primary={fill === undefined ? true : fill}
                        margin={margin}
                        focusIndicator={false}
                    />
                </motion.div>
            )
        }
        return (
            <Tooltip tooltip={tooltip}>
                <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                    <PrimaryButton
                        id={id}
                        icon={icon}
                        label={text}
                        onClick={onClick}
                        disabled={disabled}
                        size="large"
                        hoverIndicator={hover}
                        title={title}
                        color={color === undefined ? "accent-1" : color}
                        primary={fill === undefined ? true : fill}
                        margin={margin}
                        focusIndicator={false}
                    />
                </motion.div>
            </Tooltip>
        )
    }
}
