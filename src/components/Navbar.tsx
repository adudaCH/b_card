import React, { useState } from "react";
import {
    Navbar as BootstrapNavbar, Nav, Form, FormControl, Button} from "react-bootstrap";
import {FaUserCircle, FaSearch, FaMoon, FaSun, FaArrowAltCircleRight} from "react-icons/fa";
import { setDefaultImg } from "../services/userImag";
import { useNavigate } from "react-router-dom";
import { toggleTheme } from "../services/toggleTheme";

const Navbar: React.FC = () => {
    const navigate = useNavigate();
    const [isDarkMode, setIsDarkMode] = useState(false);

    const handleThemeToggle = () => {
        setIsDarkMode(!isDarkMode);
        toggleTheme(isDarkMode); 
    };
    
    const userTools = {
        loggedIn: localStorage.getItem("token") !== null,
    };


    const loggedOut = (
        <>
            <Nav.Link href="/profile"></Nav.Link>
            <div className="userIcon">
                <p>{setDefaultImg("Adi", "Saadya")}</p>
            </div>
        </>
    );

    return (
        <BootstrapNavbar
            bg="primary"
            variant="dark"
            expand="lg"
            className="px-3 navi">
            <BootstrapNavbar.Brand className="antonFont" href="/home">
                BCard
            </BootstrapNavbar.Brand>

            {/* Toggle for mobile */}
            <BootstrapNavbar.Toggle aria-controls="navbar-nav" />

            <BootstrapNavbar.Collapse id="navbar-nav">
                {/* Navigation Links */}
                <Nav className="me-auto">
                    <Nav.Link href="#about">About</Nav.Link>
                    <Nav.Link href="#cards">Cards</Nav.Link>
                    {userTools.loggedIn && (
                        <>
                            <Nav.Link href="#fav-cards">Fav Cards</Nav.Link>
                            <Nav.Link href="#my-cards">My Cards</Nav.Link>
                        </>
                    )}
                    {/* TODO: if admin */}
                    <Nav.Link href="#sandbox">Sandbox</Nav.Link>
                </Nav>

                {/* Search Bar */}
                <Form className="d-flex me-3">
                    <FormControl
                        type="search"
                        placeholder="Search"
                        className="me-2"
                        aria-label="Search"
                    />
                    <Button variant="outline-light">
                        <FaSearch />
                    </Button>
                </Form>

                {/* Icons */}
                <Nav>
                    <Nav.Link  onClick={handleThemeToggle}>
                        {isDarkMode ? <FaSun className="navIcon" /> : <FaMoon className="navIcon" />}
                    </Nav.Link>
                    <Nav.Link  className="navIcon" href="/profile">
                        {userTools.loggedIn ? loggedOut : <FaUserCircle />}
                    </Nav.Link>
                    {/* TODO: fix the log out button */}
                    {!userTools.loggedIn && (
                        <Nav.Link  onClick={() => navigate("/login")}>
                            <FaArrowAltCircleRight  className="navIcon" />
                            
                        </Nav.Link>
                    )}
                </Nav>
            </BootstrapNavbar.Collapse>
        </BootstrapNavbar>
    );
};

export default Navbar;
