import * as React from "react"
import { withGrommet } from "../wrapper"
import { UserDetails } from "./UserDetails"
import { UserInfo } from "../../types/UserInfo"

export default { title: "UserInfo" }

const user: UserInfo = {
    name: "Phoebe Bridgers",
    id: "69",
    email: "thepunisher@hotmail.com",
    profileUrl: "www.google.com",
    profileImages: [
        {
            url:
                "https://media.gq.com/photos/5d780edac517ca00085fee8a/16:9/w_2560%2Cc_limit/phoebe-bridgers-gq-october-2019-01-lede.jpg",
        },
    ],
}

const user2: UserInfo = {
    name: "John Doe",
    id: "0",
    email: "johndoe@aim.com",
    profileUrl: "yahoo.com",
    profileImages: [],
}

export const withProfilePicture = () => withGrommet(<UserDetails user={user} />)

export const withoutProfilePicture = () => withGrommet(<UserDetails user={user2} />)

export const smallWithProfilePicture = () => withGrommet(<UserDetails user={user} small />)

export const smallWithoutProfilePicture = () => withGrommet(<UserDetails user={user2} small />)
