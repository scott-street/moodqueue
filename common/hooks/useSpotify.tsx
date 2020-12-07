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
    addToQueue: (tracks: Track[]) => Promise<boolean>
    addToPlaylist: (tracks: Track[], mood: Mood, sources: FormSelection) => Promise<boolean>
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
    const { user, getNewTokensFromRefreshToken } = useAuth()
    let { accessToken, refreshToken } = useAuth()
    const { notifyError, notifySuccess, notifyInfo } = useNotification()
    let spotifyHelper = new SpotifyHelper(accessToken)

    const getAvailableSeedGenres = async (): Promise<string[]> => {
        let response = await spotifyHelper.getAvailableSeedGenres()
        if (spotifyHelper.hasError(response[0])) {
            return []
            //   if ((response[0] as any).message === '401') {
            //     await refreshContext();
            //     return getAvailableSeedGenres();
            //   } else {
            //     notifyError('Something went wrong :( Try reloading the page.');
            //     return [];
            //   }
        }
        return response
    }

    const getMultipleTracksAudioFeatures = async (tracks: Track[]): Promise<PropertyTrack[]> => {
        let result: PropertyTrack[] = spotifyHelper.getPropertyTracks(tracks)
        const max = tracks.length
        let left = 0
        let right = 100
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
                    return combineTwoArraysOnId(result, data.audio_features)
                })
            result = temp
            left = right
            right = right + 100
            if (max < right) right = max
            if (max <= left) break
        }
        return result
    }

    const addSongToQueue = async (uri: string): Promise<Number> => {
        try {
            await fetch(`https://api.spotify.com/v1/me/player/queue?uri=${uri}`, {
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                    Authorization: "Bearer " + accessToken,
                },
                method: "POST",
            }).then((res) => {
                if (!res.ok && res.status !== 401) {
                    notifyError(
                        "Error adding songs to queue!\nSpotify must be playing music to add to queue."
                    )
                }
                return res.status
            })
        } catch (e) {
            return e.status
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
                    if (!data.items) return data
                    return data.items
                })
                .then((data) => {
                    if (data.error) return [data]
                    return data.map((o) => ({ name: o.name, id: o.id }))
                })
        } catch (e) {
            notifyError("Error fetching playlists :(")
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
                    ].toLowerCase()} playlist based on your ${getSourcesString(
                        sources
                    )} - created with love by moodqueue <3`,
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

    const addSongsToPlaylist = async (uris: string, playlistId, mood: Mood): Promise<boolean> => {
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
                    return false
                } else {
                    notifySuccess(`Songs added to your ${Mood[mood].toLowerCase()} playlist!`)
                    return true
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
    ): Promise<boolean> => {
        const trackUris = tracks.map((o) => o.uri).join(",")
        const userPlaylists = await getUserPlaylists()
        const error = (userPlaylists[0] as any).error
        if (error) {
            if (error.status === 401) {
                await refreshContext()
                const result = addToPlaylist(tracks, mood, sources)
                return result
            } else notifyError("Something went wrong :( Please try again or start over.")
        } else {
            if (tracks.length > 0) {
                const moodqueueId = moodqueuePlaylistId(userPlaylists, mood)
                if (moodqueueId) {
                    return addSongsToPlaylist(trackUris, moodqueueId, mood)
                } else {
                    await createMoodqueuePlaylist(mood, sources)
                    return addToPlaylist(tracks, mood, sources)
                }
            } else notifyInfo("You can't create or update a playlist without any songs :(")
        }
    }

    const refreshContext = async () => {
        const r_token = refreshToken || localStorage.getItem("r_token")
        const token = await getNewTokensFromRefreshToken(r_token)
        accessToken = token
        spotifyHelper = new SpotifyHelper(token)
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
                if (spotifyHelper.hasError(songs[0])) {
                    if ((songs[0] as any).message === "401") {
                        await refreshContext()
                        tracks = await getQueue(trackSource, count, mood, topGenres)
                        return tracks
                    } else {
                        notifyError("Something went wrong :( Try reloading the page.")
                        return
                    }
                } else {
                    await getMultipleTracksAudioFeatures(songs).then((topTracks) => {
                        tracks = tracks.concat(topTracks)
                    })
                }
            })
        }
        if (trackSource.includes(TrackSource.RECOMMENDED_SONGS)) {
            Sentry.captureMessage(`source includes recommended songs`)
            await spotifyHelper.getRecommendedSongs(topGenres).then(async (songs) => {
                if (spotifyHelper.hasError(songs[0])) {
                    if ((songs[0] as any).message === "401") {
                        await refreshContext()
                        tracks = await getQueue(trackSource, count, mood, topGenres)
                        return tracks
                    } else {
                        notifyError("Something went wrong :( Try reloading the page.")
                        return
                    }
                } else {
                    await getMultipleTracksAudioFeatures(songs).then((recommendedTracks) => {
                        tracks = tracks.concat(recommendedTracks)
                    })
                }
            })
        }
        if (trackSource.includes(TrackSource.TOP_ARTISTS_SONGS)) {
            Sentry.captureMessage(`source includes top artists`)
            await spotifyHelper.getTopArtistsTopSongs(50).then(async (songs) => {
                if (spotifyHelper.hasError(songs[0])) {
                    if ((songs[0] as any).message === "401") {
                        await refreshContext()
                        tracks = await getQueue(trackSource, count, mood, topGenres)
                        return tracks
                    } else {
                        notifyError("Something went wrong :( Try reloading the page.")
                        return
                    }
                } else {
                    await getMultipleTracksAudioFeatures(songs).then((topArtistsTracks) => {
                        tracks = tracks.concat(topArtistsTracks)
                    })
                }
            })
        }
        if (trackSource.includes(TrackSource.SAVED_SONGS)) {
            Sentry.captureMessage(`source includes saved songs`)
            await spotifyHelper.getSavedTracks(50).then(async (songs) => {
                if (spotifyHelper.hasError(songs[0])) {
                    if ((songs[0] as any).message === "401") {
                        await refreshContext()
                        tracks = await getQueue(trackSource, count, mood, topGenres)
                        return tracks
                    } else {
                        notifyError("Something went wrong :( Try reloading the page.")
                        return
                    }
                } else {
                    await getMultipleTracksAudioFeatures(songs).then((savedTracks) => {
                        tracks = tracks.concat(savedTracks)
                    })
                }
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

    const addToQueue = async (tracks: Track[]): Promise<boolean> => {
        Sentry.captureMessage(`add to queue`)
        if (tracks.length > 0) {
            try {
                return await Promise.all(
                    tracks.map(async (track) => {
                        const status = await addSongToQueue(track.uri)
                        if (status === 401) {
                            await refreshContext()
                            addToQueue(tracks)
                        }
                    })
                ).then((resp) => {
                    if (resp.includes(undefined)) return false
                    else return true
                })
            } catch (e) {
                notifyError(e)
                return false
            }
        } else notifyInfo("There are no songs to add to your queue :(")
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
