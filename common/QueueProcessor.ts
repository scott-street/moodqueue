import { PropertyTrack } from "../types/Track"

interface ProcessQueueProps {
    entities: PropertyTrack[]
    comparator: any
    count: number
}
export const processQueue = (props: ProcessQueueProps) => {
    const { entities, comparator, count } = props
    return entities.sort(comparator).slice(0, count)
}
