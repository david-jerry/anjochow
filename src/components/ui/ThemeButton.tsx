/**
 * ThemeButton component allows users to toggle between dark and light modes.
 * It uses local storage to remember the user's theme preference.
 *
 * @component
 * @example
 * // Usage in a parent component:
 * import ThemeButton from './ThemeButton';
 *
 * function App() {
 *   return (
 *     <div>
 *       <ThemeButton />
 *     </div>
 *   );
 * }
 */
"use client";

import React, { useEffect, useState } from 'react'
import { Icon } from '@iconify/react';

import {FaSun, FaMoon} from "react-icons/fa";
import anime from 'animejs/lib/anime.es.js';

export default function ThemeButton() {
    const [isDarkMode, setIsDarkMode] = useState(() => {
        if (typeof window !== 'undefined') {
            const storedPreference = window.localStorage.getItem('darkMode');
            return storedPreference ? JSON.parse(storedPreference) : false;
        }
        return false;
    });

    useEffect(() => {
        const html = document.querySelector('html');

        const initializeDarkMode = () => {
            if (typeof window !== 'undefined' && window.localStorage) {
                const storedDarkMode = localStorage.getItem('darkMode');
                setIsDarkMode(storedDarkMode ? JSON.parse(storedDarkMode) : false);
            }
        };

        initializeDarkMode();

        if (html) {
            isDarkMode ? html.classList.add('dark', "duration-300") : html.classList.remove('dark', "duration-300");
        }
        const animeLoad = anime.timeline({
            autoplay: true,
            delay: 0,
        });

        const comDown = {
            targets: '#moon',
            translateY: [-18, 0],
            duration: 600, // Set your desired duration (in milliseconds)
            easing: 'easeInOutSine',
        }

        const riseUp = {
            targets: '#sun',
            translateY: [18, 0],
            duration: 600, // Set your desired duration (in milliseconds)
            easing: 'easeInOutSine',
        }

        animeLoad.add(!isDarkMode ? comDown : riseUp);

    }, [isDarkMode]);

    const toggleDarkMode = () => {
        const newMode = !isDarkMode;

        if (typeof window !== 'undefined' && window.localStorage) {
            localStorage.setItem('darkMode', JSON.stringify(newMode));
        }

        setIsDarkMode(newMode);
    };


    return (
        <>
            <button title="theme switcher" className="text-xl hover:text-primary duration-300 ease-linear" type="button" onClick={toggleDarkMode}>
                <Icon id={isDarkMode ? 'sun' : 'moon'} className='flex-none h-6 w-6' icon={isDarkMode ? "line-md:sun-rising-twotone-loop" : "line-md:moon-rising-loop"} width="1.2em" height="1.2em" />
                {/* {isDarkMode ? <FaSun className="animate-spin-slower"/> : <FaMoon className="animate-pulse"/>} */}
            </button>
        </>
    )
}
