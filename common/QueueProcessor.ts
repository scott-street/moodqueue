import { PropertyTrack } from "../types/Track"

interface ProcessQueueProps {
    entities: PropertyTrack[]
    comparator: any
    count: number
    explicit: boolean
}
export const processQueue = (props: ProcessQueueProps) => {
    const { entities, comparator, count, explicit } = props
    if (explicit) return entities.sort(comparator).slice(0, count)
    else {
        const filteredEntities = entities.filter((entity) => !entity.explicit)
        return filteredEntities.sort(comparator).slice(0, count)
    }
}
