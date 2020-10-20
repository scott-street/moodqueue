import React from "react"
import { expect } from "chai"
import { mount, shallow } from "enzyme"
import { Track } from "../../../types/Track"
import { Options } from "./"

const mockTrack: Track = {
    previewUrl:
        "https://p.scdn.co/mp3-preview/97534965187cf94ea45ac30f046627c1e5f123eb?cid=cdb58c25fa4c42f4bd84049394c75c4c",
    name: "Without You",
    artist: "Perfume Genius",
    imageLink: "https://i.scdn.co/image/ab67616d0000b273e9a375a80097985178b73c4d",
    id: "2SPxgEush9C8GS5RqgXdqi",
    uri: "spotify:track:2SPxgEush9C8GS5RqgXdqi",
}

describe("<Options />", () => {
    it("renders without crashing", () => {
        shallow(<Options track={mockTrack} size={"large"} dispatch={jest.fn()} close={jest.fn()} />)
    })

    it("renders null if track is undefined", () => {
        const wrapper = shallow(
            <Options track={undefined} size={"large"} dispatch={jest.fn()} close={jest.fn()} />
        )

        expect(wrapper.find("#options-layer")).to.have.length(0)
    })

    it("renders the album artwork that matches the src", () => {
        const wrapper = mount(
            <Options track={mockTrack} size={"large"} dispatch={jest.fn()} close={jest.fn()} />
        )

        expect(wrapper.find("#album-artwork-img").at(0).props().src).equal(mockTrack.imageLink)
    })

    it("renders the audio element if track has preview url", () => {
        const wrapper = mount(
            <Options track={mockTrack} size={"large"} dispatch={jest.fn()} close={jest.fn()} />
        )

        expect(wrapper.find("#previewPlayer").at(0)).to.have.length(1)
    })

    it("does not render the audio element if track does not have a url", () => {
        const mockTrackWithNoPreview: Track = {
            previewUrl: "",
            name: "Without You",
            artist: "Perfume Genius",
            imageLink: "https://i.scdn.co/image/ab67616d0000b273e9a375a80097985178b73c4d",
            id: "2SPxgEush9C8GS5RqgXdqi",
            uri: "spotify:track:2SPxgEush9C8GS5RqgXdqi",
        }

        const wrapper = mount(
            <Options
                track={mockTrackWithNoPreview}
                size={"large"}
                dispatch={jest.fn()}
                close={jest.fn()}
            />
        )

        expect(wrapper.find("#previewPlayer")).to.have.length(0)
    })

    it("renders an anchor for user to open up track in spotify", () => {
        const wrapper = mount(
            <Options track={mockTrack} size={"large"} dispatch={jest.fn()} close={jest.fn()} />
        )

        expect(wrapper.find("#spotify-anchor").at(0).props().href).contains(mockTrack.id)
    })

    it("renders remove button if mobile device", () => {
        const wrapper = mount(
            <Options track={mockTrack} size={"small"} dispatch={jest.fn()} close={jest.fn()} />
        )

        expect(wrapper.find("#remove-btn").at(0)).to.have.length(1)
    })

    it("does not render remove button if large device", () => {
        const wrapper = shallow(
            <Options track={mockTrack} size={"large"} dispatch={jest.fn()} close={jest.fn()} />
        )

        expect(wrapper.find("#remove-btn")).to.have.length(0)
    })
})
