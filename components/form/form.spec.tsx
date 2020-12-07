import React from "react"
import { shallow } from "enzyme"
import { Form } from "./"

describe("<Form/>", () => {
    it("renders without crashing", () => {
        shallow(<Form size={"large"} handleSubmit={jest.fn} />)
    })
})
