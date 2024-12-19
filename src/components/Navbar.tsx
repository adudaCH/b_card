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
import { ThemeContext, themeMode } from "../services/darkLightTheme";
import { useUserContext } from "../contex/UserContext";
import useToken from "../customeHooks/useToken";
import { getAllUsers } from "../services/userServices";

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
    const [user, setUser] = useState<{ name: { first: string; last: string } } | null>(null); 

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const users: { _id: string; name: { first: string; last: string } }[] = await getAllUsers();
                const loggedInUser = users.find((u) => u._id === decodedToken?._id); // Find the logged-in user by ID
                setUser(loggedInUser || null); // Set the user state
            } catch (error) {
                console.error("Failed to fetch users:", error);
            }
        };
    
        if (isLogedIn && decodedToken?._id) {
            fetchUsers();
        }
    }, [isLogedIn, decodedToken]);

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
        navigate("/");
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


            <BootstrapNavbar.Toggle aria-controls="navbar-nav" />

            <BootstrapNavbar.Collapse id="navbar-nav">
        
                <Nav className="me-auto">
                    <NavLink className={"nav-link"} to="/about">
                        About
                    </NavLink>

                    <NavLink className={"nav-link"} to="/">
                        Cards
                    </NavLink>
                    {/* TODO:create the two components */}
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
                    <div className="d-flex align-items-center justify-content-center">
                    <Button
                        style={{ color: theme.color }}
                        className="navIcon "
                        onClick={() => changeMode()}>
                        <FaMoon className="navIcon" />
                    </Button>
                    {/* TODO: keep tying the google thing */}
                    <Button
                        className="navIcon"
                        onClick={() =>
                            navigate(isLogedIn ? "/profile" : "/login")
                        }> 
                        {!isLogedIn ? (
                            <FaUserCircle />
                        ) : (
                            <div className="userIcon d-flex justify-content-center align-items-center">
                                {setDefaultImg(
                                    user?.name?.first || "",
                                    user?.name?.last || ""
                                ).join("")}
                            </div>
                        )}
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
                    </div>
                </Nav>
            </BootstrapNavbar.Collapse>
        </BootstrapNavbar>
    );
};

export default Navbar;
