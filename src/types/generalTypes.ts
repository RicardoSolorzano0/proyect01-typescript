export type OptionInGetQuerys =  "all"| "active" | "inactive"

export type Paginated<Entity> = {
    data: Entity[],
    page: number,
    perPage: number,
    total: number
}