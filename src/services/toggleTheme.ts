import { useState } from "react";


export const toggleTheme = (isDarkMode: boolean) => {
    if (isDarkMode) {
        document.body.classList.add("dark-mode");
        document.body.classList.remove("light-mode");
    } else {
        document.body.classList.add("light-mode");
        document.body.classList.remove("dark-mode");
    }
};
