import { Grommet, grommet } from "grommet"
import { render } from "enzyme"
import { Sources } from "./Sources"

describe("<Button />", () => {
    let testComponent
    beforeEach(() => {
        testComponent = (props) => (
            <Grommet theme={grommet}>
                <Sources {...props} />
            </Grommet>
        )
    })
    it("renders sources", () => {
        render(
            testComponent({
                size: "large",
                sources: {
                    saved: true,
                    artists: false,
                    tracks: false,
                    recommended: true,
                },
            })
        )
    })
})