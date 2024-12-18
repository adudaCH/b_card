import React, { createContext, useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import About from "./components/About";
import FavCards from "./components/FavCards";
import "./App.css";
import PageNotFound from "./components/PageNotFound";
import { ThemeContext, themeMode } from "./services/darkLightTheme";
import Login from "./components/Login";
import Register from "./components/Register";
import { ToastContainer } from "react-toastify";
import Cards from "./components/Cards";

function App() {
    const [theme, setTheme] = useState(() => {
        const savedTheme = localStorage.getItem("theme");
        return savedTheme ? JSON.parse(savedTheme) : false;
    });

    const toggleTheme = () => {
        setTheme((prevTheme: any) => !prevTheme);
    };

    useEffect(() => {
        localStorage.setItem("theme", JSON.stringify(theme));
        document.body.className = theme ? "dark" : "light"; // Dynamically apply class
    }, [theme]);

    return (
        <ThemeContext.Provider value={theme ? themeMode.dark : themeMode.light}>
            <ToastContainer />
            <Router>
                <Navbar changeMode={toggleTheme} />
                <Routes>
                    <Route path="/about" element={<About />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/cards" element={<Cards />} />
                    <Route path="/fav-cards" element={<FavCards />} />
                    <Route path="*" element={<PageNotFound />} />
                </Routes>
            </Router>
        </ThemeContext.Provider>
    );
}

export default App;
