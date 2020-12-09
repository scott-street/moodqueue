import { Grommet, grommet } from "grommet"
import { render } from "enzyme"
import { ResultsOverview } from "./ResultsOverview"
import { Mood } from "../../types/Mood"
import { Track } from "../../types/Track"

const mockTracks: Track[] = [
    {
        previewUrl: "",
        name: "myMockTrack1",
        artist: "myMockArtist1",
        imageLink: "",
        id: "1",
        uri: "",
    },
    {
        previewUrl: "",
        name: "myMockTrack2",
        artist: "myMockArtist2",
        imageLink: "",
        id: "2",
        uri: "",
    },
]

describe("<ResultsOverview />", () => {
    let testComponent
    beforeEach(() => {
        testComponent = (props) => (
            <Grommet theme={grommet}>
                <ResultsOverview {...props} />
            </Grommet>
        )
    })
    it("renders overview of results", () => {
        render(
            testComponent({
                size: "large",
                tracks: mockTracks,
                selectedGenreValue: undefined,
                source: {
                    saved: false,
                    artists: false,
                    tracks: false,
                    recommended: false,
                },
                mood: Mood.HAPPY,
            })
        )
    })
})
