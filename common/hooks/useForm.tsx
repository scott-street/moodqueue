import React from 'react';
import { FormSelection, defaultFormSelection } from '../../types/FormSelection';

export interface FormContextValue {
  setQueueTitle: (param: string) => void;
  setMood: (param: number) => void;
  setNumSongs: (param: number) => void;
  setSelection: (param: FormSelection) => void;
  setProgress: (param: number) => void;
  resetForm: () => void;
  queueTitle: string;
  moodIndex: number;
  numSongs: number;
  selection: FormSelection;
  progress: number;
}

export const FormContext = React.createContext<FormContextValue>({
  setQueueTitle: () => undefined,
  setMood: () => undefined,
  setNumSongs: () => undefined,
  setSelection: () => undefined,
  setProgress: () => undefined,
  resetForm: () => undefined,
  queueTitle: undefined,
  moodIndex: undefined,
  numSongs: undefined,
  selection: undefined,
  progress: undefined
});

interface FormProviderProps {
  value?: FormContextValue;
  children: React.ReactNode;
}

export const FormProvider: React.FunctionComponent<FormProviderProps> = (
  props
) => {
  const [queueTitle, setQueueTitle] = React.useState('');
  const [moodIndex, setMood] = React.useState(-1);
  const [numSongs, setNumSongs] = React.useState(0);
  const [selection, setSelection] = React.useState(defaultFormSelection);
  const [progress, setProgress] = React.useState(0);

  const resetForm = () => {
    setQueueTitle('');
    setMood(-1);
    setNumSongs(0);
    setSelection(defaultFormSelection);
    setProgress(0);
  };

  const FormContextValue = {
    setQueueTitle,
    setMood,
    setNumSongs,
    setSelection,
    setProgress,
    resetForm,
    queueTitle,
    moodIndex,
    numSongs,
    selection,
    progress
  };
  return (
    <FormContext.Provider value={props.value ?? FormContextValue} {...props} />
  );
};

export const useForm = () => {
  const context = React.useContext(FormContext);
  if (!context) throw new Error('useForm must be used within an FormProvider');
  return context;
};
