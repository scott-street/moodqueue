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
    genres: [""],
}

const mockTracks: Track[] = [
    {
        previewUrl: "",
        name: "myMockTrack1",
        artist: "myMockArtist1",
        imageLink: "",
        id: "1",
        uri: "",
        explicit: false,
    },
    {
        previewUrl: "",
        name: "myMockTrack2",
        artist: "myMockArtist2",
        imageLink: "",
        id: "2",
        uri: "",
        explicit: true,
    },
]

describe("<Results />", () => {
    it("renders without crashing", () => {
        shallow(
            <Results
                tracks={mockTracks}
                size={"large"}
                mood={0}
                source={source}
                resetForm={() => console.log("reset")}
                userProduct="premium"
            />
        )
    })

    it("renders disabled queue button if free user", () => {
        const wrapper = mount(
            <Results
                size={"large"}
                mood={Mood.SLEEPY}
                tracks={mockTracks}
                source={source}
                resetForm={jest.fn()}
                userProduct="free"
            />
        )

        expect(wrapper.find("#play-queue-btn").at(0).props().disabled).to.be.eql(true)
    })

    it("renders tooltip wrappers for queue and playlist buttons", () => {
        const wrapper = mount(
            <Results
                size={"large"}
                mood={Mood.SLEEPY}
                tracks={mockTracks}
                source={source}
                resetForm={jest.fn()}
                userProduct="free"
            />
        )

        expect(wrapper.find("#queue-tooltip").length).to.be.eql(2)
        expect(wrapper.find("#playlist-tooltip").length).to.be.eql(2)
    })

    it("renders 'loading...' for number of tracks when tracks are loading", () => {
        const wrapper = render(
            <Results
                size={"large"}
                mood={Mood.SLEEPY}
                tracks={mockTracks}
                source={source}
                resetForm={jest.fn()}
                userProduct="premium"
            />
        )

        expect(wrapper.find("#results-header-txt").text()).to.contain("loading...")
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
            addToPlaylist: jest.fn(),
            getAvailableSeedGenres: jest.fn(),
        }

        const TestComponent = () => (
            <SpotifyProvider value={contextValues}>
                <Results
                    size={"large"}
                    mood={Mood.SLEEPY}
                    tracks={mockTracks}
                    source={source}
                    resetForm={jest.fn()}
                    userProduct="premium"
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

    it("renders results overview", () => {
        const wrapper = render(
            <Results
                size={"large"}
                mood={Mood.SLEEPY}
                tracks={mockTracks}
                source={source}
                resetForm={jest.fn()}
                userProduct="premium"
            />
        )
        expect(wrapper.find("#overview-bx").length).to.eql(1)
    })

    it("renders mood in header", () => {
        const wrapper = mount(
            <Results
                size={"large"}
                mood={Mood.PARTY}
                tracks={mockTracks}
                source={source}
                resetForm={jest.fn()}
                userProduct="premium"
            />
        )
        expect(wrapper.find("#results-header-txt").at(0).text()).to.contain("party")
    })

    it("renders source emoji in header", () => {
        const wrapper = render(
            <Results
                size={"large"}
                mood={Mood.PARTY}
                tracks={mockTracks}
                source={source}
                resetForm={jest.fn()}
                userProduct="premium"
            />
        )
        expect(wrapper.find("#saved-tooltip").length).to.be.eql(1)
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
            addToPlaylist: jest.fn(),
            getAvailableSeedGenres: jest.fn(),
        }

        const TestComponent = () => (
            <SpotifyProvider value={contextValues}>
                <Results
                    size={"large"}
                    mood={Mood.SLEEPY}
                    tracks={mockTracks}
                    source={source}
                    resetForm={jest.fn()}
                    userProduct="premium"
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
            addToPlaylist: jest.fn(),
            getAvailableSeedGenres: jest.fn(),
        }

        const TestComponent = () => (
            <SpotifyProvider value={contextValues}>
                <Results
                    size={"large"}
                    mood={Mood.SLEEPY}
                    tracks={[]}
                    source={source}
                    resetForm={jest.fn()}
                    userProduct="premium"
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
                expect(res.text()).to.contain("no songs")
            })
        })
    })

    it("renders play queue button", () => {
        const wrapper = render(
            <Results
                size={"large"}
                mood={Mood.SLEEPY}
                tracks={mockTracks}
                source={source}
                resetForm={jest.fn()}
                userProduct="premium"
            />
        )
        expect(wrapper.find("#play-queue-btn").length).to.be.eql(1)
    })

    it("renders start over button", () => {
        const wrapper = render(
            <Results
                size={"large"}
                mood={Mood.SLEEPY}
                tracks={mockTracks}
                source={source}
                resetForm={jest.fn()}
                userProduct="premium"
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
            addToPlaylist: jest.fn(),
            getAvailableSeedGenres: jest.fn(),
        }

        const TestComponent = () => (
            <SpotifyProvider value={contextValues}>
                <Results
                    size={"large"}
                    mood={Mood.SLEEPY}
                    tracks={mockTracks}
                    source={source}
                    resetForm={jest.fn()}
                    userProduct="premium"
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
                res.find("#tooltip-next-btn").at(1).simulate("click")
                expect(mockAddToQueue.mock.calls.length).to.be.eql(1)
            })
        })
    })

    it("calls useSpotify.addToPlaylist when playlist button is clicked", async () => {
        const mockAddToPlaylist = jest.fn()
        const contextValues: SpotifyContextValue = {
            addToQueue: jest.fn(),
            getQueue: jest.fn(
                () =>
                    new Promise((resolve) => {
                        resolve(mockTracks)
                    })
            ),
            addToPlaylist: mockAddToPlaylist,
            getAvailableSeedGenres: jest.fn(),
        }

        const TestComponent = () => (
            <SpotifyProvider value={contextValues}>
                <Results
                    size={"large"}
                    mood={Mood.SLEEPY}
                    tracks={mockTracks}
                    source={source}
                    resetForm={jest.fn()}
                    userProduct="premium"
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
                res.find("#playlist-btn").at(1).simulate("click")
                expect(mockAddToPlaylist.mock.calls.length).to.be.eql(1)
            })
        })
    })

    it("opens up confirmation after playlist button is clicked on mobile", async () => {
        const mockAddToPlaylist = jest.fn()
        const contextValues: SpotifyContextValue = {
            addToQueue: jest.fn(),
            getQueue: jest.fn(
                () =>
                    new Promise((resolve) => {
                        resolve(mockTracks)
                    })
            ),
            addToPlaylist: mockAddToPlaylist,
            getAvailableSeedGenres: jest.fn(),
        }

        const TestComponent = () => (
            <SpotifyProvider value={contextValues}>
                <Results
                    size={"small"}
                    mood={Mood.SLEEPY}
                    tracks={mockTracks}
                    source={source}
                    resetForm={jest.fn()}
                    userProduct="free"
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
                res.find("#playlist-btn").at(1).simulate("click")
                expect(wrapper.find("#playlist-confirm").length).to.be.equal(1)
            })
        })
    })

    it("opens up confirmation after queue button is clicked on mobile", async () => {
        const mockAddToPlaylist = jest.fn()
        const contextValues: SpotifyContextValue = {
            addToQueue: jest.fn(),
            getQueue: jest.fn(
                () =>
                    new Promise((resolve) => {
                        resolve(mockTracks)
                    })
            ),
            addToPlaylist: mockAddToPlaylist,
            getAvailableSeedGenres: jest.fn(),
        }

        const TestComponent = () => (
            <SpotifyProvider value={contextValues}>
                <Results
                    size={"small"}
                    mood={Mood.SLEEPY}
                    tracks={mockTracks}
                    source={source}
                    resetForm={jest.fn()}
                    userProduct="premium"
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
                expect(wrapper.find("#queue-confirm").length).to.be.equal(1)
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
            addToPlaylist: jest.fn(),
            getAvailableSeedGenres: jest.fn(),
        }

        const TestComponent = () => (
            <SpotifyProvider value={contextValues}>
                <Results
                    size={"large"}
                    mood={Mood.SLEEPY}
                    tracks={mockTracks}
                    source={source}
                    resetForm={mockReset}
                    userProduct="premium"
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
