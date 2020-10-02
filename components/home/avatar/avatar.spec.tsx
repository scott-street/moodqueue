import React from "react"
import { expect } from "chai"
import { render, shallow } from "enzyme"
import { UserAvatar } from "./"
import { UserInfo } from "../../../types/UserInfo"

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

describe("<UserAvatar />", () => {
    it("renders without crashing", () => {
        shallow(<UserAvatar size={"large"} user={testUser} handleAvatarClick={jest.fn} />)
    })

    it("renders avatar with profile image", () => {
        const wrapper = render(
            <UserAvatar size={"large"} user={testUser} handleAvatarClick={jest.fn} />
        )
        expect(wrapper.find("#avatar-profile-image").length).to.be.eql(1)
    })

    it("renders default avatar if no profile image is present", () => {
        const testUserNoProfileUrl: UserInfo = {
            name: "test",
            id: "test123",
            email: "test123@gmail.com",
            profileUrl: "spotify.com",
            profileImages: [],
        }
        const wrapper = render(
            <UserAvatar size={"large"} user={testUserNoProfileUrl} handleAvatarClick={jest.fn} />
        )
        expect(wrapper.find("#avatar-default").length).to.be.eql(1)
    })
})
