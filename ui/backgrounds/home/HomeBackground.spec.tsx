import { Grommet, grommet } from "grommet"
import { render } from "enzyme"
import { HomeBackground } from "./HomeBackground"

describe("<HomeBackground />", () => {
    let testComponent
    beforeEach(() => {
        testComponent = (props) => (
            <Grommet theme={grommet}>
                <HomeBackground {...props} />
            </Grommet>
        )
    })
    it("renders background", () => {
        render(testComponent)
    })
})
