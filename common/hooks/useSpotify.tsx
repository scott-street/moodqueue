import React from "react"
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
import { getTrackIdList, combineTwoArraysOnId } from "../Helpers"

export interface SpotifyContextValue {
    getQueue: (
        trackSource: TrackSource[],
        count: number,
        mood: Mood,
        topGenres?: string[]
    ) => Promise<Track[]>
    addToQueue: (tracks: Track[]) => Promise<void | void[]>
    addToPlaylist: (tracks: Track[]) => Promise<void>
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
                        uri: track.uri,
                    } as Track)
            )

            return tracks
        } catch (e) {
            notifyError("Error retrieving top songs")
        }
    }

    interface ArtistGenre {
        id: string
        genres: string[]
    }
    const getTopArtists = async (count: number): Promise<ArtistGenre[]> => {
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
                    return data.items.map(
                        (artist) => ({ id: artist.id, genres: artist.genres } as ArtistGenre)
                    )
                })
        } catch (e) {
            notifyError("Error retrieving top artists")
        }
    }

    const getTopGenres = async (count: number): Promise<string[]> => {
        const topArtistsAndGenres: ArtistGenre[] = await getTopArtists(15)
        const genreArrays = topArtistsAndGenres.map((o) => o.genres)
        const allGenres: string[] = [].concat.apply([], genreArrays)
        const countOccurrences = (arr, val) => arr.reduce((a, v) => (v === val ? a + 1 : a), 0)
        const comparator = (g1, g2) => {
            return countOccurrences(allGenres, g2) - countOccurrences(allGenres, g1)
        }
        const ordered = allGenres.sort(comparator)
        const unique = Array.from(new Set(ordered))
        return unique.splice(0, count)
    }

    const getAvailableSeedGenres = async (): Promise<string[]> => {
        try {
            return await fetch(`https://api.spotify.com/v1/recommendations/available-genre-seeds`, {
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
                    return data.genres
                })
        } catch (e) {
            notifyError("Error retrieving top artists")
        }
    }

    const getRecommendedFromSeed = async (
        type: string,
        seed: string,
        count: number
    ): Promise<Track[]> => {
        let url
        if (type === "tracks") {
            url = `https://api.spotify.com/v1/recommendations?limit=${count}&seed_tracks=${seed}`
        } else if (type === "artists") {
            url = `https://api.spotify.com/v1/recommendations?limit=${count}&seed_artists=${seed}`
        } else if (type === "genres") {
            url = `https://api.spotify.com/v1/recommendations?limit=${count}&seed_genres=${seed}`
        } else {
            return
        }

        return await fetch(url, {
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
                return data.tracks.map((track) => ({
                    previewUrl: track.preview_url,
                    name: track.name,
                    artist: track.album.artists[0].name,
                    imageLink: track.album.images[0].url,
                    id: track.id,
                    uri: track.uri,
                }))
            })
    }

    const getRecommendedSongs = async (topGenres: string[]): Promise<Track[]> => {
        try {
            return await getRecommendedFromSeed("genres", topGenres.join(","), 50)
        } catch (e) {
            notifyError("Error retrieving recommended songs")
        }
    }

    const getTopArtistsTopSongs = async (count: number) => {
        try {
            const topArtists = await getTopArtists(count)

            return await Promise.all(
                topArtists.map(async (artist) => {
                    return await fetch(
                        `https://api.spotify.com/v1/artists/${artist.id}/top-tracks?country=ES`,
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
                                uri: data.tracks[0].uri,
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
                        uri: item.track.uri,
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
                        "Error adding songs to queue. \n Spotify must be playing music to add to queue."
                    )
                } else {
                    notifySuccess("Songs added to queue")
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
            notifyError("Error adding to playlist")
        }
    }

    const moodqueuePlaylistId = (items: { name: string; id: string }[]): string => {
        const exists = items.find((o) => o.name === "moodqueue")
        if (exists) return exists.id
        return ""
    }

    const createMoodqueuePlaylist = async (): Promise<void> => {
        try {
            return await fetch(`https://api.spotify.com/v1/users/${user.id}/playlists`, {
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                    Authorization: "Bearer " + accessToken,
                },
                body: JSON.stringify({ name: "moodqueue", public: "false" }),
                method: "POST",
            }).then((res) => {
                if (!res.ok) {
                    notifyError("Error creating moodqueue playlist.")
                } else {
                    notifySuccess("moodqueue playlist created")
                }
            })
        } catch (e) {
            throw e
        }
    }

    const addSongsToPlaylist = async (uris: string, playlistId): Promise<void> => {
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
                    notifyError("Error adding songs to playlist.")
                } else {
                    notifySuccess("Songs added to playlist")
                }
            })
        } catch (e) {
            throw e
        }
    }
    const addToPlaylist = async (tracks: Track[]): Promise<void> => {
        const trackUris = tracks.map((o) => o.uri).join(",")
        const userPlaylists = await getUserPlaylists()
        const moodqueueId = moodqueuePlaylistId(userPlaylists)
        if (moodqueueId) {
            return addSongsToPlaylist(trackUris, moodqueueId)
        } else {
            return createMoodqueuePlaylist().then(() => {
                addToPlaylist(tracks)
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
        console.log("TOP GENRES", topGenres)

        if (trackSource.includes(TrackSource.TOP_SONGS)) {
            await getTopSongs(50).then(async (songs) => {
                await getMultipleTracksAudioFeatures(songs).then((topTracks) => {
                    tracks = tracks.concat(topTracks)
                })
            })
        }
        if (trackSource.includes(TrackSource.RECOMMENDED_SONGS)) {
            await getRecommendedSongs(topGenres).then(async (songs) => {
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
        } else if (mood === Mood.SLEEPY) {
            comparator = sleepyComparator
        } else if (mood === Mood.PARTY) {
            comparator = partyComparator
        } else if (mood === Mood.DRIVING) {
            comparator = drivingComparator
        } else {
            comparator = sadComparator
        }

        return processQueue({
            entities: tracks,
            comparator: comparator,
            count: count,
        })
    }

    const addToQueue = (tracks: Track[]): Promise<void | void[]> => {
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
