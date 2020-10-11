import React from "react"
import { motion } from "framer-motion"
import { DefaultTag, SelectedTag } from "./Tag.styles"
interface TagProps {
    text: string
    getValue: (selected: boolean) => void
}

export const Tag: React.FunctionComponent<TagProps> = (props) => {
    const { text, getValue } = props
    const [selected, setSelected] = React.useState(false)

    const toggleSelected = () => {
        setSelected(!selected)
    }

    React.useEffect(() => {
        getValue(selected)
    }, [selected])

    if (selected)
        return (
            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                <SelectedTag onClick={toggleSelected} id="tag-selected">
                    {text}
                </SelectedTag>
            </motion.div>
        )
    return (
        <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
            <DefaultTag onClick={toggleSelected} id="tag-default">
                {text}
            </DefaultTag>
        </motion.div>
    )
}
