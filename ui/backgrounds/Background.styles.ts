import styled from "styled-components"
import { Box as GrommetBox } from "grommet"

export const IndexBackgroundOuter = styled(GrommetBox)`
    display: flex;
    flex: 1;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
    background: linear-gradient(215deg, rgba(63, 94, 251, 1) 30%, rgba(252, 70, 107, 1) 100%);
`

export const LoginBackgroundOuter = styled(GrommetBox)`
    display: flex;
    flex: 1;
    justify-content: space-between;
    width: 100%;
    height: 100%;
    overflow: hidden;
`

export const HomeBackground = styled(GrommetBox)`
    justify-content: space-between;
    height: 100%;
    width: 100%;
    overflow: hidden;
`
