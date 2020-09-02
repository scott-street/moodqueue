import React from "react"
import { UserInfo } from "../../types/UserInfo"

export interface AuthContextValue {
    openSpotifyAccountLogin: (param: string) => void
    setUserInfo: () => Promise<void>
    setAuthRedirect: (param: string) => void
    setAccessToken: (param: string) => void
    setRefreshToken: (param: string) => void
    redirect: string
    user: UserInfo
    accessToken: string
    refreshToken: string
}

export const AuthContext = React.createContext<AuthContextValue>({
    openSpotifyAccountLogin: () => {},
    setUserInfo: () => undefined,
    setAuthRedirect: () => undefined,
    setAccessToken: () => undefined,
    setRefreshToken: () => undefined,
    redirect: undefined,
    user: undefined,
    accessToken: undefined,
    refreshToken: undefined,
})

interface AuthProviderProps {
    value?: AuthContextValue
    children: React.ReactNode
}

export const AuthProvider: React.FunctionComponent<AuthProviderProps> = (props) => {
    const [redirect, setRedirect] = React.useState("")
    const [user, setCurrentUser] = React.useState(undefined)
    const [accessToken, setAccessToken] = React.useState(undefined)
    const [refreshToken, setRefreshToken] = React.useState(undefined)

    const generateRandomString = (length: number) => {
        let text = ""
        const possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"
        for (let i = 0; i < length; i++) {
            text += possible.charAt(Math.floor(Math.random() * possible.length))
        }
        return text
    }

    const openSpotifyAccountLogin = (redirect: string) => {
        const rand = generateRandomString(16)
        const scopes = "user-top-read user-library-read user-read-private user-read-email"
        //make sure to change show_dialog to false if we don't want to show the spotify login redirect anymore
        const url = `https://accounts.spotify.com/authorize?response_type=code&client_id=${process.env.CLIENT_ID}&scope=${scopes}&redirect_uri=${redirect}&state=${rand}&show_dialog=true`
        window.location.href = url
    }
    const setUserInfo = async () => {
        let newUser: UserInfo = {
            id: "",
            name: "",
            email: "",
            profileImages: [],
            profileUrl: "",
        }
        const response = await fetch("https://api.spotify.com/v1/me", {
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                Authorization: "Bearer " + accessToken,
            },
            method: "GET",
        })
        const data = await response.json()
        newUser = {
            id: data.id,
            name: data.display_name,
            email: data.email,
            profileImages: data.images,
            profileUrl: data.external_urls.spotify,
        }

        setCurrentUser(newUser)
    }
    const setAuthRedirect = (hostname: string) => {
        const regex = new RegExp(process.env.REVIEW_URL)
        let url: string = ""
        if (hostname.includes(process.env.DEVELOPMENT_URL)) {
            url = "http://" + process.env.DEVELOPMENT_URL + ":" + process.env.PORT
        } else if (regex.test(hostname) && !hostname.includes(process.env.STAGING_URL)) {
            url = "https://" + hostname
        } else if (hostname.includes(process.env.STAGING_URL)) {
            url = "https://" + process.env.STAGING_URL
        } else if (hostname.includes(process.env.PRODUCTION_URL)) {
            url = "https://" + process.env.PRODUCTION_URL
        }

        setRedirect(url)
    }

    const authContextValue = {
        openSpotifyAccountLogin,
        setUserInfo,
        setAuthRedirect,
        setAccessToken,
        setRefreshToken,
        redirect,
        user,
        accessToken,
        refreshToken,
    }
    return <AuthContext.Provider value={props.value ?? authContextValue} {...props} />
}

export const useAuth = () => {
    const context = React.useContext(AuthContext)
    if (!context) throw new Error("useAuth must be used within an AuthProvider")
    return context
}
