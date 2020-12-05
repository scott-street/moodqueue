import React from "react"
import * as Sentry from "@sentry/browser"
import { UserInfo } from "../../types/UserInfo"

export interface AuthContextValue {
    openSpotifyAccountLogin: (param: string, param2: string) => void
    getNewTokensFromRefreshToken: (param: string) => Promise<string>
    setUserInfo: () => Promise<void>
    setAuthRedirect: (param: string) => void
    setAccessToken: (param: string) => void
    setRefreshToken: (param: string) => void
    logOut: () => void
    redirect: string
    user: UserInfo
    accessToken: string
    refreshToken: string
}

export const AuthContext = React.createContext<AuthContextValue>({
    openSpotifyAccountLogin: () => undefined,
    getNewTokensFromRefreshToken: () => undefined,
    setUserInfo: () => undefined,
    setAuthRedirect: () => undefined,
    setAccessToken: () => undefined,
    setRefreshToken: () => undefined,
    logOut: () => undefined,
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
    const [accessToken, setAccessToken] = React.useState(undefined) //"BQDYSUz3PJ2Wp9pHyjZCoohq7nHmNPhW1rIay6WFsaTAmiLbX55ZbWaTcKs2J9tO-DBuRHMovC2veSluwteykaJIhK3BM4Gw_TSAcpDk9GBJey6aB-vDRcnNWL8qIeKsPIlLqktQTRPhHcZrz6ioYgjGWkYDEleNjb2jX7mMCityLn_3bTHL1Tu6yWSC_PBuvRDEPXvt2F7ERnt0MtjSa_TPTm3Q8NYDJwt2QX5rzoMlOz7RaI7_zHhzvT23tEndHJ-AIA"
    const [refreshToken, setRefreshToken] = React.useState(undefined)

    const generateRandomString = (length: number) => {
        let text = ""
        const possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"
        for (let i = 0; i < length; i++) {
            text += possible.charAt(Math.floor(Math.random() * possible.length))
        }
        return text
    }

    const openSpotifyAccountLogin = (redirect: string, size: string) => {
        const rand = generateRandomString(16)
        const scopes =
            "user-top-read user-library-read user-read-private user-read-email user-modify-playback-state playlist-read-private playlist-modify-private playlist-modify-private"
        const forceDialog = size === "small" ? false : true
        //make sure to change show_dialog to false if we don't want to show the spotify login redirect anymore
        const url = `https://accounts.spotify.com/authorize?response_type=code&client_id=${process.env.CLIENT_ID}&scope=${scopes}&redirect_uri=${redirect}&state=${rand}&show_dialog=${forceDialog}`
        window.location.href = url
    }

    const setUserInfo = async () => {
        let newUser: UserInfo = {
            id: "",
            name: "",
            email: "",
            profileImages: [],
            profileUrl: "",
            product: "",
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
            product: data.product,
        }
        setCurrentUser(newUser)
        Sentry.captureMessage(`Login`)
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

    const getNewTokensFromRefreshToken = async (rToken: string): Promise<string> => {
        const token =
            "Basic " +
            Buffer.from(`${process.env.CLIENT_ID}:${process.env.CLIENT_SECRET}`).toString("base64")

        const response = await fetch("https://accounts.spotify.com/api/token", {
            body: `grant_type=refresh_token&refresh_token=${rToken}`,
            headers: {
                Authorization: token,
                "Content-Type": "application/x-www-form-urlencoded",
            },
            method: "POST",
        })
        const data = await response.json()
        console.log(data.access_token)
        setAccessToken(data.access_token)
        return data.access_token
    }

    const logOut = () => {
        localStorage.removeItem("r_token")
        setAccessToken(undefined)
    }

    const authContextValue = {
        openSpotifyAccountLogin,
        getNewTokensFromRefreshToken,
        setUserInfo,
        setAuthRedirect,
        setAccessToken,
        setRefreshToken,
        redirect,
        user,
        accessToken,
        refreshToken,
        logOut,
    }
    return <AuthContext.Provider value={props.value ?? authContextValue} {...props} />
}

export const useAuth = () => {
    const context = React.useContext(AuthContext)
    if (!context) throw new Error("useAuth must be used within an AuthProvider")
    return context
}
