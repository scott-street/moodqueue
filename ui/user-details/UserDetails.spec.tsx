import { render } from "enzyme"
import { expect } from "chai"
import {
    withProfilePicture,
    withoutProfilePicture,
    smallWithProfilePicture,
    smallWithoutProfilePicture,
} from "./UserDetails.stories"

describe("<UserDetails />", () => {
    describe("withProfilePicture", () => {
        it("renders username & user picture", () => {
            const container = render(withProfilePicture())

            expect(container.find("#username-txt").text()).to.contain("Phoebe Bridgers")
            expect(container.find("#avatar-profile-image").length).to.eq(1)
        })
    })
    describe("withoutProfilePicture", () => {
        it("renders username & default avatar", () => {
            const container = render(withoutProfilePicture())

            expect(container.find("#username-txt").text()).to.contain("John Doe")
            expect(container.find("#avatar-default").length).to.eq(1)
        })
    })
    describe("smallWithProfilePicture", () => {
        it("renders small user picture with no username", () => {
            const container = render(smallWithProfilePicture())

            expect(container.find("#username-txt").length).to.eql(0)
        })
    })
    describe("smallWithoutProfilePicture", () => {
        it("renders small default avatar with no username", () => {
            const container = render(smallWithoutProfilePicture())

            expect(container.find("#username-txt").length).to.eql(0)
        })
    })
})
