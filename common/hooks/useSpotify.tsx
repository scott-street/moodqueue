import React from "react"
import { useAuth } from "./useAuth"
import { Track, PropertyTrack } from "../../types/Track"
import { TrackSource } from "../../types/TrackSource"
import { Mood } from "../../types/Mood"
import { happyComparator, sadComparator } from "../MoodComparators"
import { useNotification } from "./useNotification"
import { processQueue } from "../QueueProcessor"
import { getTrackIdList, combineTwoArraysOnId } from "../Helpers"

export interface SpotifyContextValue {
    getQueue: (trackSource: TrackSource[], count: number, mood: Mood) => Promise<Track[]>
}

export const SpotifyContext = React.createContext<SpotifyContextValue>({
    getQueue: () => undefined,
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
            const topArtists: string = (await getTopArtists(5)).join(",")
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

    const getMultipleTracksAudioFeatures = async (
        tracks: Track[]
    ): Promise<PropertyTrack[] | void[]> => {
        try {
            return await fetch(
                `https://api.spotify.com/v1/audio-features?ids=${getTrackIdList(tracks)}`,
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
                    return combineTwoArraysOnId(tracks, data.audio_features)
                })
        } catch (e) {
            notifyError("Error")
        }
    }

    const getQueue = async (
        trackSource: TrackSource[],
        count: number,
        mood: Mood
    ): Promise<Track[]> => {
        let tracks = []

        if (trackSource.includes(TrackSource.TOP_SONGS)) {
            await getTopSongs(50).then(async (songs) => {
                await getMultipleTracksAudioFeatures(songs).then((topTracks) => {
                    tracks = tracks.concat(topTracks)
                })
            })
        }
        if (trackSource.includes(TrackSource.RECOMMENDED_SONGS)) {
            await getRecommendedSongs(50).then(async (songs) => {
                await getMultipleTracksAudioFeatures(songs).then((recommendedTracks) => {
                    tracks = tracks.concat(recommendedTracks)
                })
            })
        }
        if (trackSource.includes(TrackSource.TOP_ARTISTS_SONGS)) {
            await getTopArtistsTopSongs(50).then(async (songs) => {
                await getMultipleTracksAudioFeatures(songs).then((topArtistsTracks) => {
                    tracks = tracks.concat(topArtistsTracks)
                })
            })
        }
        if (trackSource.includes(TrackSource.SAVED_SONGS)) {
            await getSavedTracks(50).then(async (songs) => {
                await getMultipleTracksAudioFeatures(songs).then((savedTracks) => {
                    tracks = tracks.concat(savedTracks)
                })
            })
        }

        //as we add more moods, we will add more comparators
        let comparator
        if (mood === Mood.HAPPY) {
            comparator = happyComparator
        } else {
            comparator = sadComparator
        }

        return processQueue({
            entities: tracks,
            comparator: comparator,
            count: count,
        })
    }

    const spotifyContextValue = {
        getQueue,
    }

    return <SpotifyContext.Provider value={props.value ?? spotifyContextValue} {...props} />
}

export const useSpotify = () => {
    const context = React.useContext(SpotifyContext)
    if (!context) throw new Error("useSpotify must be used inside SpotifyProvider")
    return context
}
