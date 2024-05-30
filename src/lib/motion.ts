import { delay } from "framer-motion"

export const dropDown = {
    hidden: {
        height: 0,
    },
    show: {
        height: 300,
        transition: {
            type: "tween",
            ease: "easeIn",
            duration:0.2
        }
    }
}
export const dropup = {
    hidden: {
        height: 300,
    },
    show: {
        height: 0,
        opacity: 0,
        transition: {
            type: "tween",
            ease: "easeIn",
            duration:0.2,
            delay: 0.3
        }
    }
}

export const expand = (action: boolean, screenSize?: "sm") => {

    return {
        hidden: {
            width: action && screenSize === "sm" ? 0 : action ? 0 : "100px"
        },
        show: {
            width: action && screenSize === "sm" ? "auto" : action ? "100px" : 0,
            opacity: action ? 1 : 0,
            transition: {
                type: "tween",
                ease: "easeIn"
            }
        }
    }
}

export const Slider = (side: "left" | "right", delay: number) => {
    return {
        hidden: {
            x: side === "left" ? "-100%" : "100%",
            opacity: 0

        },
        show: {
            x: 0,
            opacity: 1,
            transition: {
                type: "tween",
                ease: "easeOut",
                duration: 0.75,
                delay: delay

            }
        }
    }

}

export const FadeIn = (delay: number) => {
    return {
        hidden: {
            width: "10%",
            opacity: 0
        },
        show: {
            width: "230px",
            opacity: 1,
            transition: {
                type: "tween",
                ease: "easeIn",
                duration: 0.5,
                delay: delay
            }
        }
    }
}
export const FadeInForText = (delay: number) => {
    return {
        hidden: {
            y: -10,

            opacity: 0
        },
        show: {
            y: 0,

            opacity: 1,
            transition: {
                type: "tween",
                ease: "easeIn",
                duration: 0.5,
                delay: delay
            }
        }
    }
}