export const fadeIn = (direction: string, delay: any) => {
    return {
        hidden: {
            y: direction === 'up' ? 80 : direction === 'down' ? -80 : 0,
            opacity: 0,
            x: direction === 'left' ? 80 : direction === 'right' ? -80 : 0,
            transition: {
                type: 'tween',
                duration: 1.5,
                delay: delay,
                ease: [0.25, 0.6, 0.3, 0.8],
            },
        },
        show: {
            y: 0,
            x: 0,
            opacity: 1,
            transition: {
                type: 'tween',
                duration: 1.4,
                delay: delay,
                ease: [0.25, 0.25, 0.25, 0.75],
            },
        },
    };
};

export const loading = () => {
    return {
        start: {
            scale: [1, 2, 2, 1, 1],
            rotate: [0, 0, 270, 270, 0],
            borderRadius: ["20%", "20%", "50%", "50%", "20%"],
        }
    }
}

export const clickButtons = () => {
    return {
        tap: {
            scale: 0.9
        },
        hover: {
            scale: 1.1
        }
    }
}