import React from "react"
import { expect } from "chai"
import { mount, render, shallow } from "enzyme"
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

    it("renders null if track is undefined for web", () => {
        const wrapper = shallow(
            <Options track={undefined} size={"large"} dispatch={jest.fn()} close={jest.fn()} />
        )

        expect(wrapper.find("#options-layer-web")).to.have.length(0)
    })

    it("renders null if track is undefined for mobile", () => {
        const wrapper = shallow(
            <Options track={undefined} size={"small"} dispatch={jest.fn()} close={jest.fn()} />
        )

        expect(wrapper.find("#options-layer-mobile")).to.have.length(0)
    })

    it("renders the album artwork that matches the src for web", () => {
        const wrapper = mount(
            <Options track={mockTrack} size={"large"} dispatch={jest.fn()} close={jest.fn()} />
        )

        expect(wrapper.find("#album-artwork-img-web").at(0).props().src).equal(mockTrack.imageLink)
    })

    it("renders the album artwork that matches the src for mobile", () => {
        const wrapper = mount(
            <Options track={mockTrack} size={"small"} dispatch={jest.fn()} close={jest.fn()} />
        )

        expect(wrapper.find("#album-artwork-img-mobile").at(0).props().src).equal(
            mockTrack.imageLink
        )
    })

    it("renders the audio element if track has preview url for web", () => {
        const wrapper = mount(
            <Options track={mockTrack} size={"large"} dispatch={jest.fn()} close={jest.fn()} />
        )

        expect(wrapper.find("#previewPlayer-web").at(0)).to.have.length(1)
    })

    it("renders the audio element if track has preview url for mobile", () => {
        const wrapper = mount(
            <Options track={mockTrack} size={"small"} dispatch={jest.fn()} close={jest.fn()} />
        )

        expect(wrapper.find("#previewPlayer-mobile").at(0)).to.have.length(1)
    })

    it("does not render the audio element if track does not have a url for web", () => {
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

        expect(wrapper.find("#previewPlayer-web")).to.have.length(0)
    })

    it("does not render the audio element if track does not have a url for mobile", () => {
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
                size={"small"}
                dispatch={jest.fn()}
                close={jest.fn()}
            />
        )

        expect(wrapper.find("#previewPlayer-mobile")).to.have.length(0)
    })

    it("renders an anchor for user to open up track in spotify for web", () => {
        const wrapper = mount(
            <Options track={mockTrack} size={"large"} dispatch={jest.fn()} close={jest.fn()} />
        )

        expect(wrapper.find("#spotify-anchor").at(0).props().href).contains(mockTrack.id)
    })

    it("renders a button for user to open up track in spotify in mobile", () => {
        const wrapper = mount(
            <Options track={mockTrack} size={"small"} dispatch={jest.fn()} close={jest.fn()} />
        )

        expect(wrapper.find("#spotify-btn")).to.have.length(0)
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

    it("renders back button if mobile device", () => {
        const wrapper = mount(
            <Options track={mockTrack} size={"small"} dispatch={jest.fn()} close={jest.fn()} />
        )

        expect(wrapper.find("#back-btn").at(0)).to.have.length(1)
    })

    it("does not render back button if on web", () => {
        const wrapper = mount(
            <Options track={mockTrack} size={"large"} dispatch={jest.fn()} close={jest.fn()} />
        )

        expect(wrapper.find("#back-btn").at(0)).to.have.length(0)
    })
})
