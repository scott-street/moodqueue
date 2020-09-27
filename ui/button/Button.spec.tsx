import Button from "./Button"
import { render } from "enzyme"

describe("<Button />", () => {
    it("renders", () => {
        render(<Button text="hi" />)
    })
})
