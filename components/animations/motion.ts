export const baseContainer = {
    hidden: { opacity: 1, scale: 0 },
    visible: {
        opacity: 1,
        scale: 1,
        transition: {
            delay: 0.3,
        },
    },
}

export const baseItemBottom = {
    hidden: { y: 15, opacity: 0 },
    visible: {
        y: 0,
        opacity: 1,
        transition: {
            delay: 0.4,
        },
    },
}

export const baseItemTop = {
    hidden: { y: -150, opacity: 0 },
    visible: {
        y: 0,
        opacity: 1,
        transition: {
            delay: 0.4,
        },
    },
}

export const colorMovementHome = {
    transition: {
        duration: 15,
        yoyo: Infinity,
    },
    background: [
        "linear-gradient(215deg, rgba(63,94,251,1) 30%, rgba(252,70,107,1) 100%)",
        "linear-gradient(215deg, rgba(63,94,251,1) 30%, rgba(252,70,107,1) 100%)",
        "linear-gradient(215deg, rgba(63,94,251,1) 15%, rgba(252,70,107,1) 75%)",
        "linear-gradient(215deg, rgba(63,94,251,1) 45%, rgba(252,70,107,1) 75%)",
        "linear-gradient(215deg, rgba(63,94,251,1) 15%, rgba(252,70,107,1) 100%)",
        "linear-gradient(215deg, rgba(63,94,251,1) 30%, rgba(252,70,107,1) 100%)",
        "linear-gradient(215deg, rgba(63,94,251,1) 30%, rgba(252,70,107,1) 100%)",
    ],
}

export const colorMovementLogin = {
    transition: {
        duration: 20,
        yoyo: Infinity,
    },
    background: [
        "linear-gradient(215deg, rgba(63,94,251,1) 30%, rgba(252,70,107,1) 100%)",
        "linear-gradient(215deg, rgba(63,94,251,1) 30%, rgba(252,70,107,1) 100%)",
        "linear-gradient(45deg, rgba(63,94,251,1) 30%, rgba(252,70,107,1) 100%)",
        "linear-gradient(170deg, rgba(63,94,251,1) 30%, rgba(252,70,107,1) 100%)",
        "linear-gradient(215deg, rgba(63,94,251,1) 30%, rgba(252,70,107,1) 100%)",
        "linear-gradient(215deg, rgba(63,94,251,1) 50%, rgba(252,70,107,1) 100%)",
        "linear-gradient(215deg, rgba(63,94,251,1) 0%, rgba(252,70,107,1) 100%)",
        "linear-gradient(45deg, rgba(63,94,251,1) 30%, rgba(252,70,107,1) 100%)",
        "linear-gradient(215deg, rgba(63,94,251,1) 30%, rgba(252,70,107,1) 100%)",
        "linear-gradient(215deg, rgba(63,94,251,1) 30%, rgba(252,70,107,1) 100%)",
    ],
}

export const colorMovementTracks = {
    background: [
        "linear-gradient(115deg, rgba(255,53,53,1) 0%, rgba(57,73,94,1) 75%)",
        "linear-gradient(215deg, rgba(42,142,242,1) 0%, rgba(31,39,48,1) 100%)",
        "linear-gradient(230deg, rgba(111,255,176,1) 0%, rgba(57,73,94,1) 75%)",
        "linear-gradient(180deg, rgba(255,53,53,1) 0%, rgba(57,73,94,1) 100%)",
        "linear-gradient(115deg, rgba(42,142,242,1) 0%, rgba(31,39,48,1) 100%)",
        "linear-gradient(215deg, rgba(255,53,53,1) 25%, rgba(57,73,94,1) 75%)",
        "linear-gradient(190deg, rgba(111,255,176,1) 0%, rgba(57,73,94,1) 75%)",
        "linear-gradient(270deg, rgba(42,142,242,1) 0%, rgba(31,39,48,1) 100%)",
    ],
    transition: {
        duration: 15,
        yoyo: Infinity,
    },
}

export const colorMovementSettings = {
    background: [
        "linear-gradient(25deg, rgba(75,108,183,1) 0%, rgba(24,40,72,1) 100%)",
        "linear-gradient(45deg, rgba(75,108,183,1) 0%, rgba(24,40,72,1) 70%)",
        "linear-gradient(15deg, rgba(75,108,183,1) 30%, rgba(24,40,72,1) 100%)",
        "linear-gradient(90deg, rgba(75,108,183,1) 0%, rgba(24,40,72,1) 100%)",
        "linear-gradient(90deg, rgba(75,108,183,1) 0%, rgba(24,40,72,1) 70%)",
        "linear-gradient(90deg, rgba(75,108,183,1) 30%, rgba(24,40,72,1) 100%)",
    ],
    transition: {
        duration: 15,
        yoyo: Infinity,
    },
}

export const trackDetailsVariants = (size: string) => {
    if (size === "small") {
        return {
            open: {
                y: 0,
                opacity: 1,
            },
            closed: {
                opacity: 0,
                y: 1000,
                transition: {
                    y: { type: "spring", bounce: 0.1, damping: 50 },
                    opacity: { duration: 0.5 },
                },
            },
        }
    } else {
        return {
            open: {
                scale: 1,
            },
            closed: {
                scale: 2,
                opacity: 0,
                zIndex: 0,
            },
        }
    }
}
