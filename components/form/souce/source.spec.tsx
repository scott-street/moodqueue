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
    genres: [""],
}

describe("<SourceSelection />", () => {
    it("renders without crashing", () => {
        render(
            <SourceSelection
                size={"large"}
                source={exampleFormSelection}
                progress={0}
                dispatch={jest.fn()}
                genres={[]}
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
                genres={[]}
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
                genres={[]}
            />
        )

        expect(wrapper.find("#artists-checkbox")).to.have.length(1)
    })

    it("renders emojis for all sources", () => {
        const wrapper = render(
            <SourceSelection
                size={"large"}
                source={exampleFormSelection}
                progress={0}
                dispatch={jest.fn()}
                genres={[]}
            />
        )

        expect(wrapper.find("#saved-checkbox-label")).to.have.length(1)
        expect(wrapper.find("#tracks-checkbox-label")).to.have.length(1)
        expect(wrapper.find("#artists-checkbox-label")).to.have.length(1)
        expect(wrapper.find("#recommended-checkbox-label")).to.have.length(1)
    })

    it("renders tracks checkbox", () => {
        const wrapper = render(
            <SourceSelection
                size={"large"}
                source={exampleFormSelection}
                progress={0}
                dispatch={jest.fn()}
                genres={[]}
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
                genres={[]}
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
                genres={[]}
            />
        )

        const checkbox = wrapper.find("#saved-checkbox").hostNodes()
        const event = { target: { value: true } }
        checkbox.simulate("change", event)
        expect(dispatchMock.mock.calls.length).to.be.eql(2)
    })
})
