import React from "react"
import { shallow } from "enzyme"
import Form from "../components/form/form"
import { UserInfo } from "../types/UserInfo"

const testUser: UserInfo = {
    name: "test",
    id: "test123",
    email: "test123@gmail.com",
    profileUrl: "spotify.com",
    profileImages: [{ url: "some-image.png" }],
}

describe("Form", () => {
    it("renders without crashing", () => {
        shallow(<Form user={testUser} />)
    })
})
