import Head from "next/head"
import React from "react"
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
            {props.children}
        </IndexBackgroundOuter>
    )
}
