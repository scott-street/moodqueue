import React from "react"
import { expect } from "chai"
import { render, mount } from "enzyme"
import { ResultListItem } from "./result-list-item"
import { Track } from "../../../types/Track"

const mockTrack: Track = {
    previewUrl: "",
    name: "myMockTrack",
    artist: "myMockArtist",
    imageLink: "",
    id: "1",
    uri: "",
}
describe("<ResultListItem />", () => {
    it("renders without crashing", () => {
        render(<ResultListItem size={"small"} dispatch={jest.fn()} track={mockTrack} />)
    })

    it("renders the track name", () => {
        const wrapper = render(
            <ResultListItem size={"small"} dispatch={jest.fn()} track={mockTrack} />
        )

        expect(wrapper.text()).to.contain(mockTrack.name)
    })

    it("renders the track artist", () => {
        const wrapper = render(
            <ResultListItem size={"small"} dispatch={jest.fn()} track={mockTrack} />
        )

        expect(wrapper.text()).to.contain(mockTrack.artist)
    })

    it("renders more details button", () => {
        const wrapper = render(
            <ResultListItem size={"large"} dispatch={jest.fn()} track={mockTrack} />
        )

        expect(wrapper.find("#more-details-btn")).to.have.length(1)
    })

    it("renders remove track button for large screens", () => {
        const wrapper = render(
            <ResultListItem size={"large"} dispatch={jest.fn()} track={mockTrack} />
        )

        expect(wrapper.find("#remove-track-btn")).to.have.length(1)
    })

    it("doesn't render remove track button for small screens", () => {
        const wrapper = render(
            <ResultListItem size={"small"} dispatch={jest.fn()} track={mockTrack} />
        )

        expect(wrapper.find("#remove-track-btn")).to.have.length(0)
    })

    it("triggers prop 'dispatch' on more details button click", () => {
        const dispatchMock = jest.fn()
        const wrapper = mount(
            <ResultListItem size={"large"} dispatch={dispatchMock} track={mockTrack} />
        )

        const moreBtn = wrapper.find("#more-details-btn").hostNodes()
        moreBtn.simulate("click")
        expect(dispatchMock.mock.calls.length).to.be.eql(1)
    })
})
