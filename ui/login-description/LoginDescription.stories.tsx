import { LoginDescription } from "./LoginDescription"
import { withGrommet } from "../wrapper"

export default { title: "LoginDescription" }

export const description = () => withGrommet(<LoginDescription />)

export const smallDescriptioin = () => withGrommet(<LoginDescription small />)
