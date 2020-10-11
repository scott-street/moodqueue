import React from "react"
import { render, mount, shallow } from "enzyme"
import { expect } from "chai"
import { SpotifyContext, SpotifyContextValue } from "../../common/hooks/useSpotify"
import { Form } from "./"

describe("<Form/>", () => {
    it("renders without crashing", () => {
        shallow(<Form size={"large"} handleSubmit={jest.fn} />)
    })
})
