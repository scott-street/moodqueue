import React from "react"
import { shallow } from "enzyme"
import { AfterParty } from "./"

describe("<AfterParty />", () => {
    it("renders without crashing", () => {
        shallow(<AfterParty resetForm={jest.fn} />)
    })
})
