import { PropertyTrack } from "../types/Track"
export const happyComparator = (x: PropertyTrack, y: PropertyTrack) => {
    return y.valence - x.valence
}

export const sadComparator = (x: PropertyTrack, y: PropertyTrack) => {
    return x.valence - y.valence
}

export const sleepyComparator = (x: PropertyTrack, y: PropertyTrack) => {
    return x.energy - y.energy
}

export const partyComparator = (x: PropertyTrack, y: PropertyTrack) => {
    const xPartyability = computePartyability(x)
    const yPartyabillity = computePartyability(y)
    return xPartyability - yPartyabillity
}

export const drivingComparator = (x: PropertyTrack, y: PropertyTrack) => {
    const xDrivability = computeDrivablility(x)
    const yDrivability = computeDrivablility(y)
    return xDrivability - yDrivability
}

function computeDrivablility(t: PropertyTrack) {
    const DRIVING_TEMPO = 127 //thanks grateful dead
    return Math.abs(DRIVING_TEMPO - t.tempo) / DRIVING_TEMPO + Math.abs(0.6 - t.energy) / 0.6
}

function computePartyability(t: PropertyTrack) {
    const POSSIBLY_RAP = 0.5
    return (
        Math.abs(POSSIBLY_RAP - t.speechiness) / POSSIBLY_RAP +
        (1 - t.energy) +
        (1 - t.danceability)
    )
}
