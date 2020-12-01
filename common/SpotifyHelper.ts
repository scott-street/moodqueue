import { Artist } from "../types/Artist"
import { PropertyTrack, Track } from "../types/Track"

export class SpotifyHelper {
    constructor(private accessToken: string) {}

    private handleErrors(response) {
        if (!response.ok) {
            throw Error(response.status)
        }
        return response
    }

    hasError = (response: any) => {
        if (response.stack) {
            return (response.stack as string).includes("Error")
        }
        return false
    }

    async get(url: string) {
        return fetch(url, {
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                Authorization: "Bearer " + this.accessToken,
            },
            method: "GET",
        })
            .then(this.handleErrors)
            .then((response) => {
                return response.json()
            })
            .catch((e) => {
                throw e
            })
    }

    async getTopSongs(count: number): Promise<Track[]> {
        const tracks: Track[] = []
        let timeRange = ["short_term", "medium_term", "long_term"]

        let temp = await this.get(
            `https://api.spotify.com/v1/me/top/tracks?time_range=${timeRange[1]}&limit=${count}`
        ).then((data) => {
            if (!data.items) return [data]
            return data.items.map((track) => ({
                previewUrl: track.preview_url,
                name: track.name,
                artist: track.album.artists[0].name,
                imageLink: track.album.images[0] ? track.album.images[0].url : "",
                id: track.id,
                uri: track.uri,
            }))
        })
        tracks.push(...temp)

        temp = await this.get(
            `https://api.spotify.com/v1/me/top/tracks?time_range=${timeRange[2]}&limit=${count}`
        ).then((data) => {
            if (!data.items) return []
            return data.items.map((track) => ({
                previewUrl: track.preview_url,
                name: track.name,
                artist: track.album.artists[0].name,
                imageLink: track.album.images[0] ? track.album.images[0].url : "",
                id: track.id,
                uri: track.uri,
            }))
        })
        tracks.push(...temp)

        return tracks
    }

    async getTopArtists(count: number): Promise<Artist[]> {
        try {
            return this.get(`https://api.spotify.com/v1/me/top/artists?limit=${count}`).then(
                (data) => {
                    if (!data.items) return [data]
                    return data.items.map((artist) => ({
                        id: artist.id,
                        genres: artist.genres,
                    }))
                }
            )
        } catch (e) {
            throw e
        }
    }

    async getAvailableSeedGenres(): Promise<string[]> {
        try {
            return this.get(
                `https://api.spotify.com/v1/recommendations/available-genre-seeds`
            ).then((data) => {
                if (!data.genres) return [data]
                return data.genres
            })
        } catch (e) {
            throw e
        }
    }

    async getSavedTracks(count: number): Promise<Track[]> {
        const tracks: Track[] = []
        let temp: Track[] = []
        let n = 0
        let error: any = undefined

        do {
            temp = await this.get(
                `https://api.spotify.com/v1/me/tracks?offset=${n}&limit=${count}`
            ).then((data) => {
                if (!data.items) {
                    error = data
                    return []
                }
                if (data.items.length === 0) {
                    return []
                }
                return data.items.map((item) => ({
                    previewUrl: item.track.preview_url,
                    name: item.track.name,
                    artist: item.track.album.artists[0].name,
                    imageLink: item.track.album.images[0] ? item.track.album.images[0].url : "",
                    id: item.track.id,
                    uri: item.track.uri,
                }))
            })
            if (temp.length !== 0) {
                tracks.push(...temp)
                n = n + 50
            }
        } while (temp.length !== 0)
        if (error) return [error]
        return tracks
    }

    async getRecommendedFromSeed(type: string, seed: string, count: number): Promise<Track[]> {
        let url
        if (type === "tracks") {
            url = `https://api.spotify.com/v1/recommendations?limit=${count}&seed_tracks=${seed}`
        } else if (type === "artists") {
            url = `https://api.spotify.com/v1/recommendations?limit=${count}&seed_artists=${seed}`
        } else if (type === "genres") {
            url = `https://api.spotify.com/v1/recommendations?limit=${count}&seed_genres=${seed}`
        } else {
            throw Error("seed type error")
        }

        try {
            return this.get(url).then((data) => {
                if (!data.tracks) return [data]
                return data.tracks.map((track) => ({
                    previewUrl: track.preview_url,
                    name: track.name,
                    artist: track.album.artists[0].name,
                    imageLink: track.album.images[0] ? track.album.images[0].url : "",
                    id: track.id,
                    uri: track.uri,
                }))
            })
        } catch (e) {
            throw e
        }
    }

    async getRecommendedSongs(topGenres: string[]): Promise<Track[]> {
        try {
            return await this.getRecommendedFromSeed("genres", topGenres.join(","), 50)
        } catch (e) {
            throw e
        }
    }

    async getTopArtistsTopSongs(count: number): Promise<Track[]> {
        try {
            const topArtists = await this.getTopArtists(count)
            if (this.hasError(topArtists[0])) {
                return [topArtists[0] as any]
            }

            return Promise.all(
                topArtists.map(async (artist) => {
                    return this.get(
                        `https://api.spotify.com/v1/artists/${artist.id}/top-tracks?country=ES`
                    ).then((data) => {
                        return {
                            previewUrl: data.tracks[0].preview_url,
                            name: data.tracks[0].name,
                            artist: data.tracks[0].album.artists[0].name,
                            imageLink: data.tracks[0].album.images[0]
                                ? data.tracks[0].album.images[0].url
                                : "",
                            id: data.tracks[0].id,
                            uri: data.tracks[0].uri,
                        }
                    })
                })
            )
        } catch (e) {
            throw e
        }
    }

    getPropertyTracks(tracks: Track[]): PropertyTrack[] {
        let propTracks: PropertyTrack[] = []
        tracks.map((track) => {
            const pTrack: PropertyTrack = {
                ...track,
                acousticness: 0,
                analysis_url: "",
                danceability: 0,
                duration_ms: 0,
                energy: 0,
                instrumentalness: 0,
                key: 0,
                liveness: 0,
                loudness: 0,
                mode: 0,
                speechiness: 0,
                tempo: 0,
                time_signature: 0,
                track_href: "",
                type: "",
                valence: 0,
            }
            propTracks.push(pTrack)
        })
        return propTracks
    }
}
