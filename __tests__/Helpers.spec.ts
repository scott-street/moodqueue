import { getTrackIdList, combineTwoArraysOnId } from "../common/Helpers"

describe("Helpers", () => {
    describe("getTrackIdList", () => {
        const mockTracks = [
            {
                artist: "mock1",
                id: "1",
                imageLink: "",
                name: "",
                previewUrl: "",
            },
            {
                artist: "mock2",
                id: "2",
                imageLink: "",
                name: "Figure 8",
                previewUrl: "",
            },
            {
                artist: "mock3",
                id: "3",
                imageLink: "",
                name: "Figure 8",
                previewUrl: "",
            },
        ]

        it("returns a string of comma seperated ids", () => {
            expect(getTrackIdList(mockTracks)).toEqual("1,2,3")
        })
    })

    describe("combineTwoArraysOnId", () => {
        const mockA = [
            {
                id: 1,
                first: "Kate",
            },
        ]
        const mockB = [
            {
                id: 1,
                last: "Brune",
            },
        ]
        it("combines objects of arrays with common ids", () => {
            expect(combineTwoArraysOnId(mockA, mockB)).toEqual([
                { id: 1, first: "Kate", last: "Brune" },
            ])
        })
    })
})
