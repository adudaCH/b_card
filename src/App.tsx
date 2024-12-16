import React, { createContext, useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import About from "./components/About";
import FavCards from "./components/FavCards";
import "./App.css";
import PageNotFound from "./components/PageNotFound";
import { ThemeContext, themeMode } from "./services/darklightTeme";
import Login from "./components/Login";



function App() {
    // Load theme preference from localStorage or set default to light mode
    const [theme, setTheme] = useState(() => {
        const savedTheme = localStorage.getItem("theme");
        return savedTheme ? JSON.parse(savedTheme) : false;
    });

    // Save theme preference to localStorage whenever it changes
    useEffect(() => {
        localStorage.setItem("theme", JSON.stringify(theme));
    }, [theme]);

    // Toggle theme between light and dark mode
    const toggleTheme = () => {
        setTheme((theme: any)=>!theme);
    };

    return (
        <ThemeContext.Provider value={theme? themeMode.dark:themeMode.light}>
            <div className={`App ${theme.mode}`}>
                <Router>
                    <Navbar changeMode ={toggleTheme} />
                    <Routes>
                        <Route path="/about" element={<About />} />
                        {/* <Route path="/login" element={<Login />} /> */}
                        <Route path="/fav-cards" element={<FavCards />} />
                        {/* <Route path="/profile" element={<Profile />} /> */}
                        <Route path="*" element={<PageNotFound />} />
                    </Routes>
                </Router>
            </div>
        </ThemeContext.Provider>
    );
}

export default App;
