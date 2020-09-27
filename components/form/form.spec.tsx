import React from "react"
import { render, shallow } from "enzyme"
import { Form } from "./"
import { expect } from "chai"

describe("<Form/>", () => {
    it("renders without crashing", () => {
        shallow(<Form size={"large"} handleSubmit={jest.fn} />)
    })

    it("renders new queue in title", () => {
        const wrapper = render(<Form size={"large"} handleSubmit={jest.fn} />)

        expect(wrapper.find("#queue-title").text()).to.contain("new queue")
    })

    it("renders continue button", () => {
        const wrapper = render(<Form size={"large"} handleSubmit={jest.fn} />)
        expect(wrapper.find("#submit-form-btn").length).to.be.eql(1)
    })
})
