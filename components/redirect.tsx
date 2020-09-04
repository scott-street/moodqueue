import React, { FunctionComponent, useEffect } from "react"
import { Box } from "grommet"
import { useAuth } from "../common/hooks/useAuth"
import { useNotification } from "../common/hooks/useNotification"

interface RedirectProps {
    children: React.ReactNode
}

const Redirect: FunctionComponent<RedirectProps> = (props) => {
    const { setAccessToken, setRefreshToken, redirect } = useAuth()
    const { notifyError } = useNotification()

    useEffect(() => {
        if (redirect) {
            const params = new URLSearchParams(window.location.search)
            if (params.has("error")) {
                notifyError("login failed")
            } else {
                getTokens(params.get("code")).then((data) => {
                    setAccessToken(data.access_token)
                    setRefreshToken(data.refresh_token)
                    window.history.pushState(
                        "object or string",
                        "Title",
                        "/" +
                            window.location.href
                                .substring(window.location.href.lastIndexOf("/") + 1)
                                .split("?")[0]
                    )
                })
            }
        }
    }, [redirect])

    const getTokens = async (code: string) => {
        const token =
            "Basic " +
            Buffer.from(`${process.env.CLIENT_ID}:${process.env.CLIENT_SECRET}`).toString("base64")

        const response = await fetch("https://accounts.spotify.com/api/token", {
            body: `grant_type=authorization_code&code=${code}&redirect_uri=${redirect}`,
            headers: {
                Authorization: token,
                "Content-Type": "application/x-www-form-urlencoded",
            },
            method: "POST",
        })

        return await response.json()
    }
    return (
        <Box align="center" justify="center">
            {props.children}
        </Box>
    )
}

export default Redirect
