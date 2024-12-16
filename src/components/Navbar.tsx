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
import { toggleTheme } from "../services/toggleTheme";
import { GrLogin, GrLogout } from "react-icons/gr";
import { ThemeContext, themeMode } from "../services/darklightTeme";
import { useUserContext } from "../contex/UserContext";
import useToken from "../costome Hooks/useToken";

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

    const handleLogout = () => {
        localStorage.removeItem("authToken");
        setIsLogedIn(false);
        navigate("/logout");
    };
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
        navigate("/cards");
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
                    {/* TODO: if loggedIn */}
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
                    <Button
                        style={{ color: theme.color }}
                        className="navIcon "
                        onClick={() => changeMode()}>
                        <FaMoon className="navIcon" />
                    </Button>
                    <Button
                        className="navIcon"
                        onClick={() => navigate("/profile")}>
                        {!isLogedIn && <FaUserCircle />}
                    </Button>
                    <Button
                        className="navIcon"
                        onClick={() => {
                            if (isLogedIn) {
                                handleLogout();
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

                    {/* <div className="d-flex mt-3 mb-2 justify-content-between align-items-center">
                        {isLogedIn ? (
                            <Link
                                to={"/cards"}
                                onClick={loggedOut}
                                className="fw-bold">
                                <span className="navIcon">
                                    <GrLogout/>
                                </span>
                            </Link>
                        ) : (
                            <div 
                                className="fw-bold">
                                <Link
                                    
                                    to={"/login"}
                                className="navIcon" >
                                    <GrLogin/>
                                </Link>
                                
                            </div>
                        )}
                    </div> */}
                </Nav>
            </BootstrapNavbar.Collapse>
        </BootstrapNavbar>
    );
};

export default Navbar;
