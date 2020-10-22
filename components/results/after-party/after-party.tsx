import { motion } from "framer-motion"
import { Anchor, Box, Image, Layer } from "grommet"
import { Download, FormClose, Previous, ShareOption } from "grommet-icons"
import React, { FunctionComponent, useEffect, useState } from "react"
import { Button } from "../../../ui/button/Button"
import { Description } from "../../../ui/description/Description"
import { baseItemTop, trackDetailsVariants } from "../../animations/motion"
import { Mood as Happy } from "@styled-icons/material-twotone/Mood"
import { GlassCheers as Party } from "@styled-icons/fa-solid/GlassCheers"

interface AfterPartyProps {
    resetForm(): void
    size: string
}

export const AfterParty: FunctionComponent<AfterPartyProps> = (props) => {
    const { resetForm, size } = props
    const [showLayer, setShowLayer] = useState(false)
    const [isOpen, setIsOpen] = useState(true)

    useEffect(() => {
        document.title = "happy listening! | moodqueue"
    }, [])

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
                        <Box
                            gap="medium"
                            border="between"
                            justify="center"
                            alignContent="center"
                            width="large"
                        >
                            <Box align="center" direction="row" justify="evenly">
                                {size !== "small" && (
                                    <motion.div
                                        animate={{
                                            rotate: [15, -15],
                                            transition: { duration: 1, yoyo: Infinity },
                                            x: [10, 10, -10, -10],
                                            y: [0, -5, -5, 0],
                                        }}
                                    >
                                        <Happy
                                            width="24px"
                                            height="24px"
                                            id="happy-emoji-after-party"
                                        />
                                    </motion.div>
                                )}
                                <Description
                                    text="welcome to the after party!"
                                    textAlign="center"
                                    size="large"
                                    weight="bold"
                                />
                                {size !== "small" && (
                                    <motion.div
                                        animate={{
                                            rotate: [35, -35, 35, -35],
                                            transition: { duration: 2, yoyo: Infinity },
                                            y: [3, -3],
                                            x: [-5, 5, -5, 5],
                                        }}
                                    >
                                        <Party width="24px" height="24px" id="after-party-emoji" />
                                    </motion.div>
                                )}
                            </Box>
                            <Box align="center" gap="medium">
                                <Description
                                    text="we really appreciate you including us in elevating your spotify game to the next level, 
                  and as a token of our appreciation, be sure to snag an image of your moodqueue to show your friends and family!"
                                    textAlign="center"
                                    size="medium"
                                />
                                <Box align="center" gap="small">
                                    <Description
                                        weight="bold"
                                        text="happy listening!"
                                        textAlign="center"
                                        size="medium"
                                    />
                                    {size === "small" && (
                                        <motion.div
                                            animate={{
                                                rotate: [35, -35, 35, -35],
                                                transition: { duration: 2, yoyo: Infinity },
                                                y: [3, -3],
                                                x: [-5, 5, -5, 5],
                                            }}
                                        >
                                            <Party
                                                width="24px"
                                                height="24px"
                                                id="after-party-emoji"
                                            />
                                        </motion.div>
                                    )}
                                </Box>
                            </Box>
                        </Box>
                        <Box gap="medium" align="center">
                            <Button
                                text={size === "small" ? "share" : "share your moodqueue"}
                                id="ap-share-btn"
                                icon={<ShareOption />}
                                onClick={() => {
                                    setIsOpen(true)
                                    setShowLayer(true)
                                }}
                            />
                            <Button
                                text={size === "small" ? "back" : "start over"}
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
                        style={
                            size === "small"
                                ? {
                                      display: "flex",
                                      alignItems: "center",
                                      flex: 1,
                                      height: "100%",
                                  }
                                : undefined
                        }
                    >
                        <Box
                            fill={size === "small"}
                            pad="medium"
                            background={{ color: "#9B59B6" }}
                            round={size !== "small"}
                            align="center"
                            justify="center"
                            gap="medium"
                        >
                            <Image
                                style={{ borderRadius: 10 }}
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
                                <Button
                                    text={
                                        size === "small" ? "download" : "download moodqueue image"
                                    }
                                    icon={<Download />}
                                />
                            </Anchor>
                            {size === "small" && (
                                <Box align="center">
                                    <Button
                                        color="neutral-3"
                                        onClick={() => {
                                            setIsOpen(false)
                                            setTimeout(() => setShowLayer(false), 500)
                                        }}
                                        icon={<FormClose />}
                                        small
                                    />
                                </Box>
                            )}
                        </Box>
                    </motion.div>
                </Layer>
            )}
        </Box>
    )
}
