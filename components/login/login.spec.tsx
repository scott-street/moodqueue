import React from "react"
import { expect } from "chai"
import { mount, render, shallow } from "enzyme"
import { Login } from "./"

describe("<Login />", () => {
    it("renders without crashing", () => {
        shallow(<Login size={"large"} />)
    })

    it("renders the name of the app", () => {
        const wrapper = mount(<Login size={"large"} />)

        expect(wrapper.find("#login-title-txt").at(0).text()).to.be.equal("mdqueue")
    })

    it("renders the box containing the login button", () => {
        const wrapper = shallow(<Login size={"large"} />)

        expect(wrapper.find("#spotify-login-box").length).to.be.eql(1)
    })

    it("renders login button", () => {
        const wrapper = render(<Login size={"large"} />)

        expect(wrapper.find("#login-btn").length).to.be.eql(1)
    })
})
