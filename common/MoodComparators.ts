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
    return y.energy - x.energy
}
