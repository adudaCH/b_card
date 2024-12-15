import React, { createContext, useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import About from "./components/About";
import FavCards from "./components/FavCards";
// import Profile from "./components/Profile";
// import PageNotFound from "./components/PageNotFound";
import "./App.css";

// Create a Theme Context
export const ThemeContext = createContext({
    theme: { mode: "light", bgc: "#c1f0f3" },
    toggleTheme: () => {},
});

function App() {
    // Load theme preference from localStorage or set default to light mode
    const [theme, setTheme] = useState(() => {
        const savedTheme = localStorage.getItem("theme");
        return savedTheme
            ? JSON.parse(savedTheme)
            : { mode: "light", bgc: "#c1f0f3" };
    });
    // TODO: fix the light mode bgc
    // Save theme preference to localStorage whenever it changes
    useEffect(() => {
        localStorage.setItem("theme", JSON.stringify(theme));
    }, [theme]);

    // Toggle theme between light and dark mode
    const toggleTheme = () => {
        setTheme((prevTheme: { mode: string; }) => ({
            mode: prevTheme.mode === "light" ? "dark" : "light",
            bgc: prevTheme.mode === "light" ? "#333333" : "#c1f0f3",
        }));
    };

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
            <div className={`App ${theme.mode}`}>
                <Router>
                    <Navbar />
                    <Routes>
                        <Route path="/" element={<About />} />
                        <Route path="/fav-cards" element={<FavCards />} />
                        {/* <Route path="/profile" element={<Profile />} /> */}
                        {/* <Route path="*" element={<PageNotFound />} /> */}
                    </Routes>
                </Router>
            </div>
        </ThemeContext.Provider>
    );
}

export default App;
