import {
  defaultFormSelection,
  FormSelection
} from '../../../types/FormSelection';
import { Mood } from '../../../types/Mood';

export interface FormState {
  mood: Mood;
  numSongs: number;
  source: FormSelection;
}

export const initialFormState: FormState = {
  mood: -1,
  numSongs: 0,
  source: defaultFormSelection
};

export const formReducer = (state: FormState, action: FormAction) => {
  switch (action.type) {
    case Action.UPDATE:
      return {
        ...state,
        [action.field]: action.value
      };
    case Action.UPDATE_SOURCE_SELECTION:
      const currentSource = state.source;
      return {
        ...state,
        source: {
          ...currentSource,
          [action.field]: action.value
        }
      };
    case Action.RESET_STATE:
      return {
        mood: -1,
        numSongs: 0,
        source: defaultFormSelection
      };
    default:
      return state;
  }
};

export enum Action {
  UPDATE,
  UPDATE_SOURCE_SELECTION,
  RESET_STATE
}

interface UpdateAction {
  type: Action.UPDATE;
  field: string;
  value: any;
}

export const update = (field: string, value: any): UpdateAction => ({
  type: Action.UPDATE,
  field: field,
  value: value
});

interface UpdateSourceSelection {
  type: Action.UPDATE_SOURCE_SELECTION;
  field: string;
  value: any;
}

export const updateSourceSelection = (
  field: string,
  value: any
): UpdateSourceSelection => ({
  type: Action.UPDATE_SOURCE_SELECTION,
  field: field,
  value: value
});

interface ResetStateAction {
  type: Action.RESET_STATE;
}

export const resetFormState = (): ResetStateAction => ({
  type: Action.RESET_STATE
});

export type FormAction =
  | UpdateAction
  | UpdateSourceSelection
  | ResetStateAction;
