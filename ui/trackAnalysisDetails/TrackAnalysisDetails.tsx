import React from "react"
import { Chart, Box, Text } from "grommet"

interface TrackAnalysisDetailsProps {
    popularity: number // X/100,
    acousticness: number // X/1,
    danceability: number // X/1,
    energy: number // X/ 1
    valence: number // X/ 1
}

//https://storybook.grommet.io/?path=/story/chart--labelled
const LabelledChart = ({ color, label, value }) => (
    <Box flex={false} basis="xsmall" align="center" gap="small">
        <Chart
            bounds={[
                [0, 2],
                [0, 100],
            ]}
            type="bar"
            values={[{ value: [1, value] }]}
            color={color}
            round
            size={{ height: "medium", width: "xsmall" }}
        />
        <Box align="center">
            <Text>{label}</Text>
            <Text weight="bold">{value}%</Text>
        </Box>
    </Box>
)

export const TrackAnalysisDetails: React.FunctionComponent<TrackAnalysisDetailsProps> = (props) => {
    const { popularity, acousticness, danceability, energy, valence } = props

    return (
        <Box pad="small" direction="row" gap="medium">
            <LabelledChart label="Popularity" value={popularity} color="accent-1" />
            <LabelledChart label="Acousticness" value={acousticness * 100} color="accent-1" />
            <LabelledChart label="Danceability" value={danceability * 100} color="accent-1" />
            <LabelledChart label="Energy" value={energy * 100} color="accent-1" />
            <LabelledChart label="Valence" value={valence * 100} color="accent-1" />
        </Box>
    )
}
