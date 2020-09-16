import {
    happyComparator,
    partyComparator,
    sadComparator,
    sleepyComparator,
} from "../common/MoodComparators"
import { mockPropertyTracks } from "../common/mocks/PropertyTracks"

describe("MoodComparators", () => {
    const happierTrack = mockPropertyTracks.find((o) => o.name === "I Want You To Love Me")
    const sadderTrack = mockPropertyTracks.find((o) => o.name === "Garden Song")
    const lowEnergyTrack = mockPropertyTracks.find((o) => o.name === "Unforgivable")
    const highEnergyTrack = mockPropertyTracks.find((o) => o.name === "Without You")

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
})
