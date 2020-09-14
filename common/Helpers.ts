import { Track } from "../types/Track"

export const getTrackIdList = (tracks: Track[]): string => {
    return tracks.map((o) => o.id).join(",")
}

export const combineTwoArraysOnId = (a: any[], b: any[]): any[] => {
    return a.map((oa) => {
        return { ...oa, ...b.find((d) => d.id === oa.id) }
    })
}
