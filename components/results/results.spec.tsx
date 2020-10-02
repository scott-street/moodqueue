import React from "react"
import { expect } from "chai"
import { shallow, render, mount } from "enzyme"
import { Results } from "./results"
import { FormSelection } from "../../types/FormSelection"
import { Mood } from "../../types/Mood"
import { SpotifyContextValue, SpotifyProvider } from "../../common/hooks/useSpotify"
import { Track } from "../../types/Track"
import { act } from "react-dom/test-utils"

import { ResultList } from "./result-list"

const source: FormSelection = {
    saved: true,
    artists: false,
    tracks: false,
    recommended: false,
}

const mockTracks: Track[] = [
    {
        previewUrl: "",
        name: "myMockTrack1",
        artist: "myMockArtist1",
        imageLink: "",
        id: "1",
        uri: "",
    },
    {
        previewUrl: "",
        name: "myMockTrack2",
        artist: "myMockArtist2",
        imageLink: "",
        id: "2",
        uri: "",
    },
]

describe("<Results />", () => {
    it("renders without crashing", () => {
        shallow(
            <Results
                layout={"fun"}
                tracks={mockTracks}
                size={"large"}
                mood={0}
                source={source}
                resetForm={() => console.log("reset")}
            />
        )
    })

    it("renders mood name in title", () => {
        const wrapper = render(
            <Results
                layout={"fun"}
                size={"large"}
                mood={Mood.SLEEPY}
                tracks={mockTracks}
                source={source}
                resetForm={jest.fn()}
            />
        )

        expect(wrapper.find("#desc-title").text()).to.contain("sleepy")
    })

    it("renders 'loading...' for number of tracks when tracks are loading", () => {
        const wrapper = render(
            <Results
                layout={"fun"}
                size={"large"}
                mood={Mood.SLEEPY}
                tracks={mockTracks}
                source={source}
                resetForm={jest.fn()}
            />
        )

        expect(wrapper.find("#desc-num-songs").text()).to.contain("loading...")
    })

    it("renders number of tracks when tracks are defined", async () => {
        const contextValues: SpotifyContextValue = {
            addToQueue: jest.fn(),
            getQueue: jest.fn(
                () =>
                    new Promise((resolve) => {
                        resolve(mockTracks)
                    })
            ),
        }

        const TestComponent = () => (
            <SpotifyProvider value={contextValues}>
                <Results
                    layout={"fun"}
                    size={"large"}
                    mood={Mood.SLEEPY}
                    tracks={mockTracks}
                    source={source}
                    resetForm={jest.fn()}
                />
            </SpotifyProvider>
        )

        await act(() => {
            const wrapper = mount(<TestComponent />)

            const promise = () => {
                return new Promise((resolve) => {
                    setTimeout(() => {
                        wrapper.update()
                        resolve(wrapper)
                    }, 3000)
                })
            }

            return promise().then((res: any) => {
                expect(res.text()).to.contain("2")
            })
        })
    })

    it("renders queue sources in description", () => {
        const wrapper = render(
            <Results
                layout={"fun"}
                size={"large"}
                mood={Mood.SLEEPY}
                tracks={mockTracks}
                source={source}
                resetForm={jest.fn()}
            />
        )
        expect(wrapper.find("#desc-sources").text()).to.contain("saved")
    })

    it("renders <ResultList /> when queue has songs", async () => {
        const contextValues: SpotifyContextValue = {
            addToQueue: jest.fn(),
            getQueue: jest.fn(
                () =>
                    new Promise((resolve) => {
                        resolve(mockTracks)
                    })
            ),
        }

        const TestComponent = () => (
            <SpotifyProvider value={contextValues}>
                <Results
                    layout={"fun"}
                    size={"large"}
                    mood={Mood.SLEEPY}
                    tracks={mockTracks}
                    source={source}
                    resetForm={jest.fn()}
                />
            </SpotifyProvider>
        )

        await act(() => {
            const wrapper = mount(<TestComponent />)

            const promise = () => {
                return new Promise((resolve) => {
                    setTimeout(() => {
                        wrapper.update()
                        resolve(wrapper)
                    }, 3000)
                })
            }

            return promise().then((res: any) => {
                expect(res.find(ResultList).length).to.be.eql(1)
            })
        })
    })

    it("renders error when queue has no songs", async () => {
        const contextValues: SpotifyContextValue = {
            addToQueue: jest.fn(),
            getQueue: jest.fn(
                () =>
                    new Promise((resolve) => {
                        resolve([])
                    })
            ),
        }

        const TestComponent = () => (
            <SpotifyProvider value={contextValues}>
                <Results
                    layout={"fun"}
                    size={"large"}
                    mood={Mood.SLEEPY}
                    tracks={[]}
                    source={source}
                    resetForm={jest.fn()}
                />
            </SpotifyProvider>
        )

        await act(() => {
            const wrapper = mount(<TestComponent />)

            const promise = () => {
                return new Promise((resolve) => {
                    setTimeout(() => {
                        wrapper.update()
                        resolve(wrapper)
                    }, 3000)
                })
            }

            return promise().then((res: any) => {
                expect(res.text()).to.contain("no more songs")
            })
        })
    })

    it("renders play queue button", () => {
        const wrapper = render(
            <Results
                layout={"fun"}
                size={"large"}
                mood={Mood.SLEEPY}
                tracks={mockTracks}
                source={source}
                resetForm={jest.fn()}
            />
        )
        expect(wrapper.find("#play-queue-btn").length).to.be.eql(1)
    })

    it("renders start over button", () => {
        const wrapper = render(
            <Results
                layout={"fun"}
                size={"large"}
                mood={Mood.SLEEPY}
                tracks={mockTracks}
                source={source}
                resetForm={jest.fn()}
            />
        )
        expect(wrapper.find("#reset-btn").length).to.be.eql(1)
    })

    it("calls useSpotify.addToQueue when play button is clicked", async () => {
        const mockAddToQueue = jest.fn()
        const contextValues: SpotifyContextValue = {
            addToQueue: mockAddToQueue,
            getQueue: jest.fn(
                () =>
                    new Promise((resolve) => {
                        resolve(mockTracks)
                    })
            ),
        }

        const TestComponent = () => (
            <SpotifyProvider value={contextValues}>
                <Results
                    layout={"fun"}
                    size={"large"}
                    mood={Mood.SLEEPY}
                    tracks={mockTracks}
                    source={source}
                    resetForm={jest.fn()}
                />
            </SpotifyProvider>
        )

        await act(() => {
            const wrapper = mount(<TestComponent />)

            const promise = () => {
                return new Promise((resolve) => {
                    setTimeout(() => {
                        wrapper.update()
                        resolve(wrapper)
                    }, 3000)
                })
            }

            return promise().then((res: any) => {
                res.find("#play-queue-btn").at(1).simulate("click")
                expect(mockAddToQueue.mock.calls.length).to.be.eql(1)
            })
        })
    })

    it("calls props.resetForm when start over is clicked", async () => {
        const mockReset = jest.fn(() => {})
        const contextValues: SpotifyContextValue = {
            addToQueue: jest.fn(),
            getQueue: jest.fn(
                () =>
                    new Promise((resolve) => {
                        resolve(mockTracks)
                    })
            ),
        }

        const TestComponent = () => (
            <SpotifyProvider value={contextValues}>
                <Results
                    layout={"fun"}
                    size={"large"}
                    mood={Mood.SLEEPY}
                    tracks={mockTracks}
                    source={source}
                    resetForm={mockReset}
                />
            </SpotifyProvider>
        )

        await act(() => {
            const wrapper = mount(<TestComponent />)

            const promise = () => {
                return new Promise((resolve) => {
                    setTimeout(() => {
                        wrapper.update()
                        resolve(wrapper)
                    }, 3000)
                })
            }

            return promise().then((res: any) => {
                res.find("#reset-btn").at(1).simulate("click")
                expect(mockReset.mock.calls.length).to.be.eql(1)
            })
        })
    })
})
