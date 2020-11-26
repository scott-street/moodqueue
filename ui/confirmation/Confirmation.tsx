import { motion } from "framer-motion"
import { Layer, Box } from "grommet"
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
}

export const Confirmation: React.FunctionComponent<ConfirmationProps> = (props) => {
    const { close, btnText, handleConfirmation, descText, headerText, secondary, id } = props
    const [isOpen, setIsOpen] = React.useState(true)

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
                    style={{
                        background: !secondary
                            ? "linear-gradient(180deg, rgba(111,255,176,1) 0%, rgba(66,105,108,1) 50%, rgba(57,73,94,1) 75%)"
                            : "linear-gradient(180deg, rgba(129,252,237,1) 0%, rgba(68,99,115,1) 50%, rgba(57,73,94,1) 75%)",
                    }}
                    align="center"
                    gap="large"
                    background={{ color: "#34495E" }}
                    pad="medium"
                    round="large"
                    border={{
                        color: secondary ? "accent-3" : "accent-1",
                        size: "large",
                        side: "bottom",
                        style: "groove",
                    }}
                >
                    <Description header text={headerText} textAlign="center" />
                    <Description textAlign="center" text={descText} />
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
                </Box>
            </motion.div>
        </Layer>
    )
}
