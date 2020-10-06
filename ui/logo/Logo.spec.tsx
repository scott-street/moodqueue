import { Grommet, grommet } from "grommet"
import { render } from "enzyme"
import { Logo } from "./Logo"

describe("<Logo />", () => {
    let testComponent
    beforeEach(() => {
        testComponent = (props) => (
            <Grommet theme={grommet}>
                <Logo {...props} />
            </Grommet>
        )
    })

    it("renders large logo", () => {
        render(
            testComponent({
                size: "large",
            })
        )
    })

    it("renders small logo", () => {
        render(
            testComponent({
                size: "small",
            })
        )
    })
})
