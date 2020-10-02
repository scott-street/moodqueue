import React from "react"
import { render, shallow } from "enzyme"
import { Home } from "./"
import { UserInfo } from "../../types/UserInfo"
import { expect } from "chai"

const testUser: UserInfo = {
    name: "test",
    id: "test123",
    email: "test123@gmail.com",
    profileUrl: "spotify.com",
    profileImages: [
        {
            url:
                // click the url k8, follow your destiny
                "https://i.pinimg.com/originals/1d/1b/0f/1d1b0f072bb652298e747dd02e8809fc.jpg",
        },
    ],
}

describe("<Home/>", () => {
    it("renders without crashing", () => {
        shallow(<Home user={testUser} size={"large"} />)
    })

    it("renders new queue in title", () => {
        const wrapper = render(<Home user={testUser} size={"large"} />)

        expect(wrapper.find("#queue-title").text()).to.contain("new queue")
    })

    it("renders user name in header", () => {
        const wrapper = render(<Home user={testUser} size={"large"} />)

        expect(wrapper.find("#username-txt").text()).to.contain(testUser.name)
    })

    it("renders app name in header", () => {
        const wrapper = render(<Home user={testUser} size={"large"} />)

        expect(wrapper.find("#app-name-txt").text()).to.contain("mdqueue")
    })

    it("renders icons in header", () => {
        const wrapper = render(<Home user={testUser} size={"large"} />)

        expect(wrapper.find("#happy-emoji-hdr")).to.be.length(1)
        expect(wrapper.find("#sad-emoji-hdr")).to.be.length(1)
    })
})
