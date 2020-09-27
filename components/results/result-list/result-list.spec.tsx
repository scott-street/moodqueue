import React from "react"
import { expect } from "chai"
import { render, shallow } from "enzyme"
import { ResultList } from "./"
import { ResultListItem } from "../result-list-item"
import { Track } from "../../../types/Track"

const mockTracks: Track[] = [
    {
        previewUrl: "",
        name: "myMockTrack1",
        artist: "myMockArtist1",
        imageLink: "",
        id: "1",
        uri: "",
    },
    {
        previewUrl: "",
        name: "myMockTrack2",
        artist: "myMockArtist2",
        imageLink: "",
        id: "2",
        uri: "",
    },
    {
        previewUrl: "",
        name: "myMockTrack3",
        artist: "myMockArtist3",
        imageLink: "",
        id: "3",
        uri: "",
    },
]

describe("<ResultList />", () => {
    it("renders without crashing", () => {
        render(<ResultList tracks={mockTracks} size={"large"} dispatch={jest.fn()} />)
    })

    it("renders a <ResultListItem /> for each track", () => {
        const wrapper = shallow(
            <ResultList tracks={mockTracks} size={"large"} dispatch={jest.fn()} />
        )

        expect(wrapper.find(ResultListItem)).to.have.length(mockTracks.length)
    })
})
