import { Box } from "grommet"
import { Alert, FormClose, FormNextLink, FormPreviousLink, Hide } from "grommet-icons"
import React from "react"
import ReactTooltip from "react-tooltip"
import { Description } from "../description/Description"
import { Button } from "./Button"

interface TooltipProps {
    tooltip: any
    children: any
}

export const Tooltip: React.FunctionComponent<TooltipProps> = (props) => {
    const { tooltip, children } = props
    const [showWarning, setShowWarning] = React.useState(false)

    if (tooltip.active) {
        return (
            <Box align="center" id="tooltip-btn">
                <a
                    data-for={tooltip.id}
                    data-tip
                    data-event={tooltip.warning ? "click" : undefined}
                >
                    {children}
                </a>
                <ReactTooltip
                    id={tooltip.id}
                    backgroundColor="#D5DBDB"
                    textColor="#2E4053"
                    clickable={tooltip.warning ? true : false}
                    effect="solid"
                    globalEventOff={tooltip.warning ? "click" : undefined}
                >
                    <Box
                        width={{ max: tooltip.warning ? "medium" : "small" }}
                        align="center"
                        gap="small"
                        onClick={(e) => e.stopPropagation()}
                        focusIndicator={false}
                        style={{ outline: "none", cursor: "default" }}
                    >
                        {tooltip.warning ? (
                            <Box align="center" gap="small" id="tooltip-warning">
                                {showWarning ? (
                                    <Box align="center" gap="small">
                                        <Description
                                            textAlign="center"
                                            text={tooltip.warning.text}
                                            size="medium"
                                            //weight="bold"
                                        />
                                        <Button
                                            icon={<Hide />}
                                            color="#85C1E9"
                                            small
                                            onClick={() => setShowWarning(false)}
                                            text="hide warning"
                                        />
                                    </Box>
                                ) : (
                                    <Box align="center" gap="small">
                                        <Description text={tooltip.text} textAlign="center" />
                                        <Box direction="row" align="center" gap="medium">
                                            <Button
                                                icon={<Alert />}
                                                color="#F9E79F"
                                                small
                                                onClick={() => setShowWarning(true)}
                                                text="show warning"
                                            />
                                            <Button
                                                icon={<FormNextLink />}
                                                onClick={tooltip.warning.handleClick}
                                                small
                                                text="continue"
                                            />
                                        </Box>
                                    </Box>
                                )}
                            </Box>
                        ) : (
                            <Description text={tooltip.text} textAlign="center" />
                        )}
                    </Box>
                </ReactTooltip>
            </Box>
        )
    }
    return children
}
