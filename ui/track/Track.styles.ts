import styled from "styled-components"
import { Box as GrommetBox } from "grommet"

export const OuterBox = styled(GrommetBox)`
    overflow-y: hidden;
    flex-direction: row;
    justify-content: space-between;
    display: flex;
    flex: 1;
    align-items: center;
    border-radius: 30px 30px 0px 30px;
`

export const InnerBoxStart = styled(GrommetBox)`
    display: flex;
    flex: 1;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    height: 100%;
    flex-direction: row;
`
