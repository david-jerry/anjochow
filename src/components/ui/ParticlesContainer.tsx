"use client";

import React, { useCallback } from 'react'
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";
import { Engine } from "tsparticles-engine";


export default function ParticlesContainer() {

    // this should be run only once per application lifetime
    const init = useCallback(async (engine: Engine) => {
        await loadFull(engine);
    }, [])

    const particlesLoaded = useCallback(async (container: any) => {
        console.log(container);
        return;
    }, []);


    return <Particles
        className='w-full h-full absolute translate-z-0'
        id='tsparticles'
        init={init}
        loaded={particlesLoaded}
        options={{
            autoplay: true,
            fullscreen: { enable: false },
            background: {
                color: {
                    value: '',
                },
            },
            fpsLimit: 120,
            interactivity: {
                events: {
                    onClick: {
                        enable: false,
                        mode: "push",
                    },
                    onHover: {
                        enable: true,
                        mode: "repulse",
                    },
                    resize: true,
                },
                modes: {
                    push: {
                        quantity: 190
                    },
                    repulse: {
                        distance: 200,
                        duration: 0.4
                    }
                },
            },
            particles: {
                color: { value: '#e68e2e', },
                links: {
                    color: "#f5d393",
                    distance: 70,
                    opacity: 0.5,
                    enable: true,
                    width: 1,
                },
                collisions: {
                    enable: true,
                },
                move: {
                    enable: true,
                    direction: 'none',
                    outModes: {
                        default: 'bounce',
                    },
                    random: false,
                    speed: 2,
                    straight: false,
                    attract: {
                        enable: false,
                        rotateX: 600,
                        rotateY: 1200,
                    },
                },
                number: {
                    density: {
                        enable: true,
                        area: 800
                    },
                    value: 80
                },
                opacity: {
                    value: 0.5
                },
                shape: {
                    type: 'circle'
                },
                size: {
                    value: { min: 1, max: 5 }
                },
            },
            detectRetina: true
        }}
    />
}
