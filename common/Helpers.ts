import { FormSelection } from "../types/FormSelection"
import { Track } from "../types/Track"
import { TrackSource } from "../types/TrackSource"

export const getTrackIdList = (tracks: Track[]): string => {
    return tracks.map((o) => o.id).join(",")
}

export const combineTwoArraysOnId = (a: any[], b: any[]): any[] => {
    return a.map((oa) => {
        return { ...oa, ...b.find((d) => d.id === oa.id) }
    })
}

export const getSourcesString = (sources: FormSelection): string => {
    let s: string = ""
    if (sources.saved) {
        s = s + "saved, "
    }
    if (sources.tracks) {
        s = s + "top tracks, "
    }
    if (sources.artists) {
        s = s + "top artists, "
    }
    if (sources.recommended) {
        s = s + "recommended, "
    }

    return s.substring(0, s.length - 2)
}

export const getTrackSourceFromFormSelection = (formSelection: FormSelection): TrackSource[] => {
    let result: TrackSource[] = []
    if (formSelection.saved) {
        result.push(TrackSource.SAVED_SONGS)
    }
    if (formSelection.tracks) {
        result.push(TrackSource.TOP_SONGS)
    }
    if (formSelection.artists) {
        result.push(TrackSource.TOP_ARTISTS_SONGS)
    }
    if (formSelection.recommended) {
        result.push(TrackSource.RECOMMENDED_SONGS)
    }
    return result
}

export const getShortenedName = (name: string, track: boolean) => {
    if (name.length <= (track ? 10 : 15)) {
        return name
    } else {
        let temp: string = ""
        temp = name.substring(0, track ? 9 : 14)
        temp += "..."
        return temp
    }
}

const availableSeedGenres = [
    "acoustic",
    "afrobeat",
    "alt-rock",
    "alternative",
    "ambient",
    "anime",
    "black-metal",
    "bluegrass",
    "blues",
    "bossanova",
    "brazil",
    "breakbeat",
    "british",
    "cantopop",
    "chicago-house",
    "children",
    "chill",
    "classical",
    "club",
    "comedy",
    "country",
    "dance",
    "dancehall",
    "death-metal",
    "deep-house",
    "detroit-techno",
    "disco",
    "disney",
    "drum-and-bass",
    "dub",
    "dubstep",
    "edm",
    "electro",
    "electronic",
    "emo",
    "folk",
    "forro",
    "french",
    "funk",
    "garage",
    "german",
    "gospel",
    "goth",
    "grindcore",
    "groove",
    "grunge",
    "guitar",
    "happy",
    "hard-rock",
    "hardcore",
    "hardstyle",
    "heavy-metal",
    "hip-hop",
    "holidays",
    "honky-tonk",
    "house",
    "idm",
    "indian",
    "indie",
    "indie-pop",
    "industrial",
    "iranian",
    "j-dance",
    "j-idol",
    "j-pop",
    "j-rock",
    "jazz",
    "k-pop",
    "kids",
    "latin",
    "latino",
    "malay",
    "mandopop",
    "metal",
    "metal-misc",
    "metalcore",
    "minimal-techno",
    "movies",
    "mpb",
    "new-age",
    "new-release",
    "opera",
    "pagode",
    "party",
    "philippines-opm",
    "piano",
    "pop",
    "pop-film",
    "post-dubstep",
    "power-pop",
    "progressive-house",
    "psych-rock",
    "punk",
    "punk-rock",
    "r-n-b",
    "rainy-day",
    "reggae",
    "reggaeton",
    "road-trip",
    "rock",
    "rock-n-roll",
    "rockabilly",
    "romance",
    "sad",
    "salsa",
    "samba",
    "sertanejo",
    "show-tunes",
    "singer-songwriter",
    "ska",
    "sleep",
    "songwriter",
    "soul",
    "soundtracks",
    "spanish",
    "study",
    "summer",
    "swedish",
    "synth-pop",
    "tango",
    "techno",
    "trance",
    "trip-hop",
    "turkish",
    "work-out",
    "world-music",
]

export const filterByAvailableSeedGenres = (genres: string[]) => {
    console.log(genres)
    const result = genres.filter((genre) => availableSeedGenres.includes(genre))
    const results = result.splice(0, 2)
    results.push("new-release", "indie", "indie-pop")
    console.log(results)
    return results
}
