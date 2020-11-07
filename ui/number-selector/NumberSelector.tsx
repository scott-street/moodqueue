import React from "react"
import { motion } from "framer-motion"
import { OuterBox, SizePicker } from "./NumberSelector.styles"
import { Button } from "../button/Button"
import { Add, Subtract } from "grommet-icons"
import { ThemeContext } from "grommet"

interface NumberSelectorProps {
    size?: any
    numSongs?: number
    onClickAdd?: () => void
    onClickSubtract?: () => void
    onChange?: (value: number) => void
}
export const NumberSelector: React.FunctionComponent<NumberSelectorProps> = (props) => {
    const { size, onClickAdd, onClickSubtract, onChange, numSongs } = props

    return (
        <ThemeContext.Extend
            value={{
                global: {
                    spacing: size !== "small" ? "40px" : "32px",
                    focus: { shadow: { size: "10px" } },
                },
            }}
        >
            <OuterBox gap="small" margin={{ horizontal: size === "small" ? "large" : undefined }}>
                {size !== "small" && (
                    <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                        <Button
                            fill={false}
                            margin="small"
                            id="subtract-btn"
                            icon={<Subtract size={size !== "small" ? "medium" : "small"} />}
                            onClick={onClickSubtract}
                        />
                    </motion.div>
                )}
                <SizePicker
                    id="size-picker"
                    max={50}
                    min={0}
                    step={1}
                    name="size-picker"
                    value={numSongs}
                    onChange={(event) => {
                        onChange(+event.target.value)
                    }}
                />
                {size !== "small" && (
                    <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                        <Button
                            fill={false}
                            margin="small"
                            id="add-btn"
                            icon={<Add size={size !== "small" ? "medium" : "small"} />}
                            onClick={onClickAdd}
                        />
                    </motion.div>
                )}
            </OuterBox>
        </ThemeContext.Extend>
    )
}
