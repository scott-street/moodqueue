import {
    happyComparator,
    partyComparator,
    sadComparator,
    sleepyComparator,
    drivingComparator,
} from "./MoodComparators"
import { mockPropertyTracks } from "./mocks/PropertyTracks"

describe("MoodComparators", () => {
    const happierTrack = mockPropertyTracks.find((o) => o.name === "I Want You To Love Me")
    const sadderTrack = mockPropertyTracks.find((o) => o.name === "Garden Song")
    const lowEnergyTrack = mockPropertyTracks.find((o) => o.name === "Unforgivable")
    const highEnergyTrack = mockPropertyTracks.find((o) => o.name === "Without You")
    const tempo133Track = mockPropertyTracks.find((o) => o.name === "Without You")
    const tempo77Track = mockPropertyTracks.find((o) => o.name === "Like That Bitch")

    describe("happyComparator", () => {
        it("returns negative if the first song has a higher valence", () => {
            expect(happyComparator(happierTrack, sadderTrack)).toBeLessThan(0)
        })
        it("returns positive if the first song has a lower valence", () => {
            expect(happyComparator(sadderTrack, happierTrack)).toBeGreaterThan(0)
        })
        it("returns 0 if the songs have the same valence", () => {
            expect(happyComparator(happierTrack, happierTrack)).toEqual(0)
        })
    })
    describe("sadComparator", () => {
        it("returns negative if the first song has a lower valence", () => {
            expect(sadComparator(sadderTrack, happierTrack)).toBeLessThan(0)
        })
        it("returns positive if the first song has a higher valence", () => {
            expect(sadComparator(happierTrack, sadderTrack)).toBeGreaterThan(0)
        })
        it("returns 0 if the songs have the same valence", () => {
            expect(sadComparator(sadderTrack, sadderTrack)).toEqual(0)
        })
    })

    describe("sleepyComparator", () => {
        it("returns negative if the first song has lower energy", () => {
            expect(sleepyComparator(lowEnergyTrack, highEnergyTrack)).toBeLessThan(0)
        })
        it("returns positive if the first song has higher energy", () => {
            expect(sleepyComparator(highEnergyTrack, lowEnergyTrack)).toBeGreaterThan(0)
        })
        it("returns 0 if the songs have the same energy", () => {
            expect(sleepyComparator(lowEnergyTrack, lowEnergyTrack)).toEqual(0)
        })
    })

    describe("partyComparator", () => {
        it("returns negative if the first song has higher energy", () => {
            expect(partyComparator(highEnergyTrack, lowEnergyTrack)).toBeLessThan(0)
        })
        it("returns positive if the first song has lower energy", () => {
            expect(partyComparator(lowEnergyTrack, highEnergyTrack)).toBeGreaterThan(0)
        })
        it("returns 0 if the songs have the same energy", () => {
            expect(partyComparator(highEnergyTrack, highEnergyTrack)).toEqual(0)
        })
    })

    describe("drivingComparator", () => {
        it("returns negative if the first song is closer to 127 bpm", () => {
            expect(drivingComparator(tempo133Track, tempo77Track)).toBeLessThan(0)
        })
        it("returns positive if the first song is farther to 127 bpm", () => {
            expect(drivingComparator(tempo77Track, tempo133Track)).toBeGreaterThan(0)
        })
        it("returns 0 if they are equally away from 127 bpm", () => {
            expect(drivingComparator(tempo133Track, tempo133Track)).toEqual(0)
        })
    })
})
