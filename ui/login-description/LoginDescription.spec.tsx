import { Grommet, grommet } from "grommet"
import { render } from "enzyme"
import { expect } from "chai"
import { LoginDescription } from "./LoginDescription"

describe("<LoginDescription />", () => {
    let testComponent
    beforeEach(() => {
        testComponent = (props) => (
            <Grommet theme={grommet}>
                <LoginDescription {...props} />
            </Grommet>
        )
    })

    it("renders top frame", () => {
        expect(render(testComponent()).find("#top-frame").length).to.be.eql(1)
    })

    it("renders bottom frame", () => {
        expect(render(testComponent()).find("#bottom-frame").length).to.be.eql(1)
    })
})
