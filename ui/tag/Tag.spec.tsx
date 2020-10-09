import { render, mount } from "enzyme"
import { expect } from "chai"
import { genreTag } from "./Tag.stories"

describe("<Tag />", () => {
    describe("genreTag", () => {
        it("renders text", () => {
            const container = render(genreTag())

            expect(container.text()).to.contain("indie folk")
        })
        it("renders default tag", () => {
            const container = render(genreTag())

            expect(container.find("#tag-default").length).to.eq(1)
        })
        it("renders selected tag when selected", () => {
            const container = mount(genreTag())

            container.find("#tag-default").hostNodes().simulate("click")
            expect(container.find("#tag-selected").hostNodes().length).to.eq(1)
        })
    })
})
