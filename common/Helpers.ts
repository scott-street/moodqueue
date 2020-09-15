import { FormSelection } from '../types/FormSelection';
import { Track } from '../types/Track';

export const getTrackIdList = (tracks: Track[]): string => {
  return tracks.map((o) => o.id).join(',');
};

export const combineTwoArraysOnId = (a: any[], b: any[]): any[] => {
  return a.map((oa) => {
    return { ...oa, ...b.find((d) => d.id === oa.id) };
  });
};

export const getSourcesString = (sources: FormSelection): string => {
  let s: string = '';
  if (sources.saved) {
    s = s + 'saved, ';
  }
  if (sources.tracks) {
    s = s + 'top tracks, ';
  }
  if (sources.artists) {
    s = s + 'top artists, ';
  }
  if (sources.recommended) {
    s = s + 'recommended, ';
  }

  return s.substring(0, s.length - 2);
};
