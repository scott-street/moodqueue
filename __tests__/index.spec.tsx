import React from "react"
import { shallow } from "enzyme"
import Index from "../pages/index"

describe("Index", () => {
    it("renders without crashing", () => {
        shallow(<Index />)
    })
})
