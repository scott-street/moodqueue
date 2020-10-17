import { Artist } from "../types/Artist"
import { Track } from "../types/Track"

export class SpotifyHelper {
    constructor(private accessToken: string) {}

    private handleErrors(response) {
        if (!response.ok) {
            throw Error(response.statusText)
        }
        return response
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
        try {
            return this.get(`https://api.spotify.com/v1/me/top/tracks?limit=${count}`).then(
                (data) => {
                    return data.items.map((track) => ({
                        previewUrl: track.preview_url,
                        name: track.name,
                        artist: track.album.artists[0].name,
                        imageLink: track.album.images[0].url,
                        id: track.id,
                        uri: track.uri,
                    }))
                }
            )
        } catch (e) {
            throw e
        }
    }

    async getTopArtists(count: number): Promise<Artist[]> {
        try {
            return this.get(`https://api.spotify.com/v1/me/top/artists?limit=${count}`).then(
                (data) => {
                    return data.items.map((artist) => ({ id: artist.id, genres: artist.genres }))
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
                return data.genres
            })
        } catch (e) {
            throw e
        }
    }

    async getSavedTracks(count: number): Promise<Track[]> {
        try {
            return this.get(`https://api.spotify.com/v1/me/tracks?limit=${count}`).then((data) => {
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
            throw e
        }
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
                return data.tracks.map((track) => ({
                    previewUrl: track.preview_url,
                    name: track.name,
                    artist: track.album.artists[0].name,
                    imageLink: track.album.images[0].url,
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

            return Promise.all(
                topArtists.map(async (artist) => {
                    return this.get(
                        `https://api.spotify.com/v1/artists/${artist.id}/top-tracks?country=ES`
                    ).then((data) => {
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
            throw e
        }
    }
}
