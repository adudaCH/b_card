import {toast} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";



export function successMsg(msg: string) {
	return toast.success(msg, {
		position: "top-center",
		autoClose: 3000, // Increased duration for better visibility
		hideProgressBar: false,
		closeOnClick: true,
		pauseOnHover: true,
		draggable: true,
		progress: undefined,
		theme: "dark"
	});
}

export function errorMsg(msg: string) {
	return toast.error(msg, {
		position: "top-center",
		autoClose: 3000, // Increased duration for better visibility
		closeOnClick: true,
		pauseOnHover: true,
		draggable: true,
		progress: undefined,
	theme:"dark"
	});
}
