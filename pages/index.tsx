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
        setRefreshToken,
        setUserInfo,
        user,
        accessToken,
        refreshToken,
        getNewTokensFromRefreshToken,
    } = useAuth()
    const { notifySuccess } = useNotification()

    useEffect(() => {
        if (!user) {
            const refresh = localStorage.getItem("r_token")
            if (refresh && !accessToken) {
                if (!refreshToken) setRefreshToken(refresh)
                getNewTokensFromRefreshToken(refresh)
            } else document.title = "login | moodqueue"
            setAuthRedirect(new URL(window.location.href).hostname)
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
