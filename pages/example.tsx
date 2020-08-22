import React, { FunctionComponent, useState } from "react"
import { Grommet, Button, Heading, grommet } from "grommet"

// this is a test component to demonstrate how to use
//    1. grommet
//    2. react functional components with the useState hook
// remove this file when MOOD-3 is merged
const Example: FunctionComponent = () => {
    // useState returns [variable, function to set variable]
    // and is initialized with the initial value of the state variable
    const [sayHello, setSayHello] = useState(false)

    const handleClick = () => {
        setSayHello(!sayHello) // this function is from the useState deconstructor & sets sayHello
    }

    return (
        <>
            //this adds default theming to the page
            <Grommet theme={grommet}>
                //grommet button acts like normal button but styled
                <Button primary label="hello world" onClick={handleClick} />
                //this is conditional rendering that will render Hello! if sayHello is truthy
                {sayHello && <Heading>Hello!</Heading>}
            </Grommet>
        </>
    )
}

export default Example
