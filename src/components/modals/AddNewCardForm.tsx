import {FormikValues, useFormik} from "formik";
import {FunctionComponent} from "react";
import * as yup from "yup";
import {createNewCard} from "../../services/cardsServices";
import CardsInput from "./CardsInput";
import { Cards } from "../../interface/Crards";
import { successMsg } from "../../services/toastify";
import { FaPlus } from "react-icons/fa";
import { cardsInitialValues } from "./cardsInitialValues";

interface AddNewCardFormProps {
	refresh:Function
}

const AddNewCardForm: FunctionComponent<AddNewCardFormProps> = ({refresh}) => {
	const formik: FormikValues = useFormik<Cards>({
			initialValues: cardsInitialValues,
		validationSchema: yup.object({
			title: yup.string().min(2).max(256).required("Title is required"),
			subtitle: yup.string().min(2).max(256).required("Subtitle is required"),
			description: yup.string().min(2).max(1024).required("Description is required"),
			phone: yup
				.string()
				.required("Phone number is required")
				.min(9, "Phone number must be at least 9 digits")
				.max(11, "Phone number must be at most 11 digits")
				.matches(/^[0-9]+$/, "Phone number must contain only digits"),
			email: yup
				.string()
				.email("Invalid email format")
				.required("Email is required"),
			web: yup
				.string()
				.url("Invalid URL format")
				.min(14, "Web URL must be at least 14 characters"),
			image: yup.object().shape({
				url: yup
					.string()
					.url("Invalid image URL format")
					.min(14, "Image URL must be at least 14 characters")
					.required("Image URL is required"),
				alt: yup
					.string()
					.min(2, "Alt text must be at least 2 characters")
					.max(256, "Alt text must be at most 256 characters")
					.required("Alt text is required"),
			}),
			address: yup.object().shape({
				state: yup.string().notRequired(), // Optional
				country: yup.string().required("Country is required"),
				city: yup.string().required("City is required"),
				street: yup.string().required("Street is required"),
				houseNumber: yup
					.number()
					.typeError("House number must be a number")
					.required("House number is required"),
				zip: yup
					.number()
					.typeError("ZIP must be a number")
					.notRequired(),
			}),
		}),
		onSubmit: async (values: Cards) => {
			try {
				await createNewCard(values);
				successMsg(`${values.title} card is created successfully`);
				refresh();
			} catch (error) {
				console.error("Error creating card:", error);
			}
		},
	});
	
	return (
		<div className='container mt-5'>
			<form
				onSubmit={formik.handleSubmit}
				className='fw-bold card p-4 shadow-lg rounded-3'
			>
				{/* Title and Subtitle */}
				<div className='row'>
					<div className='col-6'>
						<CardsInput
							placeholder='Title'
							name='title'
							type='text'
							value={formik.values.title}
							error={formik.errors.title}
							touched={formik.touched.title}
							onChange={formik.handleChange}
							onBlur={formik.handleBlur}
						/>
					</div>
					<div className='col-6'>
						<CardsInput
							placeholder='Subtitle'
							name='subtitle'
							type='text'
							value={formik.values.subtitle}
							error={formik.errors.subtitle}
							touched={formik.touched.subtitle}
							onChange={formik.handleChange}
							onBlur={formik.handleBlur}
						/>
					</div>
				</div>

				{/* Description */}
				<CardsInput
					placeholder='Card description'
					name='description'
					type='text'
					value={formik.values.description}
					error={formik.errors.description}
					touched={formik.touched.description}
					onChange={formik.handleChange}
					onBlur={formik.handleBlur}
				/>

				{/* Phone and Email */}
				<div className='row'>
					<div className='col-6'>
						<CardsInput
							placeholder='Phone (9-11)'
							name='phone'
							type='tel'
							value={formik.values.phone}
							error={formik.errors.phone}
							touched={formik.touched.phone}
							onChange={formik.handleChange}
							onBlur={formik.handleBlur}
						/>
					</div>
					<div className='col-6'>
						<CardsInput
							placeholder='Email'
							name='email'
							type='email'
							value={formik.values.email}
							error={formik.errors.email}
							touched={formik.touched.email}
							onChange={formik.handleChange}
							onBlur={formik.handleBlur}
						/>
					</div>
				</div>

				{/* Website URL */}
				<CardsInput
					placeholder='Website url '
					name='web'
					type='url'
					value={formik.values.web}
					error={formik.errors.web}
					touched={formik.touched.web}
					onChange={formik.handleChange}
					onBlur={formik.handleBlur}
				/>

				{/* Image URL and Alt */}
				<div className='row'>
					<div className='col-8'>
						<CardsInput
							placeholder='image Url'
							name='image.url'
							type='url'
							value={formik.values.image.url}
							error={formik.errors.image?.url}
							touched={formik.touched.image?.url}
							onChange={formik.handleChange}
							onBlur={formik.handleBlur}
						/>
					</div>
					<div className='col-4'>
						<CardsInput
							placeholder='img name'
							name='image.alt'
							type='text'
							value={formik.values.image.alt}
							error={formik.errors.image?.alt}
							touched={formik.touched.image?.alt}
							onChange={formik.handleChange}
							onBlur={formik.handleBlur}
						/>
					</div>
				</div>

				{/* Address Fields */}
				<div className='row'>
					<div className='col-4'>
						<CardsInput
							placeholder='state'
							name='address.state'
							type='text'
							value={formik.values.address.state}
							error={formik.errors.address?.state}
							touched={formik.touched.address?.state}
							onChange={formik.handleChange}
							onBlur={formik.handleBlur}
						/>
					</div>
					<div className='col-4'>
						<CardsInput
							placeholder='country'
							name='address.country'
							type='text'
							value={formik.values.address.country}
							error={formik.errors.address?.country}
							touched={formik.touched.address?.country}
							onChange={formik.handleChange}
							onBlur={formik.handleBlur}
						/>
					</div>
					<div className='col-4'>
						<CardsInput
							placeholder='city'
							name='address.city'
							type='text'
							value={formik.values.address.city}
							error={formik.errors.address?.city}
							touched={formik.touched.address?.city}
							onChange={formik.handleChange}
							onBlur={formik.handleBlur}
						/>
					</div>
				</div>

				{/* Street, House Number, Zip */}
				<div className='row'>
					<div className='col-4'>
						<CardsInput
							placeholder='street'
							name='address.street'
							type='text'
							value={formik.values.address.street}
							error={formik.errors.address?.street}
							touched={formik.touched.address?.street}
							onChange={formik.handleChange}
							onBlur={formik.handleBlur}
						/>
					</div>
					<div className='col-4'>
						<CardsInput
							placeholder='houseNumber'
							name='address.houseNumber'
							type='number'
							value={formik.values.address.houseNumber}
							error={formik.errors.address?.houseNumber}
							touched={formik.touched.address?.houseNumber}
							onChange={formik.handleChange}
							onBlur={formik.handleBlur}
						/>
					</div>
					<div className='col-4'>
						<CardsInput
							placeholder='zip'
							name='address.zip'
							type='number'
							value={formik.values.address.zip}
							error={formik.errors.address?.zip}
							touched={formik.touched.address?.zip}
							onChange={formik.handleChange}
							onBlur={formik.handleBlur}
						/>
					</div>
				</div>

				<div className='mb-3'>
					<button
						type='submit'
						className='btn btn-success w-100 py-2 fw-bold shadow-lg'
					>
						<FaPlus />
					</button>
				</div>
			</form>
		</div>
	);
};

export default AddNewCardForm;
