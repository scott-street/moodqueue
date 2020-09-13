import { defaultFormSelection, FormSelection } from "../../types/FormSelection"
import { Mood } from "../../types/Mood"

export interface FormState {
    queueTitle: string
    mood: Mood
    numSongs: number
    source: FormSelection
}

export const initialFormState: FormState = {
    queueTitle: "",
    mood: -1,
    numSongs: 0,
    source: defaultFormSelection,
}
export const formReducer = (state: FormState, action: FormAction) => {
    switch (action.type) {
        case Action.UPDATE:
            return {
                ...state,
                [action.field]: action.value,
            }
        case Action.UPDATE_SOURCE_SELECTION:
            const currentSource = state.source
            return {
                ...state,
                source: {
                    ...currentSource,
                    [action.field]: action.value,
                },
            }
        default:
            return state
    }
}

export enum Action {
    UPDATE,
    UPDATE_SOURCE_SELECTION,
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

interface UpdateSourceSelection {
    type: Action.UPDATE_SOURCE_SELECTION
    field: string
    value: any
}

export const updateSourceSelection = (field: string, value: any): UpdateSourceSelection => ({
    type: Action.UPDATE_SOURCE_SELECTION,
    field: field,
    value: value,
})

export type FormAction = UpdateAction | UpdateSourceSelection
