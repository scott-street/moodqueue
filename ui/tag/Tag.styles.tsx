import styled from "styled-components"

export const DefaultTag = styled.button`
    font-zie: 1em;
    margin: 5px;
    padding-right: 1em;
    padding-left: 1em;
    padding-top: 0.5em;
    padding-bottom: 0.5em;
    border-radius: 30px;
    border-color: #e8e8e8;
    color: #909090;
    background-color: #e8e8e8;
    outline: none;
    opactity: 1;
    flex: 1;
`

export const SelectedTag = styled(DefaultTag)`
    background-color: #61ec9f;
`
