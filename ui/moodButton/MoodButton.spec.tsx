import { Grommet, grommet } from "grommet"
import { render } from "enzyme"
import { MoodButton } from "./MoodButton"

describe("<Button />", () => {
    let testComponent
    beforeEach(() => {
        testComponent = (props) => (
            <Grommet theme={grommet}>
                <MoodButton {...props} />
            </Grommet>
        )
    })
    it("renders mood button with text", () => {
        render(
            testComponent({
                mood: "Happy",
                key: 0,
                selected: true,
                onClick: jest.fn,
                size: "large",
            })
        )
    })

    it("renders mood button without text", () => {
        render(
            testComponent({
                mood: "Happy",
                key: 0,
                selected: true,
                onClick: jest.fn,
                size: "small",
            })
        )
    })
})
