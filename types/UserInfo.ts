import { Image } from "./Image"

export type UserInfo = {
    id: string
    name: string
    email: string
    profileUrl: string
    profileImages: Image[]
    product: string
}

export const defaultUser: UserInfo = {
    id: "",
    name: "",
    email: "",
    profileUrl: "",
    profileImages: [],
    product: "",
}
