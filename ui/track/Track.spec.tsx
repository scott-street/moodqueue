import { Grommet, grommet } from "grommet"
import { render } from "enzyme"
import { Track } from "./Track"
import { Track as TrackType } from "../../types/Track"

const mockTrack: TrackType = {
    previewUrl: "",
    name: "Without You",
    artist: "Perfume Genius",
    imageLink: "https://i.scdn.co/image/ab67616d0000b273e9a375a80097985178b73c4d",
    id: "1",
    uri: "",
}

describe("<Track />", () => {
    let testComponent
    beforeEach(() => {
        testComponent = (props) => (
            <Grommet theme={grommet}>
                <Track {...props} />
            </Grommet>
        )
    })
    it("renders track", () => {
        render(testComponent({ size: "large", track: mockTrack }))
    })

    it("renders small track", () => {
        render(testComponent({ size: "small", track: mockTrack }))
    })
})
