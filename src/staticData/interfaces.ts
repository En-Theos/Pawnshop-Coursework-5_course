export interface IDataMetal {
    id: number,
    type: string,
    rating: number,
    sample: number
}

export interface IDataTechnique {
    id: number,
    type: string,
    price: number,
    name: string
}

export interface ICondition{
    id: number,
    state: string,
    coefficient: number,
    description: string
}