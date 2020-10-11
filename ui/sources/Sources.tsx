import React from "react"
import { motion } from "framer-motion"
import { CheckBox } from "./Sources.styles"
import { Box, Text } from "grommet"
import { FormSelection } from "../../types/FormSelection"
import { TagContainer } from "../tag-container/TagContainer"

interface SourcesProps {
    size?: any
    sources: FormSelection
    topGenres: string[]
    onChange?: (value: boolean, index: number) => void
    getSelectedGenres: (genres: string[]) => void
}
export const Sources: React.FunctionComponent<SourcesProps> = (props) => {
    const { size, onChange, sources, topGenres, getSelectedGenres } = props
    const [selectedGenres, setSelectedGenres] = React.useState([])
    const [recommended, setRecommended] = React.useState(false)

    React.useEffect(() => {
        getSelectedGenres(selectedGenres)
    }, [selectedGenres])

    return (
        <Box gap="small">
            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                <CheckBox
                    id="saved-checkbox"
                    label={
                        <Box>
                            <Text size={size !== "small" ? "medium" : "xsmall"}>saved songs</Text>
                        </Box>
                    }
                    checked={sources.saved}
                    onChange={(event) => {
                        onChange(event.target.checked, 0)
                    }}
                />
            </motion.div>
            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                <CheckBox
                    id="tracks-checkbox"
                    label={
                        <Box>
                            <Text size={size !== "small" ? "medium" : "xsmall"}>top tracks</Text>
                        </Box>
                    }
                    checked={sources.tracks}
                    onChange={(event) => {
                        onChange(event.target.checked, 1)
                    }}
                />
            </motion.div>
            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                <CheckBox
                    id="artists-checkbox"
                    label={
                        <Box>
                            <Text size={size !== "small" ? "medium" : "xsmall"}>top artists</Text>
                        </Box>
                    }
                    checked={sources.artists}
                    onChange={(event) => {
                        onChange(event.target.checked, 2)
                    }}
                />
            </motion.div>
            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                <CheckBox
                    id="recommended-checkbox"
                    label={
                        <Box>
                            <Text size={size !== "small" ? "medium" : "xsmall"}>recommended</Text>
                        </Box>
                    }
                    checked={sources.recommended}
                    onChange={(event) => {
                        onChange(event.target.checked, 3)
                        setRecommended(event.target.checked)
                    }}
                />
            </motion.div>
            <div style={{ paddingLeft: 20 }}>
                {recommended && <TagContainer values={topGenres} getSelected={setSelectedGenres} />}
            </div>
        </Box>
    )
}
