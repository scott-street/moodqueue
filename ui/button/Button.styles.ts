import styled from "styled-components"
import { Button as GrommetButton } from "grommet"

export const PrimaryButton = styled(GrommetButton)`
    border-radius: 30px;
    border: none;
    align-self: center;
    padding-left: 32px;
    padding-right: 32px;
    padding-top: 10px;
    padding-bottom: 10px;
    font-weight: bold;
    font-size: 22px;
`

export const SecondaryButton = styled(GrommetButton)`
    border-radius: 30px;
    border: none;
    align-self: center;
    padding-left: 32px;
    padding-right: 32px;
    padding-top: 10px;
    padding-bottom: 10px;
    font-weight: bold;
    font-size: 22px;
`

export const PrimaryButtonSmall = styled(PrimaryButton)`
    padding-left: 20px;
    padding-right: 20px;
    padding-top: 6px;
    padding-bottom: 6px;
    font-size: 15px;
`

export const SecondaryButtonSmall = styled(SecondaryButton)`
    padding-left: 20px;
    padding-right: 20px;
    padding-top: 6px;
    padding-bottom: 6px;
    font-size: 15px;
`
