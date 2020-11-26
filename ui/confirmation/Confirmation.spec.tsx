import { Grommet, grommet } from "grommet"
import { render } from "enzyme"
import { Confirmation } from "./Confirmation"

describe("<Confirmation />", () => {
    let testComponent
    beforeEach(() => {
        testComponent = (props) => (
            <Grommet theme={grommet}>
                <Confirmation {...props} />
            </Grommet>
        )
    })
    it("renders confirmation for queues", () => {
        render(
            testComponent({
                close: () => jest.fn(),
                handleConfirmation: () => jest.fn(),
                btnText: "btn",
                descText: "queue",
                id: "confirm-id",
                secondary: true,
            })
        )
    })

    it("renders confirmation for playlists", () => {
        render(
            testComponent({
                close: () => jest.fn(),
                handleConfirmation: () => jest.fn(),
                btnText: "btn",
                descText: "playlist",
                id: "confirm-id",
            })
        )
    })
})
