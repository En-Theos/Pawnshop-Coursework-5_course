export interface IDataMetal {
    id: number,
    type: string,
    rating: number,
    sample: number
}

export interface IDataLaptop {
    id: number,
    type: string,
    price: number,
    component_or_parameter: string
}

export interface IDataMonitop {
    id: number,
    type: string,
    price: number,
    name_model: string
}

export interface IDataPhone {
    id: number,
    type: string,
    price: number,
    name_model: string
}

export interface IDataPhotoCamera {
    id: number,
    type: string,
    price: number,
    name_model: string
}

export interface IDataTablet {
    id: number,
    type: string,
    price: number,
    name_model: string
}

export interface IDataTv {
    id: number,
    type: string,
    price: number,
    name_model: string
}

export interface IDataVideoCamera {
    id: number,
    type: string,
    price: number,
    name_model: string
}

export interface ICondition{
    id: number,
    state: string,
    coefficient: number,
    description: string
}