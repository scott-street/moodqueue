import * as React from "react"
import { withGrommet } from "../wrapper"
import { TrackAnalysisDetails } from "./TrackAnalysisDetails"

export default { title: "TrackAnalysisDetails" }

const props = {
    popularity: 60,
    acousticness: 0.531,
    danceability: 0.3,
    energy: 0.45,
    valence: 0.2,
}
export const trackAnalysisDetails = () => withGrommet(<TrackAnalysisDetails {...props} />)
