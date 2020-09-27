import { Grommet, grommet } from "grommet"
import { render } from "enzyme"
import { Button } from "./Button"

describe("<Button />", () => {
    let testComponent
    beforeEach(() => {
        testComponent = (props) => (
            <Grommet theme={grommet}>
                <Button {...props} />
            </Grommet>
        )
    })
    it("renders", () => {
        render(testComponent({ text: "hi" }))
    })
})
