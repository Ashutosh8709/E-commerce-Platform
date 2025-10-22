import api from "./api";

export const create = (
	name,
	description,
	originalPrice,
	offeredPrice,
	stock,
	colors,
	categoryId,
	productImage
) => {
	const form = new FormData();
	form.append("name", name);
	form.append("description", description);
	form.append("originalPrice", originalPrice);
	form.append("offeredPrice", offeredPrice);
	form.append("stock", stock);
	form.append("colors", colors);
	form.append("categoryId", categoryId);
	if (productImage) form.append("productImage", productImage);
	return api.post("/product", form, {
		headers: { "Content-Type": "multipart/form-data" },
	});
};

export const update = () => {};

export const deleteProd = (id) => {
	return api.delete(`/product/${id}`);
};

export const getById = (id) => {
	return api.get(`/product/${id}`);
};

export const get = (currentPage, limit) => {
	return api.get(`/product?page=${currentPage}&limit=${limit}`);
};

export const getByCategory = () => {};

export const getByFeatured = () => {};

export const getNew = () => {};

export const getTopRated = () => {};

export const filterProd = () => {};

export const getRelated = () => {};
