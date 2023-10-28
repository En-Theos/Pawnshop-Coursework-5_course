export default interface IEvaluationProps {
    initialValues: {}, 
    type: "gold" | "silver"
}

export interface InitialValuesMetal {
    sample: string,
    category: string,
    condition: string,
    weight: number
}