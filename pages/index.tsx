import React, { FunctionComponent, useState, useEffect } from "react"
import { Box, Grommet, grommet, ResponsiveContext } from "grommet"
import Form from "../components/form"
import Redirect from "../components/redirect"
import { BounceLoader } from "react-spinners"
import Head from "next/head"
import { Login } from "../components/login"
import { AuthProvider, useAuth } from "../common/hooks/useAuth"
import { NotificationProvider, useNotification } from "../common/hooks/useNotification"

const BaseApp: FunctionComponent = () => {
    const [accessToken, setAccessToken] = useState("")
    // have to figure out a smart way of using this refresh token to prevent timed log out
    const [refreshToken, setRefreshToken] = useState("")
    const [loadForRedirect, setLoadForRedirect] = useState(false)
    const [refresh, setRefresh] = useState(true)

    const { setAuthRedirect, redirect, getUserInfo, user } = useAuth()
    const { notifySuccess, notifyError } = useNotification()

    useEffect(() => {
        if (!user) {
            setAuthRedirect(new URL(window.location.href).hostname)

            const params = new URLSearchParams(window.location.search)
            if ((params.has("code") && params.has("state")) || params.has("error")) {
                // spotify redirects back to / with either a code or error message
                // either way, process it with redirect.tsx and set screen to load
                setRefresh(false)
                setLoadForRedirect(true)
            } else if (params.has("access_token") && params.has("refresh_token")) {
                // user has successfully logged in and given moodqueue permission
                setUpHome(params)
            } else setRefresh(false)
        } else setRefresh(false)
    }, [])

    const setUpHome = (params: URLSearchParams) => {
        setAccessToken(params.get("access_token"))
        setRefreshToken(params.get("refresh_token"))
        getUserInfo(params.get("access_token")).then(() => {
            notifySuccess("welcome to moodqueue")
            setRefresh(false)
        })
    }

    const handleError = () => {
        notifyError("login failed")
        setLoadForRedirect(false)
    }

    return (
        <Grommet theme={grommet} full>
            <ResponsiveContext.Consumer>
                {(size) => (
                    <Box
                        align="center"
                        justify="center"
                        fill
                        style={{
                            background:
                                "linear-gradient(215deg, rgba(63,94,251,1) 30%, rgba(252,70,107,1) 100%)",
                        }}
                        background="#1F2730" // this is to force the dark theme
                    >
                        <Head>
                            <link rel="shortcut icon" href="/favicon.ico" key={0} />
                            <title key={1}>{user ? "home | moodqueue" : "login | moodqueue"}</title>
                        </Head>
                        {loadForRedirect ? (
                            <Redirect redirect={redirect} handleError={handleError} />
                        ) : user ? (
                            <Form user={user} />
                        ) : (
                            <Box align="center" justify="center">
                                {refresh ? (
                                    <BounceLoader size={300} color="#6FFFB0" />
                                ) : (
                                    <Login size={size} />
                                )}
                            </Box>
                        )}
                    </Box>
                )}
            </ResponsiveContext.Consumer>
        </Grommet>
    )
}

const App = () => (
    <AuthProvider>
        <NotificationProvider>
            <BaseApp />
        </NotificationProvider>
    </AuthProvider>
)
export default App
