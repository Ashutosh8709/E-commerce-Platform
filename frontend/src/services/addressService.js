import api from "./api";

export const get = () => {
	return api.get("/address");
};

export const getDefault = () => {
	return api.get("/address/default");
};

export const add = (addressData) => {
	const { name, phone, street, city, state, country, postalCode, label } =
		addressData;

	return api.post("/address", {
		name,
		phone,
		email,
		street,
		city,
		state,
		country,
		postalCode,
		label,
	});
};

export const update = (addressData) => {};

export const remove = (addressId) => {
	return api.delete(`/address/${addressId}`);
};

export const markDefault = (addressId) => {
	return api.patch(`/address/${addressId}/default`);
};
