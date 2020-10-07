import styled from "styled-components"
import { Box as GrommetBox } from "grommet"

export const OuterBox = styled(GrommetBox)`
    display: flex;
    flex: 1;
    align-items: center;
    overflow-y: auto;
    justify-content: center;
    background-color: #34495e;
`

export const InnerBox = styled(GrommetBox)`
    display: flex;
    flex: 1;
    align-items: center;
    justify-content: center;
    background-color: #34495e;
`
