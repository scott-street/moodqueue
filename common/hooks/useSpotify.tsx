import React from "react"
import * as Sentry from "@sentry/browser"
import { useAuth } from "./useAuth"
import { Track, PropertyTrack } from "../../types/Track"
import { TrackSource } from "../../types/TrackSource"
import { Mood } from "../../types/Mood"
import {
    happyComparator,
    partyComparator,
    sadComparator,
    sleepyComparator,
    drivingComparator,
} from "../MoodComparators"
import { useNotification } from "./useNotification"
import { processQueue } from "../QueueProcessor"
import { getTrackIdList, combineTwoArraysOnId, getSourcesString } from "../Helpers"
import { SpotifyHelper } from "../SpotifyHelper"
import { FormSelection } from "../../types/FormSelection"

export interface SpotifyContextValue {
    getQueue: (
        trackSource: TrackSource[],
        count: number,
        mood: Mood,
        topGenres?: string[]
    ) => Promise<Track[]>
    addToQueue: (tracks: Track[]) => Promise<void | void[]>
    addToPlaylist: (tracks: Track[], mood: Mood, sources: FormSelection) => Promise<void>
    getAvailableSeedGenres: () => Promise<string[]>
}

export const SpotifyContext = React.createContext<SpotifyContextValue>({
    getQueue: () => undefined,
    addToQueue: () => undefined,
    addToPlaylist: () => undefined,
    getAvailableSeedGenres: () => undefined,
})

interface SpotifyProviderProps {
    value?: SpotifyContextValue
    children: React.ReactNode
}

export const SpotifyProvider: React.FunctionComponent<SpotifyProviderProps> = (props) => {
    const { accessToken, user } = useAuth()
    const { notifyError, notifySuccess } = useNotification()
    const spotifyHelper = new SpotifyHelper(accessToken)

    const getAvailableSeedGenres = async (): Promise<string[]> => {
        return spotifyHelper.getAvailableSeedGenres()
    }

    const getMultipleTracksAudioFeatures = async (
        tracks: Track[]
    ): Promise<PropertyTrack[] | void[]> => {
        let result: PropertyTrack[] = []
        const max = tracks.length
        let left = 0
        let right = 99
        if (max < right) right = max

        while (right <= max) {
            const currentSet = tracks.slice(left, right)
            const temp = await fetch(
                `https://api.spotify.com/v1/audio-features?ids=${getTrackIdList(currentSet)}`,
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
            result.push(...temp)
            left = right + 1
            right = right + 100
            if (max < right) right = max
            if (max <= left) break
        }
        return result
    }

    const addSongToQueue = async (uri: string) => {
        try {
            return await fetch(`https://api.spotify.com/v1/me/player/queue?uri=${uri}`, {
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                    Authorization: "Bearer " + accessToken,
                },
                method: "POST",
            }).then((res) => {
                if (!res.ok) {
                    notifyError(
                        "Error adding songs to queue! \n Spotify must be playing music to add to queue."
                    )
                } else {
                    notifySuccess("Songs added to queue!")
                }
            })
        } catch (e) {
            throw e
        }
    }

    const getUserPlaylists = async (): Promise<{ name: string; id: string }[]> => {
        try {
            return await fetch(`https://api.spotify.com/v1/users/${user.id}/playlists`, {
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
                    return data.items
                })
                .then((data) => {
                    return data.map((o) => ({ name: o.name, id: o.id }))
                })
        } catch (e) {
            notifyError("Error adding to playlist :(")
        }
    }

    const moodqueuePlaylistId = (items: { name: string; id: string }[], mood: Mood): string => {
        const exists = items.find((o) => o.name === `moodqueue-${Mood[mood].toLowerCase()}`)
        if (exists) return exists.id
        return ""
    }

    const createMoodqueuePlaylist = async (mood: Mood, sources: FormSelection): Promise<void> => {
        try {
            return await fetch(`https://api.spotify.com/v1/users/${user.id}/playlists`, {
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                    Authorization: "Bearer " + accessToken,
                },
                body: JSON.stringify({
                    name: `moodqueue-${Mood[mood].toLowerCase()}`,
                    public: "false",
                    description: `a ${Mood[
                        mood
                    ].toLowerCase()} playlist based off your ${getSourcesString(sources)}`,
                }),
                method: "POST",
            }).then((res) => {
                if (!res.ok) {
                    notifyError(`Error creating ${Mood[mood].toLowerCase()} moodqueue playlist :(`)
                } else {
                    notifySuccess(`${Mood[mood].toLowerCase()} moodqueue playlist created!`)
                }
            })
        } catch (e) {
            throw e
        }
    }

    const addSongsToPlaylist = async (uris: string, playlistId): Promise<void> => {
        Sentry.captureMessage(`add to playlist`)
        try {
            return await fetch(
                `https://api.spotify.com/v1/playlists/${playlistId}/tracks?uris=${uris}`,
                {
                    headers: {
                        Accept: "application/json",
                        "Content-Type": "application/json",
                        Authorization: "Bearer " + accessToken,
                    },
                    method: "POST",
                }
            ).then((res) => {
                if (!res.ok) {
                    notifyError("Error adding songs to playlist :(")
                } else {
                    notifySuccess("Songs added to playlist!")
                }
            })
        } catch (e) {
            throw e
        }
    }
    const addToPlaylist = async (
        tracks: Track[],
        mood: Mood,
        sources: FormSelection
    ): Promise<void> => {
        const trackUris = tracks.map((o) => o.uri).join(",")
        const userPlaylists = await getUserPlaylists()
        const moodqueueId = moodqueuePlaylistId(userPlaylists, mood)
        if (moodqueueId) {
            return addSongsToPlaylist(trackUris, moodqueueId)
        } else {
            return createMoodqueuePlaylist(mood, sources).then(() => {
                addToPlaylist(tracks, mood, sources)
            })
        }
    }

    const getQueue = async (
        trackSource: TrackSource[],
        count: number,
        mood: Mood,
        topGenres?: string[]
    ): Promise<Track[]> => {
        let tracks = []

        if (trackSource.includes(TrackSource.TOP_SONGS)) {
            Sentry.captureMessage(`source includes top songs`)
            await spotifyHelper.getTopSongs(50).then(async (songs) => {
                await getMultipleTracksAudioFeatures(songs).then((topTracks) => {
                    tracks = tracks.concat(topTracks)
                })
            })
        }
        if (trackSource.includes(TrackSource.RECOMMENDED_SONGS)) {
            Sentry.captureMessage(`source includes recommended songs`)
            await spotifyHelper.getRecommendedSongs(topGenres).then(async (songs) => {
                await getMultipleTracksAudioFeatures(songs).then((recommendedTracks) => {
                    tracks = tracks.concat(recommendedTracks)
                })
            })
        }
        if (trackSource.includes(TrackSource.TOP_ARTISTS_SONGS)) {
            Sentry.captureMessage(`soure includes top artists`)
            await spotifyHelper.getTopArtistsTopSongs(50).then(async (songs) => {
                await getMultipleTracksAudioFeatures(songs).then((topArtistsTracks) => {
                    tracks = tracks.concat(topArtistsTracks)
                })
            })
        }
        if (trackSource.includes(TrackSource.SAVED_SONGS)) {
            Sentry.captureMessage(`source includes saved songs`)
            await spotifyHelper.getSavedTracks(50).then(async (songs) => {
                await getMultipleTracksAudioFeatures(songs).then((savedTracks) => {
                    tracks = tracks.concat(savedTracks)
                })
            })
        }

        //as we add more moods, we will add more comparators
        let comparator
        if (mood === Mood.HAPPY) {
            Sentry.captureMessage(`Mood: Happy`)
            comparator = happyComparator
        } else if (mood === Mood.SLEEPY) {
            Sentry.captureMessage(`Mood: Sleepy`)
            comparator = sleepyComparator
        } else if (mood === Mood.PARTY) {
            Sentry.captureMessage(`Mood: Party`)
            comparator = partyComparator
        } else if (mood === Mood.DRIVING) {
            Sentry.captureMessage(`Mood: Driving`)
            comparator = drivingComparator
        } else {
            Sentry.captureMessage(`Mood: Sad`)
            comparator = sadComparator
        }
        let trackSet = Array.from(new Set(tracks.map((o) => JSON.stringify(o)).values())).map((o) =>
            JSON.parse(o)
        )

        return processQueue({
            entities: trackSet,
            comparator: comparator,
            count: count,
        })
    }

    const addToQueue = (tracks: Track[]): Promise<void | void[]> => {
        Sentry.captureMessage(`add to queue`)
        return Promise.all(
            tracks.map((track) => {
                addSongToQueue(track.uri)
            })
        ).catch((e) => notifyError(e))
    }

    const spotifyContextValue = {
        getQueue,
        addToQueue,
        getAvailableSeedGenres,
        addToPlaylist,
    }

    return <SpotifyContext.Provider value={props.value ?? spotifyContextValue} {...props} />
}

export const useSpotify = () => {
    const context = React.useContext(SpotifyContext)
    if (!context) throw new Error("useSpotify must be used inside SpotifyProvider")
    return context
}
