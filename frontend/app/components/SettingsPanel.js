"use client";

import { useState } from "react";
import { FiSettings } from "react-icons/fi";
import { useTheme } from "../context/ThemeContext";

export default function SettingsPanel() {

    const [open, setOpen] = useState(false);

    const { setTheme } = useTheme();

    const themes = [

        {
            name: "Light",
            value: "light",
            color: "bg-gray-300"
        },

        {
            name: "Dark",
            value: "dark",
            color: "bg-gray-900"
        },

        {
            name: "Blue",
            value: "blue",
            color: "bg-blue-600"
        },

        {
            name: "Purple",
            value: "purple",
            color: "bg-purple-600"
        },

        {
            name: "Emerald",
            value: "emerald",
            color: "bg-green-600"
        }

    ];

    return (

        <>

            <button

                onClick={() => setOpen(!open)}

                className="

                fixed

                bottom-8

                right-8

                w-16

                h-16

                rounded-full

                bg-blue-600

                text-white

                shadow-2xl

                flex

                items-center

                justify-center

                hover:rotate-180

                transition

                "

            >

                <FiSettings size={28}/>

            </button>

            {

                open && (

                    <div

                        className="

                        fixed

                        bottom-28

                        right-8

                        bg-white

                        rounded-2xl

                        shadow-2xl

                        p-6

                        w-64

                        "

                    >

                        <h2 className="font-bold text-xl">

                            Themes

                        </h2>

                        <div className="mt-4 space-y-3">

                            {

                                themes.map(theme=>(

                                    <button

                                        key={theme.value}

                                        onClick={()=>setTheme(theme.value)}

                                        className="

                                        flex

                                        items-center

                                        gap-3

                                        w-full

                                        p-3

                                        rounded-xl

                                        hover:bg-gray-100

                                        "

                                    >

                                        <div

                                            className={`${theme.color} w-6 h-6 rounded-full`}

                                        />

                                        {theme.name}

                                    </button>

                                ))

                            }

                        </div>

                    </div>

                )

            }

        </>

    );

}