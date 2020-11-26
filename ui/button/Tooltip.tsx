import { Box } from "grommet"
import React from "react"
import ReactTooltip from "react-tooltip"
import { Description } from "../description/Description"

interface TooltipProps {
    tooltip: any
    children: any
}

export const Tooltip: React.FunctionComponent<TooltipProps> = (props) => {
    const { tooltip, children } = props
    return (
        <Box align="center" id="tooltip-btn">
            <a data-for={tooltip.id} data-tip>
                {children}
            </a>
            <ReactTooltip id={tooltip.id}>
                <Box width="small" align="center">
                    <Description text={tooltip.text} textAlign="center" />
                </Box>
            </ReactTooltip>
        </Box>
    )
}
