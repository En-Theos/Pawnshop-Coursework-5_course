export default interface IForm {
    nameProduct: string,
    fullName: string,
    email: string,
    front: File | null,
    back: File | null,
    condition: string,
}