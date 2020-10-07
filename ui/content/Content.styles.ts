import styled from "styled-components"
import { Box as GrommetBox } from "grommet"

export const ContentOuter = styled(GrommetBox)`
    display: flex;
    align-items: center;
    height: 100%;
    justify-content: center;
    overflow: auto;
    flex: 1;
`

export const ContentInner = styled(GrommetBox)`
    display: flex;
    align-items: center;
    flex: 1;
    height: 100%;
    width: 100%;
`
