import Enzyme from "enzyme"
import Adapter from "enzyme-adapter-react-16"
import React from "react"
React.useLayoutEffect = React.useEffect

Enzyme.configure({ adapter: new Adapter() })
