import React from "react"
import { expect } from "chai"
import { render, mount } from "enzyme"
import { SourceSelection } from "./"
import { FormSelection } from "../../../types/FormSelection"

const exampleFormSelection: FormSelection = {
    saved: true,
    artists: false,
    tracks: false,
    recommended: true,
}

describe("<SourceSelection />", () => {
    it("renders without crashing", () => {
        render(
            <SourceSelection
                size={"large"}
                source={exampleFormSelection}
                progress={0}
                dispatch={jest.fn()}
                getSelectedGenres={jest.fn()}
                topGenres={[]}
            />
        )
    })

    it("renders saved checkbox and it is checked", () => {
        const wrapper = render(
            <SourceSelection
                size={"large"}
                source={exampleFormSelection}
                progress={0}
                dispatch={jest.fn()}
                getSelectedGenres={jest.fn()}
                topGenres={[]}
            />
        )

        expect(wrapper.find("#saved-checkbox")).to.have.length(1)
        expect(wrapper.find("#saved-checkbox").prop("checked")).to.equal(true)
    })

    it("renders artists checkbox", () => {
        const wrapper = render(
            <SourceSelection
                size={"large"}
                source={exampleFormSelection}
                progress={0}
                dispatch={jest.fn()}
                getSelectedGenres={jest.fn()}
                topGenres={[]}
            />
        )

        expect(wrapper.find("#artists-checkbox")).to.have.length(1)
    })

    it("renders tracks checkbox", () => {
        const wrapper = render(
            <SourceSelection
                size={"large"}
                source={exampleFormSelection}
                progress={0}
                dispatch={jest.fn()}
                getSelectedGenres={jest.fn()}
                topGenres={[]}
            />
        )

        expect(wrapper.find("#tracks-checkbox")).to.have.length(1)
    })

    it("renders recommended checkbox", () => {
        const wrapper = render(
            <SourceSelection
                size={"large"}
                source={exampleFormSelection}
                progress={0}
                dispatch={jest.fn()}
                getSelectedGenres={jest.fn()}
                topGenres={[]}
            />
        )

        expect(wrapper.find("#recommended-checkbox")).to.have.length(1)
    })

    it("triggers prop two 'dispatch' calls on check box click", () => {
        const dispatchMock = jest.fn()
        const wrapper = mount(
            <SourceSelection
                size={"large"}
                source={exampleFormSelection}
                progress={0}
                dispatch={dispatchMock}
                getSelectedGenres={jest.fn()}
                topGenres={[]}
            />
        )

        const checkbox = wrapper.find("#saved-checkbox").hostNodes()
        const event = { target: { value: true } }
        checkbox.simulate("change", event)
        expect(dispatchMock.mock.calls.length).to.be.eql(2)
    })
})
