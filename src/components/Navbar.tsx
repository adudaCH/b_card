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
import { Link, NavLink, useNavigate } from "react-router-dom";
import { GrLogin, GrLogout } from "react-icons/gr";
import { ThemeContext, themeMode } from "../services/darklightTeme";
import { useUserContext } from "../contex/UserContext";
import useToken from "../customeHooks/useToken";

interface NavbarProps {
    changeMode: Function;
}

const Navbar: FunctionComponent<NavbarProps> = ({ changeMode }) => {
    const navigate = useNavigate();
    const {
        isAdmin,
        isLogedIn,
        setAuth,
        setIsAdmin,
        setIsBusiness,
        setIsLogedIn,
    } = useUserContext();
    const theme = useContext(ThemeContext);
    const { decodedToken } = useToken();

    
    // const userTools = {
    //     loggedIn: localStorage.getItem("token") !== null,
    // };
    useEffect(() => {
        if (decodedToken) {
            setAuth(decodedToken);
            setIsLogedIn(true);
            setIsAdmin(decodedToken.isAdmin);
            setIsBusiness(decodedToken.isBusiness);
        } else {
            setIsLogedIn(false);
            setIsAdmin(false);
        }
    }, [decodedToken, setAuth, setIsLogedIn, setIsAdmin, setIsBusiness]);

    const loggedOut = () => {
        setAuth(null);
        setIsAdmin(false);
        setIsBusiness(false);
        setIsLogedIn(false);
        localStorage.removeItem("token");
        // TODO: chang derction to cards
        navigate("/about");
    };

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
                    {isLogedIn && (
                        <>
                            <NavLink className={"nav-link"} to="/fav-cards">
                                Fav Cards
                            </NavLink>
                            <NavLink className={"nav-link"} to="/my-cards">
                                My Cards
                            </NavLink>
                        </>
                    )}

                    {isAdmin && (
                        <NavLink className={"nav-link"} to="/sandbox">
                            Sandbox
                        </NavLink>
                    )}
                </Nav>
                    {/* TODO:activate the card search */}
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
                    <Button
                        style={{ color: theme.color }}
                        className="navIcon "
                        onClick={() => changeMode()}>
                        <FaMoon className="navIcon" />
                    </Button>
                    <Button
                        // TODO:if logged in show the google thing
                        className="navIcon"
                        onClick={() => navigate("/profile")}>
                        {!isLogedIn && <FaUserCircle />}
                    </Button>
                    <Button
                        className="navIcon"
                        onClick={() => {
                            if (isLogedIn) {
                                loggedOut();
                            } else {
                                navigate("/login");
                            }
                        }}>
                        {isLogedIn ? (
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
