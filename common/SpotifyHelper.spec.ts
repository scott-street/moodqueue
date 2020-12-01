import fetch, { enableFetchMocks } from "jest-fetch-mock"
import topTracksMock from "./mocks/spotify/top-tracks.json"
import topArtistsMock from "./mocks/spotify/top-artists.json"
import availableSeedGenres from "./mocks/spotify/available-seed-genres.json"
import savedTracksMock from "./mocks/spotify/saved-tracks.json"
import recommendedTracksMock from "./mocks/spotify/recommended-tracks.json"
import { SpotifyHelper } from "./SpotifyHelper"
import { PropertyTrack, Track } from "../types/Track"

enableFetchMocks()

describe("SpotifyHelper", () => {
    let helper: SpotifyHelper

    beforeEach(() => {
        fetch.mockReset()
        helper = new SpotifyHelper("mockAccessToken")
    })

    describe("#get", () => {
        it("returns the response from given url as json", async () => {
            fetch.mockResponseOnce(JSON.stringify({ hello: "world" }))
            expect(await helper.get("whatever")).toEqual({ hello: "world" })
        })
        it("throws error when server returns error", async () => {
            fetch.mockRejectOnce(new Error("foo"))
            let message = ""
            try {
                await helper.get("whatever").then((response) => (message = response.message))
            } catch (e) {
                message = e.message
            }
            expect(message).toEqual("foo")
        })
    })

    describe("#getTopSongs", () => {
        it("throws an error when error fetching data", async () => {
            fetch.mockRejectOnce(new Error("foo"))
            let message = ""
            try {
                await helper.getTopSongs(1)
            } catch (e) {
                message = "foo"
            }
            expect(message).toEqual("foo")
        })
    })

    describe("#getTopArtists", () => {
        it("returns Artist[] of users top artists", async () => {
            fetch.mockResponseOnce(JSON.stringify(topArtistsMock))
            const artist = topArtistsMock.items[0]
            const expected = {
                id: artist.id,
                genres: artist.genres,
            }
            expect(await helper.getTopArtists(1)).toEqual([expected])
        })
        it("throws an error when error fetching data", async () => {
            fetch.mockRejectOnce(new Error("foo"))
            let message = ""
            try {
                await helper
                    .getTopArtists(1)
                    .then((response) => (message = (response[0] as any).message))
            } catch (e) {
                message = e.message
            }
            expect(message).toEqual("foo")
        })
    })

    describe("#getAvailableSeedGenres", () => {
        it("returns an array of seed genre names", async () => {
            fetch.mockResponseOnce(JSON.stringify(availableSeedGenres))
            const expected = availableSeedGenres.genres
            expect(await helper.getAvailableSeedGenres()).toEqual(expected)
        })
        it("throws an error when error fetching data", async () => {
            fetch.mockRejectOnce(new Error("foo"))
            let message = ""
            try {
                await helper
                    .getAvailableSeedGenres()
                    .then((response) => (message = (response[0] as any).message))
            } catch (e) {
                message = e.message
            }
            expect(message).toEqual("foo")
        })
    })

    describe("#getSavedTracks", () => {
        it("throws an error when error fetching data", async () => {
            fetch.mockRejectOnce(new Error("foo"))
            let message = ""
            try {
                await helper
                    .getSavedTracks(1)
                    .then((response) => (message = (response[0] as any).message))
            } catch (e) {
                message = e.message
            }
            expect(message).toEqual("foo")
        })
    })

    describe("#getRecommendedFromSeed", () => {
        it("returns recommended from track seed", async () => {
            const spy = jest.spyOn(helper, "get")
            fetch.mockResponseOnce(JSON.stringify(recommendedTracksMock))
            const track = recommendedTracksMock.tracks[0]
            const expected = {
                previewUrl: track.preview_url,
                name: track.name,
                artist: track.album.artists[0].name,
                imageLink: track.album.images[0].url,
                id: track.id,
                uri: track.uri,
            }
            expect(await helper.getRecommendedFromSeed("tracks", "seed", 1)).toEqual([expected])
            expect(spy).toHaveBeenCalledWith(
                "https://api.spotify.com/v1/recommendations?limit=1&seed_tracks=seed"
            )
        })
        it("returns recommended from artists seed", async () => {
            const spy = jest.spyOn(helper, "get")
            fetch.mockResponseOnce(JSON.stringify(recommendedTracksMock))
            const track = recommendedTracksMock.tracks[0]
            const expected = {
                previewUrl: track.preview_url,
                name: track.name,
                artist: track.album.artists[0].name,
                imageLink: track.album.images[0].url,
                id: track.id,
                uri: track.uri,
            }
            expect(await helper.getRecommendedFromSeed("artists", "seed", 1)).toEqual([expected])
            expect(spy).toHaveBeenCalledWith(
                "https://api.spotify.com/v1/recommendations?limit=1&seed_artists=seed"
            )
        })
        it("returns recommended from genres seed", async () => {
            const spy = jest.spyOn(helper, "get")
            fetch.mockResponseOnce(JSON.stringify(recommendedTracksMock))
            const track = recommendedTracksMock.tracks[0]
            const expected = {
                previewUrl: track.preview_url,
                name: track.name,
                artist: track.album.artists[0].name,
                imageLink: track.album.images[0].url,
                id: track.id,
                uri: track.uri,
            }
            expect(await helper.getRecommendedFromSeed("genres", "seed", 1)).toEqual([expected])
            expect(spy).toHaveBeenCalledWith(
                "https://api.spotify.com/v1/recommendations?limit=1&seed_genres=seed"
            )
        })
        it("throws error when error fetching data", async () => {
            fetch.mockRejectOnce(new Error("foo"))
            let message = ""
            try {
                await helper
                    .getRecommendedFromSeed("artists", "seed", 1)
                    .then((response) => (message = (response[0] as any).message))
            } catch (e) {
                message = e.message
            }
            expect(message).toEqual("foo")
        })
        it("throws seed type error when given incorrect seed type", async () => {
            let message = ""
            try {
                await helper.getRecommendedFromSeed("whatever", "seed", 1)
            } catch (e) {
                message = e.message
            }
            expect(message).toEqual("seed type error")
        })
    })

    describe("#getRecommendedSongs", () => {
        it("returns Track[] recommended from genre list", async () => {
            fetch.mockResponseOnce(JSON.stringify(recommendedTracksMock))
            const track = recommendedTracksMock.tracks[0]
            const expected = {
                previewUrl: track.preview_url,
                name: track.name,
                artist: track.album.artists[0].name,
                imageLink: track.album.images[0].url,
                id: track.id,
                uri: track.uri,
            }
            expect(await helper.getRecommendedSongs(["whatever"])).toEqual([expected])
        })
        it("throws error when error fetching data", async () => {
            fetch.mockRejectOnce(new Error("foo"))
            let message = ""
            try {
                await helper
                    .getRecommendedSongs(["whatever"])
                    .then((response) => (message = (response[0] as any).message))
            } catch (e) {
                message = e.message
            }
            expect(message).toEqual("foo")
        })
    })

    describe("#getTopArtistsTopSongs", () => {
        it("returns Track[] of top artists top songs", async () => {
            jest.spyOn(helper, "get").mockImplementation((input: string) => {
                if (input.includes("top-tracks")) {
                    return new Promise((resolve) => resolve(recommendedTracksMock))
                } else {
                    return new Promise((resolve) => resolve(topArtistsMock))
                }
            })
            const track = recommendedTracksMock.tracks[0]
            const expected = {
                previewUrl: track.preview_url,
                name: track.name,
                artist: track.album.artists[0].name,
                imageLink: track.album.images[0].url,
                id: track.id,
                uri: track.uri,
            }
            expect(await helper.getTopArtistsTopSongs(1)).toEqual([expected])
        })
        it("throws error when error fetching data", async () => {
            fetch.mockRejectOnce(new Error("foo"))
            let message = ""
            try {
                await helper
                    .getTopArtists(1)
                    .then((response) => (message = (response[0] as any).message))
            } catch (e) {
                message = e.message
            }
            expect(message).toEqual("foo")
        })
    })

    describe("#getPropertyTracks", () => {
        it("converts and returns Track[] to PropertyTrack[] for getMultipleTracksAudioFeatures", () => {
            const track: Track = {
                previewUrl: "",
                name: "",
                artist: "",
                imageLink: "",
                id: "abc",
                uri: "xyz",
            }
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

            expect(helper.getPropertyTracks([track])).toEqual([pTrack])
        })
    })
})
