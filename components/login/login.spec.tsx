import React from "react"
import { expect } from "chai"
import { render, shallow } from "enzyme"
import { Login } from "./"

describe("<Login />", () => {
    it("renders without crashing", () => {
        shallow(<Login size={"large"} />)
    })

    it("renders the name of the app", () => {
        const wrapper = render(<Login size={"large"} />)

        expect(wrapper.find("#login-title-txt").text()).to.be.equal("moodqueue")
    })

    it("renders a desc of the app", () => {
        const wrapper = render(<Login size={"large"} />)

        expect(wrapper.find("#login-desc-txt").text().length).to.be.eql(49)
    })

    it("renders login button", () => {
        const wrapper = render(<Login size={"large"} />)

        expect(wrapper.find("#login-btn").length).to.be.eql(1)
    })
})
