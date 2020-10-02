import React from "react"
import { render, shallow } from "enzyme"
import { Settings } from "./"
import { expect } from "chai"

describe("<Settings/>", () => {
    it("renders without crashing", () => {
        shallow(
            <Settings
                size={"large"}
                profileUrl={""}
                resultsLayout={"fun"}
                handleResultsLayoutChange={jest.fn}
                close={jest.fn}
            />
        )
    })

    it("renders title", () => {
        const wrapper = shallow(
            <Settings
                size={"large"}
                profileUrl={""}
                resultsLayout={"fun"}
                handleResultsLayoutChange={jest.fn}
                close={jest.fn}
            />
        )

        expect(wrapper.find("#header-txt").text()).to.contain("settings")
    })

    it("renders an anchor for user to open up profile in spotify", () => {
        const wrapper = shallow(
            <Settings
                size={"large"}
                profileUrl={"https://open.spotify.com/user/meuqrc1yavi4xl1v5ppz4rjs7"}
                resultsLayout={"fun"}
                handleResultsLayoutChange={jest.fn}
                close={jest.fn}
            />
        )

        expect(wrapper.find("#spotify-profile-anchor").props().href).contains(
            "https://open.spotify.com/user/"
        )
    })

    it("renders theme selector", () => {
        const wrapper = shallow(
            <Settings
                size={"large"}
                profileUrl={""}
                resultsLayout={"fun"}
                handleResultsLayoutChange={jest.fn}
                close={jest.fn}
            />
        )

        expect(wrapper.find("#theme-picker")).to.be.length(1)
    })

    it("renders results layout toggle switch", () => {
        const wrapper = shallow(
            <Settings
                size={"large"}
                profileUrl={""}
                resultsLayout={"fun"}
                handleResultsLayoutChange={jest.fn}
                close={jest.fn}
            />
        )

        expect(wrapper.find("#results-layout")).to.be.length(1)
    })

    it("renders a checked toggle when results layout is equal to fun", () => {
        const wrapper = shallow(
            <Settings
                size={"large"}
                profileUrl={""}
                resultsLayout={"fun"}
                handleResultsLayoutChange={jest.fn}
                close={jest.fn}
            />
        )

        expect(wrapper.find("#results-layout").prop("checked")).to.equal(true)
    })

    it("does not render a checked toggle when results layout is not equal to fun", () => {
        const wrapper = shallow(
            <Settings
                size={"large"}
                profileUrl={""}
                resultsLayout={"normal"}
                handleResultsLayoutChange={jest.fn}
                close={jest.fn}
            />
        )

        expect(wrapper.find("#results-layout").prop("checked")).to.equal(false)
    })
})
