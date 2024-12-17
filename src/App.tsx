import React, { createContext, useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import About from "./components/About";
import FavCards from "./components/FavCards";
import "./App.css";
import PageNotFound from "./components/PageNotFound";
import { ThemeContext, themeMode } from "./services/darklightTeme";
import Login from "./components/Login";
import Register from "./components/Register";
import { ToastContainer } from "react-toastify";

function App() {
    const [theme, setTheme] = useState(() => {
        const savedTheme = localStorage.getItem("theme");
        return savedTheme ? JSON.parse(savedTheme) : false;
    });

    useEffect(() => {
        localStorage.setItem("theme", JSON.stringify(theme));
    }, [theme]);

    const toggleTheme = () => {
        setTheme((theme: any) => !theme);
    };

    return (
        <div className="App">
            <ToastContainer />

            <ThemeContext.Provider
                value={themeMode.dark ? themeMode.light : themeMode.dark}>
                <Router>
                    <Navbar changeMode={toggleTheme} />
                    <Routes>
                        <Route path="/about" element={<About />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/register" element={<Register />} />
                        <Route path="/fav-cards" element={<FavCards />} />
                        {/* Commented out Profile Route */}
                        {/* <Route path="/profile" element={<Profile />} /> */}
                        <Route path="*" element={<PageNotFound />} />
                    </Routes>
                </Router>
            </ThemeContext.Provider>
        </div>
    );
}

export default App;
