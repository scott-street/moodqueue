import React from "react"
import { shallow } from "enzyme"
import FormPage from "../pages/form"

describe("Form", () => {
    it("renders without crashing", () => {
        shallow(<FormPage />)
    })
})
