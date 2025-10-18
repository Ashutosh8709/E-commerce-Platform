import api from "./api";

export const add = (productId, quantity = 1, color, size) => {
	return api.post(`/cart/${productId}`, { quantity, color, size });
};

export const get = () => {
	return api.get("/cart");
};

export const updateQuan = (productId, quantity = 1) => {
	return api.patch(`/cart/${productId}/quantity`, { quantity });
};

export const remove = (productId) => {
	return api.delete(`/cart/${productId}`);
};

export const clear = () => {
	return api.delete("/cart");
};

export const save = (productId) => {
	return api.post(`/cart/${productId}/save`);
};
