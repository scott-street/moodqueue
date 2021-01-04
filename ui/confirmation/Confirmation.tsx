import { motion } from "framer-motion"
import { Layer, Box } from "grommet"
import { Alert } from "grommet-icons"
import React from "react"
import { trackDetailsVariants } from "../../components/animations/motion"
import { Button } from "../button/Button"
import { Description } from "../description/Description"

interface ConfirmationProps {
    close(): void
    handleConfirmation(): void
    secondary?: boolean
    btnText: string
    descText: string
    headerText: string
    id: any
    warning?: any
}

export const Confirmation: React.FunctionComponent<ConfirmationProps> = (props) => {
    const {
        close,
        btnText,
        handleConfirmation,
        descText,
        headerText,
        secondary,
        id,
        warning,
    } = props
    const [isOpen, setIsOpen] = React.useState(true)
    const [showWarning, setShowWarning] = React.useState(false)
    const warningBtnText = showWarning ? "HIDE " + warning.btnText : "SHOW " + warning.btnText

    return (
        <Layer
            animation={false}
            onClickOutside={() => {
                setIsOpen(false)
                setTimeout(() => close(), 500)
            }}
            responsive={false}
            position="center"
            margin={{ horizontal: "large" }}
            style={{ background: "transparent", width: "100%" }}
        >
            <motion.div
                variants={trackDetailsVariants("large")}
                animate={isOpen ? "open" : "closed"}
                initial={{ scale: 0 }}
                transition={{ duration: 0.5 }}
            >
                <Box
                    id={id}
                    align="center"
                    gap="medium"
                    style={{
                        background: !secondary
                            ? "linear-gradient(45deg, rgba(72,201,176,1) 25%, rgba(163,196,255,1) 100%)"
                            : "linear-gradient(45deg, rgba(93,173,226,1) 25%, rgba(163,196,255,1) 100%)",
                        opacity: 0.9,
                    }}
                    background={{
                        color: !secondary ? "#48C9B0" : "#5DADE2",
                        dark: true,
                        opacity: 0.9,
                    }}
                    pad="medium"
                    round="large"
                    justify="between"
                >
                    <Description header text={headerText} textAlign="center" size="small" />
                    <Description textAlign="center" text={descText} size="small" />
                    <Button
                        small
                        onClick={() => {
                            setIsOpen(false)
                            setTimeout(() => {
                                handleConfirmation()
                            }, 500)
                        }}
                        text={btnText}
                        secondary={secondary === undefined ? false : secondary}
                    />
                    {warning && (
                        <Box align="center">
                            <Button
                                text={warningBtnText}
                                icon={<Alert />}
                                color="#E6B0AA"
                                small
                                onClick={() => setShowWarning(!showWarning)}
                            />
                            {showWarning && (
                                <Box
                                    round
                                    background={{ color: "light-2", opacity: 0.3 }}
                                    margin={{ top: "small" }}
                                    pad="xsmall"
                                >
                                    <Description
                                        textAlign="center"
                                        text={warning.text}
                                        size="small"
                                        weight="bold"
                                    />
                                </Box>
                            )}
                        </Box>
                    )}
                </Box>
            </motion.div>
        </Layer>
    )
}
