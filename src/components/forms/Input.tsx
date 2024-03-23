import React, { Dispatch, SetStateAction } from 'react';

export default function InputComponent({ type, name, capitalize, focus, id, text, search, setStateProp, autocomplete = false }: {
    type: string,
    capitalize: boolean,
    name: string,
    focus: boolean,
    id: string,
    search: boolean,
    text: string,
    setStateProp: Dispatch<SetStateAction<string>>;
    autocomplete: boolean,
}) {
    return (
        <div className="group w-full relative mb-3 text-primary dark:text-primary border-2 border-gray-500 dark:border-gray-300 hover:border-primary dark:hover:border-primary focus:border-primary dark:focus:border-primary duration-300 ease-in-out rounded-lg py-1 bg-transparent">
            {setStateProp ? (<>
                <input
                    type={type}
                    name={name}
                    autoFocus={focus}
                    id={`${id}`}
                    onChange={(e) => setStateProp(e.target.value)}
                    className="bg-transparent focus:bg-transparent ring-0 focus:ring-0 hover:ring-0 peer h-full w-full rounded-md border-0 border-transparent px-3 focus:pt-5 focus:pb-2 pt-3 pb-3 font-sans text-sm font-normal text-primary dark:text-primary transition-all focus:outline-0 disabled:border-0 disabled:bg-transparent disabled:text-gray-400"
                    placeholder=" "
                    autoComplete={autocomplete ? 'on' : 'off'}
                    autoCapitalize={capitalize ? 'capitalize' : "none"}
                />
            </>) : <>
                <input
                    type={type}
                    name={name}
                    autoFocus={focus}
                    id={`${id}`}
                    className="bg-transparent focus:bg-transparent ring-0 focus:ring-0 hover:ring-0 peer h-full w-full rounded-md border-0 border-transparent px-3 focus:pt-5 focus:pb-2 pt-3 pb-3 font-sans text-sm font-normal text-primary dark:text-primary transition-all focus:outline-0 disabled:border-0 disabled:bg-transparent disabled:text-gray-400"
                    placeholder=" "
                    autoComplete={autocomplete ? 'on' : 'off'}
                    autoCapitalize={capitalize ? 'capitalize' : "none"}
                />

            </>}
            <label className="before:bg-transparent after:bg-transparent before:content[' '] after:content[' '] pointer-events-none absolute left-0 top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-gray-500 dark:text-gray-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[4.1] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-primary dark:peer-focus:text-primary peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
                {text}
            </label>

        </div>
    );
};

