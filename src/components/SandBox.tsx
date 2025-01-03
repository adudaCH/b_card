import { FunctionComponent, useCallback, useContext, useEffect, useMemo, useRef, useState } from "react";
import { ThemeContext } from "../services/darkLightTheme";
import { User } from "../interface/User";
import { useUserContext } from "../contex/UserContext";
import { Link, useNavigate } from "react-router-dom";
import useToken from "../customeHooks/useToken";
import { deleteUserById, getAllUsers } from "../services/userServices";
import { errorMsg, successMsg } from "../services/toastify";
import Loading from "./Loading";
import { FaPenFancy, FaTrashAlt } from "react-icons/fa";
import DeleteUserModal from "./modals/DeleteUserModal";
import { Pagination } from "react-bootstrap";



interface SandBoxProps {
    
}

const SandBox: FunctionComponent<SandBoxProps> = () => {
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

    return (
	<main style={{ backgroundColor: theme.background, color: theme.color, minHeight: "100vh"}}>
		<div className='d-flex justify-content-around'>
				<h2 className='lead display-5'>SandBox</h2>
				<div className='mt-3 mb-3'>
					<form className='d-flex me-3' onSubmit={(e) => e.preventDefault()}>
						<input
							id='search-user'
							name='search-user'
							className='form-control me-2 search-input'
							type='search'
							placeholder='name/email/Phone'
							aria-label='search-user'
							onChange={(e) => handleSearch(e.target.value)}
						/>
						<button
							type='submit'
							onClick={() => setUserSearch(filteredUsers)}
							className='btn btn-primary'
						>
							Search
						</button>
					</form>
				</div>
			</div>
			{/* Displaying the user result or all users */}
			{userSearch && userSearch.length > 0 ? (
				<div
					style={{backgroundColor: theme.background, color: theme.color}}
					className='user-found card my-3 min-vh-100'
				>
					<h3>Users Found</h3>
					{userSearch.map((user) => (
						<div
							style={{
								backgroundColor: theme.background,
								color: theme.color,
							}}
							className='card  fw-bold'
							key={user._id}
						>
							<div className='card-body'>
								<p>
									<strong>Name:</strong> {user.name.first}
								</p>
								<p>
									<strong>Email:</strong> {user.email}
								</p>
								<Link to={`/userDetails/${user._id}`}>
									<img
										className='img-fluid'
										src={user.image?.imageUrl || "/user.png"}
										alt={user.name.first}
										style={{
											width: "100px",
											height: "100px",
											borderRadius: "50%",
										}}
									/>
								</Link>
							</div>

							{isLoading && isAdmin && (
								<>
									<div className='d-flex text-end justify-content-end my-3'>
										<Link to={`/userDetails/${user._id}`}>
											<button
												className='text-warning mx-5'
												onClick={() =>
													handleEdit(user._id as string)
												}
											>
												<FaPenFancy/>
											</button>
										</Link>
										<DeleteUserModal
											render={() => refresh()}
											show={showDeleteModal}
											onHide={onHide}
											onDelete={() =>
												handleDelete(user._id as string)
											}
										/>
										<button className='text-danger' onClick={onShow}>
											<FaTrashAlt />
										</button>
									</div>
								</>
							)}
						</div>
					))}
				</div>
			) : (
				<div className='table-responsive'>
					<table
						style={{backgroundColor: theme.background, color: theme.color}}
						className='table table-striped'
					>
						<thead>
							<tr>
								<th colSpan={6}>Image</th>
								<th colSpan={4}>Full Name</th>
								<th colSpan={1}>Edit</th>
								<th colSpan={1}>Delete</th>
							</tr>
						</thead>
						<tbody>
							{currentUsers.map((user: User) => (
								<tr key={user._id}>
									<td colSpan={6}>
										<Link to={`/userDetails/${user._id}`}>
											<img
												className='img-fluid mx-5 rounded-5'
												src={
													user.image?.imageUrl || "/avatar-design.png"
												}
												alt={`${user.image?.alt}'s profile`}
												style={{
													width: "70px",
													height: "70px",
												}}
											/>
										</Link>
									</td>
									<td colSpan={4}>
										{user.name.first} {user.name.last}
									</td>
									{decodedToken?.isAdmin && (
										<>
											<td colSpan={1}>
												<Link to={`/userDetails/${user._id}`}>
													<button className='text-warning '>
														<FaPenFancy/>
													</button>
												</Link>
											</td>
											<td colSpan={1}>
												<DeleteUserModal
													render={() => refresh()}
													show={showDeleteModal}
													onHide={onHide}
													onDelete={() =>
														handleDelete(user._id as string)
													}
												/>
												<button
													className='text-danger '
													onClick={onShow}
												>
													<FaTrashAlt />
												</button>
											</td>
										</>
									)}
								</tr>
							))}
						</tbody>
					</table>

					{/* Pagination */}
					<div className='container-sm'>
						<Pagination
							className='m-auto w-100 d-flex justify-content-center mb-3 flex-wrap'
							data-bs-theme='dark'
						>
							{[
								...Array(Math.ceil(usersToDisplay.length / usersPerPage)),
							].map((_, i) => (
								<Pagination.Item
									key={i}
									active={currentPage === i + 1}
									onClick={() => {
										setCurrentPage(i + 1);
									}}
								>
									{i + 1}
								</Pagination.Item>
							))}
						</Pagination>
					</div>
				</div>
			)}
    </main> );
}

export default SandBox;