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

    if (tooltip.active) {
        return (
            <Box align="center" id="tooltip-btn">
                <a data-for={tooltip.id} data-tip>
                    {children}
                </a>
                <ReactTooltip id={tooltip.id} backgroundColor="#D5DBDB" textColor="#2E4053">
                    <Box
                        width={{ max: tooltip.headerText ? "medium" : "small" }}
                        align="center"
                        gap="small"
                    >
                        {tooltip.headerText && (
                            <Description
                                text={tooltip.headerText}
                                textAlign="center"
                                weight="bold"
                            />
                        )}
                        <Description text={tooltip.text} textAlign="center" />
                    </Box>
                </ReactTooltip>
            </Box>
        )
    }
    return children
}
