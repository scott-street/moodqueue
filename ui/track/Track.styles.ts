import styled from "styled-components"
import { Box as GrommetBox } from "grommet"

export const OuterBox = styled(GrommetBox)`
    overflow-y: hidden;
    flex-direction: row;
    justify-content: space-between;
    display: flex;
    align-items: center;
    border-radius: 30px 30px 0px 30px;
    background: linear-gradient(215deg, rgba(63, 94, 251, 1) 30%, rgba(252, 70, 107, 1) 100%);
`

export const InnerBoxStart = styled(GrommetBox)`
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    height: 100%;
    flex-direction: row;
`
