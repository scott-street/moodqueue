import React, { FunctionComponent, useEffect } from "react"
import { Grommet, ResponsiveContext } from "grommet"
import { Home } from "../components/home"
import Redirect from "../components/redirect"
import { BounceLoader } from "react-spinners"
import { Login } from "../components/login"
import { AuthProvider, useAuth } from "../common/hooks/useAuth"
import { NotificationProvider, useNotification } from "../common/hooks/useNotification"
import { SpotifyProvider } from "../common/hooks/useSpotify"
import { theme } from "../components/app.styles"
import { Index } from "../ui/backgrounds/index/IndexBackground"

const BaseApp: FunctionComponent = () => {
    const {
        setAuthRedirect,
        setUserInfo,
        user,
        setAccessToken,
        setRefreshToken,
        accessToken,
    } = useAuth()
    const { notifySuccess } = useNotification()

    useEffect(() => {
        document.title = "login | moodqueue"
        if (!user) {
            setAuthRedirect(new URL(window.location.href).hostname)
            const params = new URLSearchParams(window.location.search)
            if (params.has("access_token") && params.has("refresh_token")) {
                setAccessToken(params.get("access_token"))
                setRefreshToken(params.get("refresh_token"))
            }
        }
    }, [])

    useEffect(() => {
        if (accessToken) {
            setUserInfo()
            notifySuccess("welcome to moodqueue")
        }
    }, [accessToken])

    return (
        <Grommet theme={theme} full>
            <ResponsiveContext.Consumer>
                {(size) => (
                    <Index>
                        {accessToken ? (
                            user ? (
                                <Home user={user} size={size} />
                            ) : (
                                <BounceLoader
                                    size={size === "large" ? 300 : size === "medium" ? 200 : 100}
                                    color="#6FFFB0"
                                />
                            )
                        ) : (
                            <Login size={size} />
                        )}
                    </Index>
                )}
            </ResponsiveContext.Consumer>
        </Grommet>
    )
}

const App = () => (
    <AuthProvider>
        <NotificationProvider>
            <SpotifyProvider>
                <Redirect>
                    <BaseApp />
                </Redirect>
            </SpotifyProvider>
        </NotificationProvider>
    </AuthProvider>
)
export default App
