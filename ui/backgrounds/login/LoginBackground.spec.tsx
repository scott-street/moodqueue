import { Grommet, grommet } from "grommet"
import { render } from "enzyme"
import { LoginBackground } from "./LoginBackground"

describe("<LoginBackground />", () => {
    let testComponent
    beforeEach(() => {
        testComponent = (props) => (
            <Grommet theme={grommet}>
                <LoginBackground {...props} />
            </Grommet>
        )
    })
    it("renders background", () => {
        render(testComponent)
    })
})
