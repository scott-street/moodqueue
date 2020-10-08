export const baseContainer = {
    hidden: { opacity: 1, scale: 0 },
    visible: {
        opacity: 1,
        scale: 1,
        transition: {
            delay: 0.3,
            when: "beforeChildren",
            staggerChildren: 0.1,
        },
    },
}

export const baseItemBottom = {
    hidden: { y: 150, opacity: 0 },
    visible: {
        y: 0,
        opacity: 1,
        transition: {
            delay: 0.2,
            when: "beforeChildren",
            staggerChildren: 0.1,
        },
    },
}

export const baseItemTop = {
    hidden: { y: -150, opacity: 0 },
    visible: {
        y: 0,
        opacity: 1,
        transition: {
            delay: 0.2,
            when: "beforeChildren",
            staggerChildren: 0.1,
        },
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
                zIndex: 0,
                y: 500,
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
