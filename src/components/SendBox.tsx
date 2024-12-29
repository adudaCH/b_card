import { FunctionComponent, useCallback, useContext, useEffect, useMemo, useRef, useState } from "react";
import { ThemeContext } from "../services/darkLightTheme";
import { User } from "../interface/User";
import { useUserContext } from "../contex/UserContext";
import { useNavigate } from "react-router-dom";
import useToken from "../customeHooks/useToken";
import { deleteUserById, getAllUsers } from "../services/userServices";
import { errorMsg, successMsg } from "../services/toastify";
import Loading from "./Loading";



interface SendBoxProps {
    
}

const SendBox: FunctionComponent<SendBoxProps> = () => {
    const theme = useContext(ThemeContext);
    const navigate = useNavigate();
    const [openDeleteModal, setOpenDeleteModal] = useState<boolean>(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [userSearch, setUserSearch] = useState<User[] | null>(null);
    const {isAdmin} = useUserContext();
    const [selectedUserId, setSelectedUserId] = useState<string>("");
    const onHide = () => setShowDeleteModal(false);
	const onShow = () => setShowDeleteModal(true);
    const [render, setRender] = useState<boolean>(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [isLoading, setISLoading] = useState(true);
    const [users, setUsers] = useState<User[]>([]);
    const {decodedToken} = useToken();
    const [searchTerm, setSearchTerm] = useState("");
    const usersPerPage = 50;

    const startIndex = (currentPage -1) * usersPerPage;

    const usersToDisplay = useMemo(() => {
		if (userSearch) {
			return userSearch;
		}
		return users;
	}, [userSearch, users]);

	const currentUsers = useMemo(() => {
		return usersToDisplay.slice(startIndex, startIndex + usersPerPage);
	}, [usersToDisplay, startIndex]);

    useEffect(()=>{
        if (isAdmin === true){
            getAllUsers()
            .then((res)=>{
                setUsers(res);
                setISLoading(false);
            })
            .catch((err)=>{
                errorMsg("Error fetching users");
                setISLoading(false)
            })
        } else return;
    },[render,isAdmin]);

    const refresh = ()=> setRender(render)

    const handleEdit = useCallback((userId: string) => {
		if (selectedUserId || !selectedUserId) setSelectedUserId(userId);
	}, []);

    const handleDelete = (userId: string) => {
		try {
			deleteUserById(userId)
				.then(() => {
					setUsers((prevUsers: User[]) =>
						prevUsers.filter((user) => user._id !== userId),
					);
					successMsg("User deleted successfully.");
				})
				.catch((err) => {
					console.log(err);
					errorMsg("Error deleting user.");
				});
		} catch (error) {
			console.log(error);
			errorMsg("Failed to delete user.");
		}
	};

    const handleSearch = useCallback((name: string) => {
		setSearchTerm(name);
		setCurrentPage(1);
	}, []);

	const filteredUsers = useMemo(() => {
		const query = searchTerm.trim().toLowerCase();
		if (!query) return null;

		return users.filter((user) => {
			const fullName = `${user.name.first} ${user.name.last}`.toLowerCase();
			const phone = user.phone.toLowerCase();
			const email = user.email?.toLowerCase();
			return (
				fullName.includes(query) ||
				phone.includes(query) ||
				email?.includes(query)
			);
		});
	}, [searchTerm]);

    if (isLoading) return <Loading />;

    return ( <main style={{ backgroundColor: theme.background, color: theme.color, minHeight: "100vh"}}>
        {/* TODO:continue the component */}
    </main> );
}

export default SendBox;