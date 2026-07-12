"use client";

import { useTheme } from "next-themes";
import { FiMoon, FiSun } from "react-icons/fi";

export default function ThemeToggle() {

  const { theme, setTheme } = useTheme();

  return (

    <button
      onClick={() =>
        setTheme(theme === "dark" ? "light" : "dark")
      }
      className="
      p-3
      rounded-full
      bg-blue-600
      text-white
      shadow-lg
      hover:scale-110
      transition
      "
    >

      {theme === "dark"
        ? <FiSun size={22}/>
        : <FiMoon size={22}/>}

    </button>

  );

}