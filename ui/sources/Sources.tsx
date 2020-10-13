import React from "react"
import { motion } from "framer-motion"
import { CheckBox } from "./Sources.styles"
import { Box, Text, Select } from "grommet"
import { FormSelection } from "../../types/FormSelection"

interface SourcesProps {
    size?: any
    sources: FormSelection
    topGenres: string[]
    onChange?: (value: boolean, index: number) => void
    getSelectedGenres: (genres: string[]) => void
}
export const Sources: React.FunctionComponent<SourcesProps> = (props) => {
    const { size, onChange, sources, topGenres, getSelectedGenres } = props
    const [genreSelectValue, setGenreSelectValue] = React.useState("")

    React.useEffect(() => {
        getSelectedGenres([genreSelectValue])
    }, [genreSelectValue])

    return (
        <Box gap="small">
            <motion.div
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                style={{ marginBottom: 5 }}
            >
                <CheckBox
                    id="saved-checkbox"
                    label={
                        <Box>
                            <Text size={size !== "small" ? "medium" : "xsmall"}>
                                your saved songs
                            </Text>
                        </Box>
                    }
                    checked={sources.saved}
                    onChange={(event) => {
                        onChange(event.target.checked, 0)
                    }}
                />
            </motion.div>
            <motion.div
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                style={{ marginBottom: 5 }}
            >
                <CheckBox
                    id="tracks-checkbox"
                    label={
                        <Box>
                            <Text size={size !== "small" ? "medium" : "xsmall"}>
                                your top tracks
                            </Text>
                        </Box>
                    }
                    checked={sources.tracks}
                    onChange={(event) => {
                        onChange(event.target.checked, 1)
                    }}
                />
            </motion.div>
            <motion.div
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                style={{ marginBottom: 5 }}
            >
                <CheckBox
                    id="artists-checkbox"
                    label={
                        <Box>
                            <Text size={size !== "small" ? "medium" : "xsmall"}>
                                your top artists
                            </Text>
                        </Box>
                    }
                    checked={sources.artists}
                    onChange={(event) => {
                        onChange(event.target.checked, 2)
                    }}
                />
            </motion.div>
            <motion.div
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                style={{ marginBottom: 5 }}
            >
                <CheckBox
                    id="recommended-checkbox"
                    label={
                        <Box>
                            <Select
                                options={topGenres}
                                onChange={({ option }) => {
                                    setGenreSelectValue(option)
                                }}
                                dropHeight="small"
                                closeOnChange={true}
                                placeholder="a genre"
                                size="small"
                                onSearch={(search) => {
                                    setGenreSelectValue(topGenres.find((o) => o.includes(search)))
                                }}
                                value={genreSelectValue}
                            />
                        </Box>
                    }
                    checked={sources.recommended}
                    onChange={(event) => {
                        onChange(event.target.checked, 3)
                    }}
                />
            </motion.div>
        </Box>
    )
}
