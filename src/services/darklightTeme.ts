import { createContext } from "react";


export const themeMode = {

    dark:{background:"black",color:"white"},
    light:{background:"rgb(193, 230, 236)",color:"black"}
} 


export const ThemeContext = createContext(themeMode.dark);