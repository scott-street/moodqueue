import { motion } from "framer-motion"
import { Layer, Box, Heading, Anchor, Select, CheckBox } from "grommet"
import { Spotify } from "grommet-icons"
import { HappyHeartEyes } from "@styled-icons/boxicons-solid/HappyHeartEyes"
import { Sad } from "@styled-icons/boxicons-solid/Sad"
import React, { FunctionComponent } from "react"
import { Description } from "../../../ui/description/Description"

interface SettingsProps {
    profileUrl: string
    resultsLayout: string
    size: string
    handleResultsLayoutChange(checked: boolean): void
    close(): void
}

export const Settings: FunctionComponent<SettingsProps> = (props) => {
    const { profileUrl, resultsLayout, size, close, handleResultsLayoutChange } = props
    return (
        <Layer
            responsive={false}
            margin={size !== "small" ? "small" : "xsmall"}
            position={size !== "small" ? "right" : "bottom"}
            onClickOutside={close}
            style={{
                background: "transparent",
                borderRadius: 30,
                height: size !== "small" ? "100%" : undefined,
                width: size === "small" ? "100%" : undefined,
            }}
        >
            <Box
                border={{
                    color: "accent-3",
                    size: size !== "small" ? "xsmall" : "small",
                }}
                fill={size !== "small"}
                flex
                round={size === "small" ? { corner: "top" } : true}
                align="center"
                pad={size !== "small" ? "medium" : "large"}
                background={{ color: "#1F2730" }}
                style={{
                    background:
                        size !== "small"
                            ? "linear-gradient(0deg, #efd5ff 0%, #515ada 75%)"
                            : "linear-gradient(200deg, #efd5ff 0%, #515ada 65%)",
                }}
                gap="large"
            >
                <Description header text="settings" textAlign="center" id="header-txt" />
                <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                    <Anchor
                        id="spotify-profile-anchor"
                        alignSelf="center"
                        href={profileUrl}
                        target="blank"
                        label={`Open profile in Spotify`}
                        icon={<Spotify size="large" />}
                    />
                </motion.div>
                <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                    <Box
                        round="large"
                        pad="xsmall"
                        border={{ color: "accent-1", size: "small" }}
                        background={{ color: "#34495E", opacity: 0.6 }}
                    >
                        <Select
                            id="theme-picker"
                            disabled
                            focusIndicator={false}
                            plain
                            options={["warm + cozy", "gaegu", "cold + uncomfortable"]}
                            placeholder="select a theme"
                        />
                    </Box>
                </motion.div>
                <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                    <Box align="center" direction="row" gap="small">
                        <CheckBox
                            id="results-layout"
                            toggle
                            label="fun results"
                            checked={resultsLayout === "fun" ? true : false}
                            onChange={(event) => handleResultsLayoutChange(event.target.checked)}
                        />
                        {resultsLayout === "fun" ? (
                            <HappyHeartEyes
                                width={size !== "small" ? "48px" : "24px"}
                                height={size !== "small" ? "48px" : "24px"}
                            />
                        ) : (
                            <Sad
                                width={size !== "small" ? "48px" : "24px"}
                                height={size !== "small" ? "48px" : "24px"}
                            />
                        )}
                    </Box>
                </motion.div>
            </Box>
        </Layer>
    )
}
