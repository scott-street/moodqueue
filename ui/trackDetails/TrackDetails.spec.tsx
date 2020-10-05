import { Grommet, grommet } from "grommet"
import { render } from "enzyme"
import { TrackDetails } from "./TrackDetails"
import { Track } from "../../types/Track"

const mockTrack: Track = {
    previewUrl:
        "https://p.scdn.co/mp3-preview/97534965187cf94ea45ac30f046627c1e5f123eb?cid=cdb58c25fa4c42f4bd84049394c75c4c",
    name: "Without You",
    artist: "Perfume Genius",
    imageLink: "https://i.scdn.co/image/ab67616d0000b273e9a375a80097985178b73c4d",
    id: "2SPxgEush9C8GS5RqgXdqi",
    uri: "spotify:track:2SPxgEush9C8GS5RqgXdqi",
}

describe("<TracDetails />", () => {
    let testComponent
    beforeEach(() => {
        testComponent = (props) => (
            <Grommet theme={grommet}>
                <TrackDetails {...props} />
            </Grommet>
        )
    })
    it("renders track details", () => {
        render(testComponent({ size: "large", track: mockTrack }))
    })

    it("renders small track details", () => {
        render(testComponent({ size: "large", track: mockTrack }))
    })
})
