"use client";

import { createContext, useContext, useState } from "react";

const ThemeContext = createContext();

export function ThemeProvider({ children }) {

    const [theme, setTheme] = useState("light");

    return (

        <ThemeContext.Provider value={{ theme, setTheme }}>

            <div className={theme}>

                {children}

            </div>

        </ThemeContext.Provider>

    );

}

export const useTheme = () => useContext(ThemeContext);