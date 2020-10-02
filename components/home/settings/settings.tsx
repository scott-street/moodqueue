import { motion } from "framer-motion"
import { Layer, Box, Heading, Anchor, Select, CheckBox } from "grommet"
import { Spotify } from "grommet-icons"
import React, { FunctionComponent } from "react"

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
                border={{ color: "neutral-4" }}
                fill={size !== "small"}
                flex
                round={size === "small" ? { corner: "top" } : true}
                align="center"
                pad={size !== "small" ? "medium" : "large"}
                background={{ color: "#1F2730" }}
                style={{
                    background: "linear-gradient(0deg, rgba(31,39,48,1) 0%, rgba(52,73,94,1) 100%)",
                }}
                gap={size !== "small" ? "medium" : "large"}
            >
                <Heading textAlign="center" id="header-txt">
                    settings
                </Heading>
                <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                    <Anchor
                        id="spotify-profile-anchor"
                        alignSelf="center"
                        href={profileUrl}
                        target="blank"
                        label={`Open profile in Spotify`}
                        icon={<Spotify />}
                    />
                </motion.div>
                <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                    <Box
                        round="large"
                        pad="xsmall"
                        border={{ color: "accent-1", size: "small" }}
                        background="#34495E"
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
                    <CheckBox
                        id="results-layout"
                        toggle
                        label="fun results"
                        checked={resultsLayout === "fun" ? true : false}
                        onChange={(event) => handleResultsLayoutChange(event.target.checked)}
                    />
                </motion.div>
            </Box>
        </Layer>
    )
}
