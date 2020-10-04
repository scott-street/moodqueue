import { Grommet, grommet, Box } from "grommet"
import React from "react"

export const withGrommet = (child: React.ReactChild) => {
    return (
        <Grommet theme={grommet} full>
            <Box align="center" justify="center" fill>
                {child}
            </Box>
        </Grommet>
    )
}
