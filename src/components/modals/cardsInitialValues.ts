import { Cards } from "../../interface/Crards";

export const cardsInitialValues: Cards = {
	title: '',
	subtitle: '',
	description: '',
	phone: '',
	email: '',
	web: '',
	image: {
		url: '',
		alt: '',
		_id: ""
	},
	address: {
		state: '',
		country: '',
		city: '',
		street: '',
		houseNumber: 0,
		zip: 0,
		_id: ""
	},
	heartCount: 0, // Default value
	_id: '', // Default value
	likes: [],
	bizNumber: 0,
	user_id: "",
	createdAt: "",
	__v: 0
};
