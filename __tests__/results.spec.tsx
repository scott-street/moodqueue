import React from "react"
import { shallow } from "enzyme"
import ResultsPage from "../pages/results"

describe("Results", () => {
    it("renders without crashing", () => {
        shallow(<ResultsPage />)
    })
})
