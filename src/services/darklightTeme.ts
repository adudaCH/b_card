import { createContext } from "react";


export const themeMode = {

    dark:{background:"black",color:"white"},
    light:{background:" rgb(193, 239, 246)",color:"black"}
} 


export const ThemeContext = createContext(themeMode.dark);