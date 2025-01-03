import {
    FunctionComponent,
    useCallback,
    useContext,
    useEffect,
    useState,
} from "react";
import { deleteUserById, getUserById } from "../services/userServices";
import { Link, useNavigate } from "react-router-dom";
import Loading from "./Loading";
import useToken from "../customeHooks/useToken";
import { successMsg } from "../services/toastify";
import { User } from "../interface/User";
import { ThemeContext } from "../services/darkLightTheme";
import { Button } from "react-bootstrap";
import { useUserContext } from "../contex/UserContext";
import { FaPenFancy, FaTrashAlt } from "react-icons/fa";

interface ProfileProps { }
// TODO: see what is up with the profile
const Profile: FunctionComponent<ProfileProps> = () => {
    const [user, setUser] = useState<any>({});
    const [isLoadnig, setIsLoading] = useState<boolean>(true);
    const [render, setRender] = useState<boolean>(false);
    const { decodedToken } = useToken();
    const { setIsLogedIn, isBusiness, setIsBusiness } = useUserContext();
    const navigate = useNavigate();
    const theme = useContext(ThemeContext);
    const [showDleteModal, setShowDeleteModal] = useState(false);

    const onHide = useCallback<() => void>(
        (): void => setShowDeleteModal(false),
        []
    );
    const onShow = useCallback<() => void>(
        (): void => setShowDeleteModal(true),
        []
    );

    const refresh = () => {
        setRender(!render);
    };

    useEffect(() => {
        if (decodedToken._id) {
            getUserById(decodedToken._id).then((res) => {
                setIsLoading(false);
                setUser(res);
            }).catch((err) => {
                console.warn("2. Failed to fetch user data:", err)
                setIsLoading(false)
            });
        } else {
            console.warn("bla bla")
        }
    })
    // useEffect(() => {
    //     if (decodedToken._id) {
    //         getUserById(decodedToken._id)
    //             .then((res) => {
    //                 setIsLoading(false);
    //                 setUser(res);
    //             })
    //             .catch((error) => {
    //                 console.warn("2. Failed to fetch user data:", error);
    //                 setIsLoading(false);
    //             });
    //     } else {
    // 		console.log("blaaaa");

    //     }
    // }, [decodedToken._id, render]);

    const handleDelete: Function = (userId: string) => {
        try {
            deleteUserById(userId).then((res) => {
                setIsLogedIn(false);
                successMsg(`${res.name.first} Has been deleted`);
                localStorage.removeItem("token");
                navigate("/");
            });
        } catch (error) {
            console.log(error);
        }
    };

    const handleSwitchChange: Function = async () => {
        const newData = !isBusiness;

        setIsBusiness(newData);

        try {
            const updatedUserData: { isBusiness: boolean } = {
                isBusiness: newData,
            };
            await patchUserBusiness(user._id, updatedUserData, user);

            const updatedUser: User = await getUserById(decodedToken._id).then();
            setUser(updatedUser as User);
        } catch (error) {
            console.error("Error updating data:", error);
        }
    };

    if (isLoadnig) {
        return <Loading />;
    }

    return (
        <main
            style={{
                backgroundColor: theme.background,
                color: theme.color,
                minHeight: "100vh",
            }}>
            <Button onClick={() => navigate("/")} />
            <div className="container m-auto mt-2">
                <h1 className="text-center mb-4">User Profile</h1>
                <div
                    className="card shadow-lg rounded-4 p-1"
                    data-bs-theme="dark">
                    <div className="card-body">
                        <div className="d-flex align-items-center mb-4">
                            <div className="me-4">
                                <Link to={`/userDetails/${user._id}`}>
                                    <img
                                        src={user.image.url}
                                        alt="Profile image"
                                        className="shadow rounded rounded-5 border p-1 border-dark-subtle shadow-sm"
                                        width="150"
                                        height="150"
                                    />
                                </Link>
                            </div>
                            <div className="borer">
                                <h2 className="card-title mb-2 text-muted ">
                                    <strong>{user && user.name.first} </strong>
                                    {user && user.name.last}
                                </h2>
                                <hr />
                                <p className="text-muted mb-0">{user.email}</p>
                            </div>
                        </div>
                        <div className="row  py-2 lead border">
                            <div className="col-5">
                                <h5 className=" ">Phone</h5>
                            </div>
                            <div className="col-5">{user.phone}</div>
                        </div>
                        <div className="row py-2">
                            <div className="col-5">
                                <h5>User Role</h5>
                            </div>
                            <div className="col-5">
                                <p
                                    className={
                                        user.isAdmin
                                            ? "text-success fw-bold"
                                            : "text-info fw-bold"
                                    }>
                                    {user.isAdmin ? "Administrator" : "Client"}
                                </p>
                            </div>
                        </div>
                        <div className="row  border">
                            <div className="col-5">
                                <h5>Business account</h5>
                            </div>
                            <div className="col-2 border">
                                <p
                                    className={
                                        user.isBusiness === true
                                            ? "text-success fw-bold"
                                            : "text-danger fw-bold"
                                    }>
                                    {user.isBusiness === true ? "Yes" : "No"}
                                </p>
                            </div>
                            <div className="col-5">
                                <div className="form-check form-switch">
                                    <input
                                        className="form-check-input form-check"
                                        type="checkbox"
                                        role="switch"
                                        id="flexSwitchCheckChecked"
                                        checked={user.isBusiness ? true : false}
                                        onChange={() => handleSwitchChange()}
                                    />
                                    <label
                                        className="form-check-label  fw-bold"
                                        htmlFor="flexSwitchCheckChecked">
                                        {user.isBusiness
                                            ? "Turn Off Business Priority"
                                            : "Turn On Business Priority"}
                                    </label>
                                </div>
                            </div>
                        </div>
                        <div className="row mt-3 p-3 m-auto">
                            <div className="col-6">
                                <Link
                                    className=" text-warning mb-2"
                                    to={`/userDetails/${user._id}`}>
                                    Edit <FaPenFancy />
                                </Link>
                            </div>
                            <div className="col-6">
                                <Link
                                    to={""}
                                    className="text-danger"
                                    onClick={onShow}>
                                    Delete <FaTrashAlt />
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
                {/* <DeleteModal
                    show={showDleteModal}
                    onHide={onHide}
                    onDelete={
                        user?._id ? () => handleDelete(user._id) : undefined
                    }
                /> */}
            </div>
        </main>
    );
};

export default Profile;
function patchUserBusiness(
    _id: any,
    updatedUserData: { isBusiness: boolean },
    user: any
) {
    throw new Error("Function not implemented.");
}
