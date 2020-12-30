import { processQueue } from "./QueueProcessor"
import { happyComparator } from "./MoodComparators"
import { mockPropertyTracks } from "./mocks/PropertyTracks"

describe("QueueProcessors", () => {
    describe("processQueue", () => {
        it("returns an array that is the length of count", () => {
            expect(
                processQueue({
                    entities: mockPropertyTracks,
                    comparator: happyComparator,
                    count: 4,
                    explicit: true,
                }).length
            ).toEqual(4)
        })

        it("returns an array that is less than count because of explicit content filtering", () => {
            expect(
                processQueue({
                    entities: mockPropertyTracks,
                    comparator: happyComparator,
                    count: 9,
                    explicit: false,
                }).length
            ).toEqual(8)
        })

        it("returns array that is sorted to given comparator", () => {
            expect(
                processQueue({
                    entities: mockPropertyTracks,
                    comparator: happyComparator,
                    count: 1,
                    explicit: true,
                })
            ).toEqual([
                {
                    acousticness: 0.0669,
                    analysis_url:
                        "https://api.spotify.com/v1/audio-analysis/2SPxgEush9C8GS5RqgXdqi",
                    artist: "Perfume Genius",
                    danceability: 0.648,
                    duration_ms: 155547,
                    energy: 0.755,
                    id: "2SPxgEush9C8GS5RqgXdqi",
                    imageLink: "https://i.scdn.co/image/ab67616d0000b273e9a375a80097985178b73c4d",
                    instrumentalness: 0.00699,
                    key: 9,
                    liveness: 0.346,
                    loudness: -5.33,
                    mode: 1,
                    name: "Without You",
                    previewUrl:
                        "https://p.scdn.co/mp3-preview/97534965187cf94ea45ac30f046627c1e5f123eb?cid=cdb58c25fa4c42f4bd84049394c75c4c",
                    speechiness: 0.0289,
                    tempo: 133.515,
                    time_signature: 4,
                    track_href: "https://api.spotify.com/v1/tracks/2SPxgEush9C8GS5RqgXdqi",
                    type: "audio_features",
                    uri: "spotify:track:2SPxgEush9C8GS5RqgXdqi",
                    valence: 0.831,
                    explicit: false,
                },
            ])
        })
    })
})
