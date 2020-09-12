import React from 'react';
import { FormSelection, defaultFormSelection } from '../../types/FormSelection';

export interface FormContextValue {
  setQueueTitle: (param: string) => void;
  setMood: (param: number) => void;
  setNumSongs: (param: number) => void;
  setSourceSelection: (param: FormSelection) => void;
  setProgress: (param: number) => void;
  setShowResults: (param: boolean) => void;
  handleSouceSelectionOnChange: (index: number, checked: boolean) => void;
  resetForm: () => void;
  submitForm: () => void;
  queueTitle: string;
  moodIndex: number;
  numSongs: number;
  sourceSelection: FormSelection;
  progress: number;
  showResults: boolean;
}

export const FormContext = React.createContext<FormContextValue>({
  setQueueTitle: () => undefined,
  setMood: () => undefined,
  setNumSongs: () => undefined,
  setSourceSelection: () => undefined,
  setProgress: () => undefined,
  setShowResults: () => undefined,
  handleSouceSelectionOnChange: () => undefined,
  resetForm: () => undefined,
  submitForm: () => undefined,
  queueTitle: undefined,
  moodIndex: undefined,
  numSongs: undefined,
  sourceSelection: undefined,
  progress: undefined,
  showResults: undefined
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
  const [sourceSelection, setSourceSelection] = React.useState(
    defaultFormSelection
  );
  const [progress, setProgress] = React.useState(0);
  const [showResults, setShowResults] = React.useState(false);

  const resetForm = () => {
    setQueueTitle('');
    setMood(-1);
    setNumSongs(0);
    setSourceSelection(defaultFormSelection);
    setProgress(0);
    setShowResults(false);
  };

  const submitForm = () => {
    setShowResults(true);
  };

  const handleSouceSelectionOnChange = (index: number, checked: boolean) => {
    const current = sourceSelection;
    let prog = progress;
    let selected: FormSelection = {
      saved: index === 0 ? checked : sourceSelection.saved,
      tracks: index === 1 ? checked : sourceSelection.tracks,
      artists: index === 2 ? checked : sourceSelection.artists,
      recommended: index === 3 ? checked : sourceSelection.recommended
    };
    if (
      selected.artists === false &&
      selected.recommended === false &&
      selected.tracks === false &&
      selected.saved === false
    ) {
      prog--;
    } else if (
      current.artists === false &&
      current.recommended === false &&
      current.tracks === false &&
      current.saved === false
    ) {
      prog++;
    }
    setProgress(prog);
    setSourceSelection(selected);
  };

  const FormContextValue = {
    setQueueTitle,
    setMood,
    setNumSongs,
    setSourceSelection,
    setProgress,
    setShowResults,
    handleSouceSelectionOnChange,
    resetForm,
    submitForm,
    queueTitle,
    moodIndex,
    numSongs,
    sourceSelection,
    progress,
    showResults
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
