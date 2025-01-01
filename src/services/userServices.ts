import axios from "axios";
import { User, UserLogin } from "../interface/User";
import { jwtDecode, JwtPayload } from "jwt-decode";
const api: string = `${process.env.REACT_APP_API}/users` as string;

const token = {
	"x-auth-token":
		localStorage.getItem("token")
};



const getUsers = {
	method: "get",
	maxBodyLength: Infinity,
	url: api,
	headers: token,
};


export async function loginIn(login: UserLogin): Promise<any> {
	const response = await axios.post(`${api}/login`, login);
	return response;
}


export async function getAllUsers(): Promise<any> {
	try {
		const response = await axios(getUsers);
		return response.data;
	} catch (error) {
		console.error("Error fetching all users:", error);
		throw error;
	}
}

export function getUserById(id: string) {
	return axios.get(`${api}/${id}`, { headers: { 'x-auth-token': localStorage.token } })
}


export function secondGetUserById(id: string) {
	return axios.get(`${api}/${id}`, { headers: { 'x-auth-token': localStorage.token } })
}


export const registerNewUser = (user: User) => {
	const response = axios.request({
		...getUsers,
		headers: { "Content-Type": "application/json" },
		method: "post",
		data: user,
	});
	return response;
};


export const deleteUserById = async (userId: string) => {
	try {
		const response = await axios.request({
			...getUsers,
			url: `${api}/${userId}`,
			method: "delete",
		});
		return response.data;
	} catch (error) {
		console.log(error);
	}
};
export interface CustomJwtPayload extends JwtPayload {
	_id?: string;
	isBusiness?: boolean;
	isAdmin: boolean;
	iat: number;
}


export async function getUserDetails(token: string) {
	try {
		const decoded = jwtDecode<CustomJwtPayload>(token);
		const userId = decoded._id || "Id Not Found";
		return await getUserById(userId);
	} catch (error) {
		console.error(`Error: ${error}`);
		return null;
	}
}
