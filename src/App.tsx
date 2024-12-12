import React, { createContext } from "react";
import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import About from "./components/About";
import PageNotFound from "./components/PageNotFound";
import FavCards from "./components/FavCards";
// import Profile from "./components/Profile";

function App() {
    // TODO:Initial value - bgc for lightMode
    return (
        <div className="App">
            <Router>
                <Navbar />
                <Routes>
                    <Route path="/" element={<About />} />
                    <Route path="/fav-cards" element={<FavCards />} />
                    {/* <Route path="/profile" element={<Profile />} /> */}
                    {/* <Route path="*" element={<PageNotFound />} /> */}
                </Routes>
            </Router>
            <About />
        </div>
    );
}

export default App;
