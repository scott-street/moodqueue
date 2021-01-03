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
    it("renders button", () => {
        render(testComponent({ text: "hi" }))
    })

    it("renders small button", () => {
        render(testComponent({ text: "hi", small: true }))
    })

    it("renders tooltip button", () => {
        render(
            testComponent({
                text: "hi",
                tooltip: { text: "hello", id: "tooltip-id", active: true },
            })
        )
    })

    it("renders small tooltip button", () => {
        render(
            testComponent({
                text: "hi",
                small: true,
                tooltip: { text: "hello", id: "small-tooltip-id", active: true },
            })
        )
    })
})
