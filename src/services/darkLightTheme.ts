import { createContext } from "react";


export const themeMode = {

    dark:{background:"black",color:"white"},
    light:{background:" rgb(219, 243, 247)",color:"black"}
} 


export const ThemeContext = createContext(themeMode.dark);