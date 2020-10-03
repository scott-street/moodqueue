import { Grommet, grommet } from "grommet"
import { render } from "enzyme"
import { Description } from "./Description"

describe("<Description />", () => {
    let testComponent
    beforeEach(() => {
        testComponent = (props) => (
            <Grommet theme={grommet}>
                <Description {...props} />
            </Grommet>
        )
    })
    it("renders description", () => {
        render(testComponent({ text: "update your queue" }))
    })

    // it("renders small button", () => {
    //     render(testComponent({ text: "hi", small: true }))
    // })
})
