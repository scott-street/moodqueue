import { Grommet, grommet } from "grommet"
import { render } from "enzyme"
import { Content } from "./Content"

describe("<Content />", () => {
    let testComponent
    beforeEach(() => {
        testComponent = (props) => (
            <Grommet theme={grommet}>
                <Content {...props} />
            </Grommet>
        )
    })
    it("renders large content", () => {
        render(testComponent({ size: "large" }))
    })

    it("renders small content", () => {
        render(testComponent({ size: "small" }))
    })
})
