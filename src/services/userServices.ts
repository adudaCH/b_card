import axios from "axios";
import {User, UserLogin} from "../interface/User";
import { JwtPayload } from "jwt-decode";
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


export const getUserById = async (userId: User) => {
	try {
		const response = await axios.request({...getUsers, url: `${api}/${userId._id}`});
		return response.data;
	} catch (error) {
		console.log(error);
	}
};

export function secondGetUserById(id:string){
	return axios.get(`${api}/${id}`, {headers: {'x-auth-token': localStorage.token}})
}


export const registerNewUser = (user: User) => {
	const response = axios.request({
		...getUsers,
		headers: {"Content-Type": "application/json"},
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



export async function userDetails(userId: string) {
	try {
		let res = await secondGetUserById(userId)
		let user:User = res.data
		console.log(user);
		
	} catch (error) {
		console.log(error);
		
	}
}
