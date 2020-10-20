import { Track } from "../../types/Track"

export interface ResultState {
    tracks: Track[]
    trackToShow: Track
    showAfterParty: boolean
}

export const initialResultState: ResultState = {
    tracks: undefined,
    trackToShow: undefined,
    showAfterParty: false,
}

export const resultReducer = (state: ResultState, action: ResultAction) => {
    switch (action.type) {
        case Action.UPDATE:
            return {
                ...state,
                [action.field]: action.value,
            }
        case Action.UPDATE_TRACK:
            return {
                ...state,
                [action.field]: action.value,
            }
        case Action.REMOVE:
            const trackID: string = action.value as string
            let newTracks: Track[] = []
            state.tracks.map((track) => {
                if (track.id !== trackID) newTracks.push(track)
            })
            return {
                ...state,
                [action.field]: newTracks,
            }
        default:
            return state
    }
}

export enum Action {
    UPDATE,
    UPDATE_TRACK,
    REMOVE,
}

interface UpdateAction {
    type: Action.UPDATE
    field: string
    value: any
}

export const update = (field: string, value: any): UpdateAction => ({
    type: Action.UPDATE,
    field: field,
    value: value,
})

interface UpdateTrackAction {
    type: Action.UPDATE_TRACK
    field: string
    value: any
}

export const updateTrackToShow = (field: string, value: any): UpdateTrackAction => ({
    type: Action.UPDATE_TRACK,
    field: field,
    value: value,
})

interface RemoveAction {
    type: Action.REMOVE
    field: string
    value: any
}

export const remove = (field: string, value: any): RemoveAction => ({
    type: Action.REMOVE,
    field: field,
    value: value,
})

export type ResultAction = RemoveAction | UpdateAction | UpdateTrackAction
