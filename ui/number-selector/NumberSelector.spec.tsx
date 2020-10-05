import { Grommet, grommet } from "grommet"
import { render } from "enzyme"
import { NumberSelector } from "./NumberSelector"

describe("<NumberSelector />", () => {
    let testComponent
    beforeEach(() => {
        testComponent = (props) => (
            <Grommet theme={grommet}>
                <NumberSelector {...props} />
            </Grommet>
        )
    })
    it("renders number selector", () => {
        render(testComponent({ size: "large", numSongs: 10 }))
    })

    it("renders no buttons with small number selector", () => {
        render(testComponent({ size: "small", numSongs: 10 }))
    })
})
