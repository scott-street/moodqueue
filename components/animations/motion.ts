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

export const trackDetailsVariants = (size: string, top?: boolean) => {
    if (size === "small") {
        return {
            open: {
                y: 0,
                opacity: 1,
            },
            closed: {
                opacity: 0,
                y: top ? 1000 : -1000,
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
