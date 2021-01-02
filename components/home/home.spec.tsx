import React from "react"
import { mount, render, shallow } from "enzyme"
import { SpotifyContext, SpotifyContextValue } from "../../common/hooks/useSpotify"
import { Home } from "./"
import { UserInfo } from "../../types/UserInfo"
import { expect } from "chai"
import { act } from "react-dom/test-utils"
import { Grommet } from "grommet"

const testUser: UserInfo = {
    name: "test",
    id: "test123",
    product: "premium",
    email: "test123@gmail.com",
    profileUrl: "spotify.com",
    profileImages: [
        {
            url:
                // click the url k8, follow your destiny
                "https://i.pinimg.com/originals/1d/1b/0f/1d1b0f072bb652298e747dd02e8809fc.jpg",
        },
    ],
}

interface MockSpotifyProviderProps {
    mockContextValue: SpotifyContextValue
}
const MockSpotifyProvider: React.FunctionComponent<MockSpotifyProviderProps> = (props) => (
    <SpotifyContext.Provider value={props.mockContextValue}>
        {props.children}
    </SpotifyContext.Provider>
)

describe("<Home/>", () => {
    const mockContextValues: SpotifyContextValue = {
        getQueue: jest.fn(() => new Promise((resolve) => resolve())),
        addToQueue: jest.fn(),
        getAvailableSeedGenres: jest.fn(() => new Promise((resolve) => resolve(["mock-genre"]))),
        addToPlaylist: jest.fn(),
    }
    it("renders without crashing", () => {
        shallow(
            <Grommet>
                <Home user={testUser} size={"large"} />
            </Grommet>
        )
    })

    it("renders user name in header", () => {
        const wrapper = render(
            <MockSpotifyProvider mockContextValue={mockContextValues}>
                <Grommet>
                    <Home user={testUser} size={"large"} />
                </Grommet>
            </MockSpotifyProvider>
        )

        expect(wrapper.find("#username-txt").text()).to.contain(testUser.name)
    })

    it("renders app name in header", () => {
        const wrapper = render(
            <MockSpotifyProvider mockContextValue={mockContextValues}>
                <Grommet>
                    <Home user={testUser} size={"large"} />
                </Grommet>
            </MockSpotifyProvider>
        )

        expect(wrapper.find("#app-name-txt").text()).to.contain("mdqueue")
    })

    it("renders icons in header", async () => {
        await act(() => {
            const wrapper = mount(
                <MockSpotifyProvider mockContextValue={mockContextValues}>
                    <Grommet>
                        <Home user={testUser} size={"large"} />
                    </Grommet>
                </MockSpotifyProvider>
            )

            const promise = () => {
                return new Promise((resolve) => {
                    setTimeout(() => {
                        wrapper.update()
                        resolve(wrapper)
                    }, 3000)
                })
            }

            return promise().then((res: any) => {
                expect(wrapper.find("#happy-emoji").at(0)).to.be.length(1)
                expect(wrapper.find("#sad-emoji").at(0)).to.be.length(1)
            })
        })
    })

    it("renders avatar with profile image", () => {
        const wrapper = render(
            <MockSpotifyProvider mockContextValue={mockContextValues}>
                <Grommet>
                    <Home user={testUser} size={"large"} />
                </Grommet>
            </MockSpotifyProvider>
        )
        expect(wrapper.find("#avatar-profile-image").length).to.be.eql(1)
    })

    it("renders default avatar if no profile image is present", () => {
        const userWithNoImage: UserInfo = {
            name: "test",
            id: "test123",
            email: "test123@gmail.com",
            profileUrl: "spotify.com",
            profileImages: [],
            product: "premium",
        }

        const wrapper = render(
            <MockSpotifyProvider mockContextValue={mockContextValues}>
                <Grommet>
                    <Home user={userWithNoImage} size={"large"} />
                </Grommet>
            </MockSpotifyProvider>
        )
        expect(wrapper.find("#avatar-default").length).to.be.eql(1)
    })
})
