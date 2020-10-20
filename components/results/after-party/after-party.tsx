import { motion } from "framer-motion"
import { Anchor, Box, Image, Layer } from "grommet"
import { Download, Previous, ShareOption } from "grommet-icons"
import React, { FunctionComponent, useState } from "react"
import { Button } from "../../../ui/button/Button"
import { Description } from "../../../ui/description/Description"
import { baseItemTop, trackDetailsVariants } from "../../animations/motion"

interface AfterPartyProps {
    resetForm(): void
}

export const AfterParty: FunctionComponent<AfterPartyProps> = (props) => {
    const { resetForm } = props
    const [showLayer, setShowLayer] = useState(false)
    const [isOpen, setIsOpen] = useState(true)

    return (
        <Box flex>
            <Box justify="center" align="center" flex>
                <motion.div
                    variants={baseItemTop}
                    style={{
                        width: "100%",
                        height: "100%",
                    }}
                >
                    <Box justify="evenly" fill align="center">
                        <Box gap="medium" border="between" justify="center" alignContent="center">
                            <Description
                                text="congrats on a successful moodqueue!"
                                textAlign="center"
                                size="large"
                                weight="bold"
                            />
                            <Description
                                text="your queue/playlist now exists over at spotify so any reordering or removing of tracks will have to be done there."
                                textAlign="center"
                                size="medium"
                            />
                        </Box>
                        <Box gap="medium" align="center">
                            <Button
                                text="share your moodqueue"
                                id="ap-share-btn"
                                icon={<ShareOption />}
                                onClick={() => {
                                    setIsOpen(true)
                                    setShowLayer(true)
                                }}
                            />
                            <Button
                                text="start over"
                                secondary
                                onClick={resetForm}
                                icon={<Previous />}
                                id="ap-back-btn"
                            />
                        </Box>
                    </Box>
                </motion.div>
            </Box>
            {showLayer && (
                <Layer
                    position="center"
                    animation={false}
                    style={{ background: "transparent" }}
                    onClickOutside={() => {
                        setIsOpen(false)
                        setTimeout(() => setShowLayer(false), 500)
                    }}
                >
                    <motion.div
                        variants={trackDetailsVariants("large")}
                        animate={isOpen ? "open" : "closed"}
                        initial={{ scale: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        <Box
                            pad="medium"
                            background={{ color: "#9B59B6" }}
                            round
                            align="center"
                            justify="center"
                            gap="medium"
                        >
                            <Image
                                id="moodqueue-img"
                                fit="cover"
                                fill
                                src="https://music-b26f.kxcdn.com/wp-content/uploads/2020/02/Phoebe-Bridgers-Press-Photo-2020.png"
                            />

                            <Anchor
                                href="https://music-b26f.kxcdn.com/wp-content/uploads/2020/02/Phoebe-Bridgers-Press-Photo-2020.png"
                                download="moodqueue.png"
                                target="blank"
                            >
                                <Button text="download moodqueue image" icon={<Download />} />
                            </Anchor>
                        </Box>
                    </motion.div>
                </Layer>
            )}
        </Box>
    )
}
