import { createContext } from "react";


export const themeMode = {

    dark:{background:"black",color:"white"},
    light:{background:"white",color:"black"}
} 


export const ThemeContext = createContext(themeMode.dark);