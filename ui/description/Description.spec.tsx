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

    it("renders text description", () => {
        render(
            testComponent({
                text: "update your queue",
                header: false,
                textAlign: "center",
                size: "medium",
            })
        )
    })

    it("renders header description", () => {
        render(
            testComponent({
                text: "new queue",
                header: true,
                textAlign: "center",
                size: "medium",
            })
        )
    })
})
