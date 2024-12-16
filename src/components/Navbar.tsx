import React, {
    FunctionComponent,
    useContext,
    useEffect,
    useState,
} from "react";
import {
    Navbar as BootstrapNavbar,
    Nav,
    Form,
    FormControl,
    Button,
} from "react-bootstrap";
import {
    FaUserCircle,
    FaSearch,
    FaMoon,
    FaSun,
    FaArrowAltCircleRight,
} from "react-icons/fa";
import { setDefaultImg } from "../services/userImag";
import { NavLink, useNavigate } from "react-router-dom";
import { toggleTheme } from "../services/toggleTheme";
import { GrLogin, GrLogout } from "react-icons/gr";
import { ThemeContext, themeMode } from "../services/darklightTeme";

interface NavbarProps {
    changeMode: Function;
}

const Navbar: FunctionComponent<NavbarProps> = ({ changeMode }) => {
    const navigate = useNavigate();
    const theme = useContext(ThemeContext);
    const [isDarkMode, setIsDarkMode] = useState<boolean>(false);

    const userTools = {
        loggedIn: localStorage.getItem("token") !== null,
    };
    useEffect(() => {
        const currentTheme = localStorage.theme;
        if (currentTheme) {
            setIsDarkMode(true);
        } else {
            setIsDarkMode(false);
            console.log("error");
        }
    }, [isDarkMode]);

    const loggedOut = (
        <>
            <NavLink to="/profile"></NavLink>
            <div className="userIcon">
                <p>{setDefaultImg("Adi", "Saadya")}</p>
            </div>
        </>
    );

    return (
        <BootstrapNavbar
            bg="dark"
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
                    <NavLink className={"nav-link"} to="/about">
                        About
                    </NavLink>
                    <NavLink className={"nav-link"} to="/cards">
                        Cards
                    </NavLink>
                    {userTools.loggedIn && (
                        <>
                            <NavLink className={"nav-link"} to="/fav-cards">
                                Fav Cards
                            </NavLink>
                            <NavLink className={"nav-link"} to="/my-cards">
                                My Cards
                            </NavLink>
                        </>
                    )}
                    {/* TODO: if admin */}
                    <NavLink className={"nav-link"} to="/sandbox">
                        Sandbox
                    </NavLink>
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
                    {/* TODO: switch the icons */}
                    <Button style={{color: theme.color}} className="navIcon " onClick={() => changeMode()}>
                        <FaMoon className="navIcon" />
                    </Button>
                    <Button
                        className="navIcon"
                        onClick={() => navigate("/profile")}>
                        {userTools.loggedIn ? loggedOut : <FaUserCircle />}
                    </Button>
                    <Button
                        className="navIcon"
                        onClick={() =>
                            navigate(userTools.loggedIn ? "/logout" : "/login")
                        }>
                        {userTools.loggedIn ? (
                            <GrLogout className="navIcon" />
                        ) : (
                            <GrLogin className="navIcon" />
                        )}
                    </Button>
                </Nav>
            </BootstrapNavbar.Collapse>
        </BootstrapNavbar>
    );
};

export default Navbar;
