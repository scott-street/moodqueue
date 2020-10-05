import { Grommet, grommet } from "grommet"
import { render } from "enzyme"
import { Index } from "./IndexBackground"

describe("<Index />", () => {
    let testComponent
    beforeEach(() => {
        testComponent = (props) => (
            <Grommet theme={grommet}>
                <Index {...props} />
            </Grommet>
        )
    })
    it("renders background", () => {
        render(testComponent)
    })
})
