import React from "react"
import { motion } from "framer-motion"
import { CheckBox } from "./Sources.styles"
import { Box, Text, Select, Layer } from "grommet"
import { FormSelection } from "../../types/FormSelection"
import { Button } from "../button/Button"
import { Close, Checkmark } from "grommet-icons"
import { trackDetailsVariants } from "../../components/animations/motion"
import { Heart as Liked } from "@styled-icons/remix-fill/Heart"
import { Music as TopTracks } from "@styled-icons/evaicons-solid/Music"
import { MusicArtist as TopArtists } from "@styled-icons/zondicons/MusicArtist"
import { FolderMusic as Genre } from "@styled-icons/entypo/FolderMusic"

interface SourcesProps {
    size?: any
    sources: FormSelection
    genres: string[]
    onChange?: (value: any, index: number) => void
}
export const Sources: React.FunctionComponent<SourcesProps> = (props) => {
    const { size, onChange, sources, genres } = props
    const [showGenre, setShowGenre] = React.useState(false)
    const [isOpen, setIsOpen] = React.useState(false)

    return (
        <Box align="center">
            <Box gap="small">
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <CheckBox
                        id="saved-checkbox"
                        label={
                            <Box
                                direction="row"
                                align="center"
                                gap="small"
                                id="liked-checkbox-label"
                            >
                                <Liked width="24px" height="24px" />
                                <Text
                                    size={size !== "small" ? "medium" : "xsmall"}
                                    textAlign="center"
                                >
                                    your liked songs
                                </Text>
                            </Box>
                        }
                        checked={sources.saved}
                        onChange={(event) => {
                            onChange(event.target.checked, 0)
                        }}
                    />
                </motion.div>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <CheckBox
                        id="tracks-checkbox"
                        label={
                            <Box
                                direction="row"
                                align="center"
                                gap="small"
                                id="tracks-checkbox-label"
                            >
                                <TopTracks width="24px" height="24px" />
                                <Text
                                    size={size !== "small" ? "medium" : "xsmall"}
                                    textAlign="center"
                                >
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
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <CheckBox
                        id="artists-checkbox"
                        label={
                            <Box
                                direction="row"
                                align="center"
                                gap="small"
                                id="artists-checkbox-label"
                            >
                                <TopArtists width="24px" height="24px" />
                                <Text
                                    size={size !== "small" ? "medium" : "xsmall"}
                                    textAlign="center"
                                >
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
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <CheckBox
                        id="recommended-checkbox"
                        label={
                            size !== "small" ? (
                                <Box
                                    direction="row"
                                    align="center"
                                    gap="small"
                                    id="genre-checkbox-label"
                                >
                                    <Genre width="24px" height="24px" />
                                    <Box width="small">
                                        <Select
                                            size="small"
                                            id="genre-select"
                                            options={genres}
                                            onChange={({ option }) => {
                                                onChange(option, 4)
                                                onChange(true, 3)
                                            }}
                                            dropHeight="small"
                                            dropAlign={{ bottom: "top", left: "left" }}
                                            closeOnChange={false}
                                            placeholder="a genre"
                                            onSearch={(search) => {
                                                onChange(
                                                    genres.find((o) => o.includes(search)),
                                                    4
                                                )
                                            }}
                                            value={sources.genres}
                                        />
                                    </Box>
                                </Box>
                            ) : (
                                <Box
                                    direction="row"
                                    align="center"
                                    gap="small"
                                    id="genre-checkbox-label"
                                >
                                    <Genre width="24px" height="24px" />
                                    <Text size="xsmall">
                                        {sources.genres[0] ? sources.genres : "a genre"}
                                    </Text>
                                </Box>
                            )
                        }
                        checked={sources.recommended}
                        onChange={(event) => {
                            if (size !== "small") {
                                if (!event.target.checked) {
                                    onChange("", 4)
                                }
                                onChange(event.target.checked, 3)
                            } else {
                                setShowGenre(event.target.checked)
                                setIsOpen(event.target.checked)
                                onChange(event.target.checked, 3)
                                if (!event.target.checked) onChange("", 4)
                            }
                        }}
                    />
                </motion.div>
            </Box>
            {showGenre && size === "small" && (
                <Layer
                    onClickOutside={() => {
                        if (!sources.genres[0]) {
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
                        width: "100%",
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
                            pad={{ horizontal: "large", top: "large", bottom: "small" }}
                            gap="medium"
                            fill
                            flex
                            background={{ color: "#34495E", opacity: 0.9 }}
                        >
                            <Select
                                options={genres}
                                onChange={({ option }) => {
                                    onChange(option, 4)
                                    if (!sources.recommended) onChange(true, 3)
                                }}
                                dropHeight="small"
                                closeOnChange
                                placeholder="select a genre"
                                onSearch={(search) => {
                                    onChange(
                                        genres.find((o) => o.includes(search)),
                                        4
                                    )
                                }}
                                value={sources.genres}
                            />
                            <Box align="center" direction="row" gap="medium">
                                <Button
                                    small
                                    disabled={!sources.genres[0]}
                                    icon={<Checkmark />}
                                    color="neutral-3"
                                    onClick={() => {
                                        setIsOpen(false)
                                        setTimeout(() => setShowGenre(false), 500)
                                    }}
                                />
                                <Button
                                    small
                                    icon={<Close />}
                                    color="neutral-4"
                                    onClick={() => {
                                        onChange("", 4)
                                        onChange(false, 3)
                                        setIsOpen(false)
                                        setTimeout(() => setShowGenre(false), 500)
                                    }}
                                />
                            </Box>
                        </Box>
                    </motion.div>
                </Layer>
            )}
        </Box>
    )
}
