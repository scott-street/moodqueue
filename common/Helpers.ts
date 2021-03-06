import { FormSelection } from "../types/FormSelection"
import { Track } from "../types/Track"
import { TrackSource } from "../types/TrackSource"

export const getTrackIdList = (tracks: Track[]): string => {
    return tracks.map((o) => o.id).join(",")
}

export const combineTwoArraysOnId = (a: any[], b: any[]): any[] => {
    return a.map((oa) => {
        return { ...oa, ...b.find((d) => d.id === oa.id) }
    })
}

export const getSourcesString = (sources: FormSelection): string => {
    let s: string = "your "
    if (!sources.artists && !sources.tracks && !sources.artists && sources.recommended) s = ""
    if (sources.saved) {
        s = s + "liked songs, "
    }
    if (sources.tracks) {
        s = s + "top tracks, "
    }
    if (sources.artists) {
        s = s + "top artists, "
    }
    if (sources.recommended) {
        s = s + `${sources.genres[0].replace("-", " ")}, `
    }

    return s ? s.substring(0, s.length - 2) : s
}

export const getTrackSourceFromFormSelection = (formSelection: FormSelection): TrackSource[] => {
    let result: TrackSource[] = []
    if (formSelection.saved) {
        result.push(TrackSource.SAVED_SONGS)
    }
    if (formSelection.tracks) {
        result.push(TrackSource.TOP_SONGS)
    }
    if (formSelection.artists) {
        result.push(TrackSource.TOP_ARTISTS_SONGS)
    }
    if (formSelection.recommended) {
        result.push(TrackSource.RECOMMENDED_SONGS)
    }
    return result
}
