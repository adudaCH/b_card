import axios from "axios";
import {User, UserLogin} from "../interface/User";
const api: string = `${process.env.REACT_APP_API}/users` as string;

const token = {
	"x-auth-token":
		"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTBhZTc1OWRiMzgxM2E2NTAyZmMyZmMiLCJpc0J1c2luZXNzIjp0cnVlLCJpc0FkbWluIjp0cnVlLCJpYXQiOjE2OTg4NDI5NTJ9.En62ry5Gu9FMBAvxyltv0eRYhpJIJs_aW06QAtxXRck",
};



const getUsers = {
	method: "get",
	maxBodyLength: Infinity,
	url: api,
	headers: token,
};

// Login function
export async function loginIn(login: UserLogin): Promise<any> {
	const response = await axios.post(`${api}/login`, login);
	return response;
}

// Fetch all users
export async function getAllUsers(): Promise<any> {
	try {
		const response = await axios(getUsers);
		return response.data;
	} catch (error) {
		console.error("Error fetching all users:", error);
		throw error;
	}
}

// Get specific user by ID
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

// Register a new user
export const registerNewUser = (user: User) => {
	const response = axios.request({
		...getUsers,
		headers: {"Content-Type": "application/json"},
		method: "post",
		data: user,
	});
	return response;
};

// Delete specific user by ID
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




export async function userDetails(userId: string) {
	try {
		let res = await secondGetUserById(userId)
		let user:User = res.data
		console.log(user);
		
	} catch (error) {
		console.log(error);
		
	}
}
