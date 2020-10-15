import React from "react"
import { motion } from "framer-motion"
import { CheckBox } from "./Sources.styles"
import { Box, Text, Select, Layer } from "grommet"
import { FormSelection } from "../../types/FormSelection"
import { Button } from "../button/Button"
import { FormClose } from "grommet-icons"
import { trackDetailsVariants } from "../../components/animations/motion"

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
    const [showGenre, setShowGenre] = React.useState(false)
    const [isOpen, setIsOpen] = React.useState(false)

    React.useEffect(() => {
        getSelectedGenres([genreSelectValue])
    }, [genreSelectValue])

    return (
        <Box align="center">
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
                                <Text size={size !== "small" ? "medium" : "xsmall"}>
                                    {genreSelectValue || "a genre"}
                                </Text>
                            </Box>
                        }
                        checked={sources.recommended}
                        onChange={() => {
                            setShowGenre(true)
                            setIsOpen(true)
                            onChange(true, 3)
                        }}
                    />
                </motion.div>
            </Box>
            {showGenre && (
                <Layer
                    onClickOutside={() => {
                        if (!genreSelectValue) {
                            onChange(false, 3)
                        }
                        setIsOpen(false)
                        setTimeout(() => setShowGenre(false), 500)
                    }}
                    responsive={false}
                    position="bottom"
                    animation={false}
                    style={{
                        background: "transparent",
                    }}
                >
                    <motion.div
                        variants={trackDetailsVariants("small")}
                        animate={isOpen ? "open" : "closed"}
                        initial={{ y: 500, opacity: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        <Box
                            style={{
                                borderColor: "#6FFFB0",
                                borderWidth: 2,
                                borderStyle: "solid solid none solid",
                                borderTopLeftRadius: 25,
                                borderTopRightRadius: 25,
                            }}
                            align="center"
                            pad={{ horizontal: "medium", top: "medium", bottom: "xsmall" }}
                            gap="small"
                            fill
                            flex
                            background={{ color: "#34495E", opacity: 0.8 }}
                        >
                            <Select
                                options={topGenres}
                                onChange={({ option }) => {
                                    setGenreSelectValue(option)
                                    onChange(true, 3)
                                }}
                                dropHeight="small"
                                closeOnChange
                                placeholder="select a genre"
                                onSearch={(search) => {
                                    setGenreSelectValue(topGenres.find((o) => o.includes(search)))
                                }}
                                value={genreSelectValue}
                            />
                            <Button
                                small
                                icon={<FormClose />}
                                color="neutral-4"
                                onClick={() => {
                                    setGenreSelectValue("")
                                    onChange(false, 3)
                                    setIsOpen(false)
                                    setTimeout(() => setShowGenre(false), 500)
                                }}
                            />
                        </Box>
                    </motion.div>
                </Layer>
            )}
        </Box>
    )
}
