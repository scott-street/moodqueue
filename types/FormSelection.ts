export type FormSelection = {
    saved: boolean
    tracks: boolean
    artists: boolean
    recommended: boolean
    genres: string[]
}

export const defaultFormSelection: FormSelection = {
    saved: false,
    tracks: false,
    artists: false,
    recommended: false,
    genres: [],
}
