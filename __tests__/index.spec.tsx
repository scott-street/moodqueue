import React from "react"
import { shallow } from "enzyme"
import LoginPage from "../pages/index"

describe("Login", () => {
    it("renders without crashing", () => {
        shallow(<LoginPage />)
    })
})
