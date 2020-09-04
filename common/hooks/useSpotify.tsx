import React from "react"
import { useAuth } from "./useAuth"
import { Track } from "../../types/Track"
import { useNotification } from "./useNotification"

export interface SpotifyContextValue {
    getTopSongs: (count: number) => Promise<Track[]>
    getTopArtists: (count: number) => Promise<string[]>
    getRecommendedSongs: (count: number) => Promise<Track[]>
    getTopArtistsTopSongs: (count: number) => Promise<Track[]>
    getSavedTracks: (count: number) => Promise<Track[]>
}

export const SpotifyContext = React.createContext<SpotifyContextValue>({
    getTopSongs: () => undefined,
    getTopArtists: () => undefined,
    getRecommendedSongs: () => undefined,
    getTopArtistsTopSongs: () => undefined,
    getSavedTracks: () => undefined,
})

interface SpotifyProviderProps {
    value?: SpotifyContextValue
    children: React.ReactNode
}

export const SpotifyProvider: React.FunctionComponent<SpotifyProviderProps> = (props) => {
    const { accessToken } = useAuth()
    const { notifyError } = useNotification()

    const getTopSongs = async (count: number): Promise<Track[]> => {
        try {
            const response = await fetch(
                `https://api.spotify.com/v1/me/top/tracks?limit=${count}`,
                {
                    headers: {
                        Accept: "application/json",
                        "Content-Type": "application/json",
                        Authorization: "Bearer " + accessToken,
                    },
                    method: "GET",
                }
            )
            const data = await response.json()
            const tracks: Track[] = data.items.map(
                (track) =>
                    ({
                        previewUrl: track.preview_url,
                        name: track.name,
                        artist: track.album.artists[0].name,
                        imageLink: track.album.images[0].url,
                        id: track.id,
                    } as Track)
            )

            return tracks
        } catch (e) {
            notifyError("Error retrieving top songs")
        }
    }

    const getTopArtists = async (count: number): Promise<string[]> => {
        try {
            return await fetch(`https://api.spotify.com/v1/me/top/artists?limit=${count}`, {
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                    Authorization: "Bearer " + accessToken,
                },
                method: "GET",
            })
                .then((data) => {
                    return data.json()
                })
                .then((data) => {
                    return data.items.map((artist) => artist.id)
                })
        } catch (e) {
            notifyError("Error retrieving top artists")
        }
    }

    const getRecommendedSongs = async (count: number): Promise<Track[]> => {
        try {
            const topArtists: string = (await getTopArtists(count)).join(",")
            return await fetch(
                `https://api.spotify.com/v1/recommendations?limit=${count}&seed_artists=${topArtists}`,
                {
                    headers: {
                        Accept: "application/json",
                        "Content-Type": "application/json",
                        Authorization: "Bearer " + accessToken,
                    },
                    method: "GET",
                }
            )
                .then((data) => {
                    return data.json()
                })
                .then((data) => {
                    return data.tracks.map((track) => ({
                        previewUrl: track.preview_url,
                        name: track.name,
                        artist: track.album.artists[0].name,
                        imageLink: track.album.images[0].url,
                        id: track.id,
                    }))
                })
        } catch (e) {
            notifyError("Error retrieving recommended songs")
        }
    }

    const getTopArtistsTopSongs = async (count: number) => {
        try {
            const topArtists = await getTopArtists(count)

            return await Promise.all(
                topArtists.map(async (artistId) => {
                    return await fetch(
                        `https://api.spotify.com/v1/artists/${artistId}/top-tracks?country=ES`,
                        {
                            headers: {
                                Accept: "application/json",
                                "Content-Type": "application/json",
                                Authorization: "Bearer " + accessToken,
                            },
                            method: "GET",
                        }
                    )
                        .then((data) => {
                            return data.json()
                        })
                        .then((data) => {
                            return {
                                previewUrl: data.tracks[0].preview_url,
                                name: data.tracks[0].name,
                                artist: data.tracks[0].album.artists[0].name,
                                imageLink: data.tracks[0].album.images[0].url,
                                id: data.tracks[0].id,
                            }
                        })
                })
            )
        } catch (e) {
            notifyError("Error retrieving top artist's songs")
        }
    }

    const getSavedTracks = async (count: number): Promise<Track[]> => {
        try {
            return await fetch(`https://api.spotify.com/v1/me/tracks?limit=${count}`, {
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                    Authorization: "Bearer " + accessToken,
                },
                method: "GET",
            })
                .then((data) => {
                    return data.json()
                })
                .then((data) => {
                    return data.items.map((item) => ({
                        previewUrl: item.track.preview_url,
                        name: item.track.name,
                        artist: item.track.album.artists[0].name,
                        imageLink: item.track.album.images[0].url,
                        id: item.track.id,
                    }))
                })
        } catch (e) {
            notifyError("Error retrieving saved tracks")
        }
    }

    const spotifyContextValue = {
        getTopSongs,
        getTopArtists,
        getRecommendedSongs,
        getTopArtistsTopSongs,
        getSavedTracks,
    }

    return <SpotifyContext.Provider value={props.value ?? spotifyContextValue} {...props} />
}

export const useSpotify = () => {
    const context = React.useContext(SpotifyContext)
    if (!context) throw new Error("useSpotify must be used inside SpotifyProvider")
    return context
}
