import { Box } from "grommet"
import React from "react"
import { FormSelection } from "../../types/FormSelection"
import { Mood } from "../../types/Mood"
import { Track } from "../../types/Track"
import { Tooltip } from "../button/Tooltip"
import { Description } from "../description/Description"
import { Heart as Liked } from "@styled-icons/remix-fill/Heart"
import { Music as TopTracks } from "@styled-icons/evaicons-solid/Music"
import { MusicArtist as TopArtists } from "@styled-icons/zondicons/MusicArtist"
import { FolderMusic as Genre } from "@styled-icons/entypo/FolderMusic"

interface ResultsOverviewProps {
    size: any
    source: FormSelection
    tracks: Track[]
    mood: Mood
}

export const ResultsOverview: React.FunctionComponent<ResultsOverviewProps> = (props) => {
    const { size, source, tracks, mood } = props

    return (
        <Box align="center" id="overview-bx">
            <Box
                direction="row"
                id="results-header-bx"
                gap="medium"
                align="center"
                pad={{ horizontal: "medium", vertical: "xsmall" }}
                margin={{ horizontal: "small" }}
                background={{ color: "light-2", opacity: 0.1 }}
                round
                focusIndicator={false}
                style={{ outline: "none" }}
                border="between"
            >
                <Description
                    id="results-header-txt"
                    truncate
                    textAlign="center"
                    size={size !== "small" ? "xlarge" : "medium"}
                    weight="bold"
                    text={
                        tracks
                            ? tracks.length +
                              " " +
                              `${mood >= 0 ? Mood[mood].toLowerCase() + " songs" : "songs"}`
                            : "loading..."
                    }
                />
                <Box gap="small" align="center" direction="row" id="tooltip-sources-bx">
                    {source.saved && (
                        <Tooltip
                            tooltip={{
                                active: true,
                                id: "saved-tooltip",
                                text: "your liked songs",
                            }}
                        >
                            <Liked width="24px" height="24px" />
                        </Tooltip>
                    )}
                    {source.tracks && (
                        <Tooltip
                            tooltip={{
                                active: true,
                                id: "tracks-tooltip",
                                text: "your top tracks",
                            }}
                        >
                            <TopTracks width="24px" height="24px" />
                        </Tooltip>
                    )}
                    {source.artists && (
                        <Tooltip
                            tooltip={{
                                active: true,
                                id: "artists-tooltip",
                                text: "your top artists",
                            }}
                        >
                            <TopArtists width="24px" height="24px" />
                        </Tooltip>
                    )}
                    {source.genres.length > 0 && (
                        <Tooltip
                            tooltip={{
                                active: true,
                                id: "genre-tooltip",
                                text: source.genres[0].replace("-", " "),
                            }}
                        >
                            <Genre width="24px" height="24px" />
                        </Tooltip>
                    )}
                </Box>
            </Box>
        </Box>
    )
}
