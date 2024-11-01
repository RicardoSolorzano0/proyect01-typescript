export type OptionInGetQuerys =  "all"| "active" | "inactive"

export type Paginated<Entity> = {
    data: Entity[],
    page: number,
    perPage: number,
    total: number
}

export type SelectPaginatePayload ={
    option:OptionInGetQuerys,
    limit:number,
    page:number
}