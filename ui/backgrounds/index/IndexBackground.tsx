import { motion } from "framer-motion"
import Head from "next/head"
import React from "react"
import { colorMovementIndex } from "../../../components/animations/motion"
import { IndexBackgroundOuter } from "../Background.styles"

export const Index: React.FunctionComponent = (props) => {
    return (
        <IndexBackgroundOuter id="index-outer-box" background="#1F2730">
            {
                <Head>
                    <meta
                        name="viewport"
                        content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0"
                    />
                    <meta name="theme-color" content="#3f5efb" />

                    <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
                    <link rel="shortcut icon" href="/favicon.ico" key={0} />
                    <link rel="manifest" href="/manifest.json" />
                    <style>{"body { background: #1F2730; }"}</style>
                </Head>
            }
            <motion.div
                animate={colorMovementIndex}
                style={{
                    width: "100%",
                    height: "100%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                }}
            >
                {props.children}
            </motion.div>
        </IndexBackgroundOuter>
    )
}
